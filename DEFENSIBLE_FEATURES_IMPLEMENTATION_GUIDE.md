# CLINK Killer Features - Implementation Guide
## Technical & Operational Roadmap

---

## Part 1: CLINK Intelligence™ Implementation

### Technical Stack

```
Backend:
├── Python 3.11+ (ML models)
├── FastAPI (API layer)
├── PostgreSQL + TimescaleDB (time-series data)
├── Redis (caching)
├── Apache Airflow (data pipeline)
└── MLflow (model management)

ML Stack:
├── TensorFlow/PyTorch (deep learning)
├── XGBoost (gradient boosting)
├── Prophet (time series)
├── Scikit-learn (classical ML)
└── Feast (feature store)

Frontend:
├── Next.js 15 (dashboard)
├── Recharts/D3.js (visualizations)
├── React Query (data fetching)
└── Tailwind CSS (styling)
```

### Phase 1: Data Infrastructure (Weeks 1-4)

#### Week 1-2: Data Warehouse Setup

```python
# data_warehouse/schema.py
from sqlalchemy import Column, Integer, String, DateTime, Float, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class ShipmentRecord(Base):
    """Historical shipment data for ML training"""
    __tablename__ = 'shipments'
    
    id = Column(Integer, primary_key=True)
    tracking_number = Column(String(50), unique=True)
    origin_city = Column(String(100))
    destination_city = Column(String(100))
    shipping_mode = Column(String(20))  # air, sea, express
    weight_kg = Column(Float)
    volume_cbm = Column(Float)
    actual_cost_usd = Column(Float)
    customer_price_usd = Column(Float)
    booked_date = Column(DateTime)
    shipped_date = Column(DateTime)
    delivered_date = Column(DateTime)
    carrier = Column(String(50))
    seasonal_period = Column(String(20))  # CNY, Ramadan, etc.
    fuel_price_at_booking = Column(Float)
    usd_cny_rate = Column(Float)
    
class RateHistory(Base):
    """Historical rate data by lane and date"""
    __tablename__ = 'rate_history'
    
    id = Column(Integer, primary_key=True)
    lane = Column(String(100))  # e.g., "Shanghai-Bamako"
    mode = Column(String(20))
    date = Column(DateTime)
    rate_per_kg = Column(Float)
    rate_per_cbm = Column(Float)
    carrier = Column(String(50))
    capacity_available = Column(Float)
```

#### Week 3-4: Data Pipeline

```python
# pipelines/rate_ingestion.py
import pandas as pd
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
import requests

default_args = {
    'owner': 'clink-ml',
    'depends_on_past': False,
    'start_date': datetime(2026, 1, 1),
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'rate_data_ingestion',
    default_args=default_args,
    schedule_interval='@daily',
    catchup=False,
)

def extract_carrier_rates(**context):
    """Extract current rates from carrier APIs"""
    carriers = ['ethiopian', 'turkish', 'maersk', 'cma_cgm']
    rates = []
    
    for carrier in carriers:
        # Integration with carrier APIs
        carrier_rates = fetch_carrier_rates(carrier)
        rates.extend(carrier_rates)
    
    # Store in data warehouse
    df = pd.DataFrame(rates)
    df.to_sql('rate_history', engine, if_exists='append', index=False)
    
    return f"Ingested {len(rates)} rate records"

def extract_external_factors(**context):
    """Extract fuel prices, exchange rates, port congestion"""
    # Fuel price API
    fuel_price = requests.get('https://api.bunkerex.com/prices').json()
    
    # Exchange rates
    fx_rates = requests.get('https://api.exchangerate.host/latest').json()
    
    # Port congestion (scraping or API)
    congestion = scrape_port_congestion()
    
    # Store for feature engineering
    store_external_factors(fuel_price, fx_rates, congestion)

extract_task = PythonOperator(
    task_id='extract_rates',
    python_callable=extract_carrier_rates,
    dag=dag,
)

external_task = PythonOperator(
    task_id='extract_external_factors',
    python_callable=extract_external_factors,
    dag=dag,
)

extract_task >> external_task
```

### Phase 2: ML Models (Weeks 5-12)

#### Week 5-6: Feature Engineering

```python
# ml/features.py
import pandas as pd
import numpy as np
from feast import Entity, Feature, FeatureView, ValueType
from feast.types import Float32, Int64, String
from datetime import timedelta

# Define features for price prediction
shipment_entity = Entity(
    name="shipment_id",
    value_type=ValueType.STRING,
    description="Unique shipment identifier",
)

shipment_feature_view = FeatureView(
    name="shipment_features",
    entities=["shipment_id"],
    ttl=timedelta(days=365),
    features=[
        Feature(name="weight_kg", dtype=Float32),
        Feature(name="volume_cbm", dtype=Float32),
        Feature(name="days_to_cny", dtype=Int64),
        Feature(name="days_to_ramadan", dtype=Int64),
        Feature(name="fuel_price_index", dtype=Float32),
        Feature(name="usd_cny_rate", dtype=Float32),
        Feature(name="port_congestion_score", dtype=Float32),
        Feature(name="historical_avg_rate", dtype=Float32),
        Feature(name="seasonal_factor", dtype=Float32),
    ],
)

def engineer_features(raw_shipments_df):
    """Transform raw shipment data into ML features"""
    df = raw_shipments_df.copy()
    
    # Seasonal features
    df['booking_month'] = df['booked_date'].dt.month
    df['is_cny_period'] = df['booked_date'].apply(is_chinese_new_year_period)
    df['is_ramadan'] = df['booked_date'].apply(is_ramadan_period)
    
    # Rolling averages by lane
    df['lane_30d_avg_rate'] = df.groupby('lane')['customer_price_usd'].transform(
        lambda x: x.rolling('30D').mean()
    )
    
    # Capacity utilization proxy
    df['monthly_volume'] = df.groupby(['lane', 'booked_date_month'])['weight_kg'].transform('sum')
    df['capacity_pressure'] = df['monthly_volume'] / df['historical_max_volume']
    
    # Lag features (previous week rates)
    df['prev_week_rate'] = df.groupby('lane')['rate_per_kg'].shift(7)
    
    return df
```

#### Week 7-10: Model Development

```python
# ml/price_prediction.py
import xgboost as xgb
from sklearn.model_selection import TimeSeriesSplit
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error
import mlflow
import pandas as pd
import numpy as np

class PricePredictionModel:
    """Predicts optimal shipping prices and timing"""
    
    def __init__(self):
        self.model = None
        self.feature_columns = [
            'weight_kg', 'volume_cbm', 'days_to_cny', 'days_to_ramadan',
            'fuel_price_index', 'usd_cny_rate', 'port_congestion_score',
            'lane_30d_avg_rate', 'capacity_pressure', 'prev_week_rate'
        ]
        
    def train(self, df):
        """Train price prediction model"""
        with mlflow.start_run():
            # Prepare features
            X = df[self.feature_columns]
            y = df['customer_price_usd']
            
            # Time series cross-validation
            tscv = TimeSeriesSplit(n_splits=5)
            
            params = {
                'objective': 'reg:squarederror',
                'max_depth': 6,
                'learning_rate': 0.05,
                'n_estimators': 500,
                'subsample': 0.8,
                'colsample_bytree': 0.8,
            }
            
            mape_scores = []
            for train_idx, val_idx in tscv.split(X):
                X_train, X_val = X.iloc[train_idx], X.iloc[val_idx]
                y_train, y_val = y.iloc[train_idx], y.iloc[val_idx]
                
                model = xgb.XGBRegressor(**params)
                model.fit(X_train, y_train)
                
                predictions = model.predict(X_val)
                mape = mean_absolute_percentage_error(y_val, predictions)
                mape_scores.append(mape)
            
            # Train final model on all data
            self.model = xgb.XGBRegressor(**params)
            self.model.fit(X, y)
            
            # Log to MLflow
            mlflow.log_params(params)
            mlflow.log_metric('cv_mape_mean', np.mean(mape_scores))
            mlflow.sklearn.log_model(self.model, 'price_predictor')
            
            return {
                'cv_mape_mean': np.mean(mape_scores),
                'cv_mape_std': np.std(mape_scores)
            }
    
    def predict(self, shipment_features):
        """Predict price for new shipment"""
        if self.model is None:
            raise ValueError("Model not trained")
        
        X = shipment_features[self.feature_columns]
        prediction = self.model.predict(X)
        
        # Calculate confidence interval
        # (simplified - in production use conformal prediction or bootstrap)
        uncertainty = 0.15 * prediction  # 15% uncertainty
        
        return {
            'predicted_price': float(prediction[0]),
            'confidence_lower': float(prediction[0] - uncertainty),
            'confidence_upper': float(prediction[0] + uncertainty),
            'confidence_score': self._calculate_confidence(shipment_features)
        }
    
    def predict_optimal_booking_window(self, lane, target_date, flexibility_days=14):
        """Recommend best time to book shipment"""
        dates = pd.date_range(
            start=target_date - timedelta(days=flexibility_days),
            end=target_date + timedelta(days=flexibility_days)
        )
        
        predictions = []
        for date in dates:
            features = self._generate_features_for_date(lane, date)
            pred = self.predict(features)
            predictions.append({
                'date': date,
                'predicted_price': pred['predicted_price'],
                'confidence': pred['confidence_score']
            })
        
        pred_df = pd.DataFrame(predictions)
        best_date = pred_df.loc[pred_df['predicted_price'].idxmin()]
        
        return {
            'recommended_booking_date': best_date['date'],
            'expected_price': best_date['predicted_price'],
            'savings_vs_target_date': predictions[len(predictions)//2]['predicted_price'] - best_date['predicted_price'],
            'confidence': best_date['confidence'],
            'alternative_dates': pred_df.nsmallest(3, 'predicted_price').to_dict('records')
        }
```

#### Week 11-12: API & Frontend

```python
# api/prediction_api.py
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date
import redis

app = FastAPI(title="CLINK Intelligence API")
cache = redis.Redis(host='localhost', port=6379, db=0)

class PricePredictionRequest(BaseModel):
    origin: str
    destination: str
    weight_kg: float
    volume_cbm: Optional[float] = None
    target_shipping_date: date
    flexibility_days: int = 14
    shipping_mode: str = "air"

class PricePredictionResponse(BaseModel):
    current_rate: float
    predicted_rate: float
    confidence: float
    recommendation: str  # "BOOK_NOW" or "WAIT"
    expected_savings: float
    optimal_booking_date: date
    price_lock_available: bool
    price_lock_fee: float

@app.post("/predict/price", response_model=PricePredictionResponse)
async def predict_price(request: PricePredictionRequest):
    """Get price prediction and booking recommendation"""
    
    # Check cache
    cache_key = f"price_pred:{request.origin}:{request.destination}:{request.target_shipping_date}"
    cached = cache.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # Generate features
    features = await generate_features(request)
    
    # Get prediction
    model = load_active_model()
    prediction = model.predict(features)
    
    # Get optimal booking window
    optimal = model.predict_optimal_booking_window(
        lane=f"{request.origin}-{request.destination}",
        target_date=request.target_shipping_date,
        flexibility_days=request.flexibility_days
    )
    
    # Determine recommendation
    current_rate = get_current_rate(request.origin, request.destination, request.shipping_mode)
    
    if optimal['expected_price'] < current_rate * 0.95:
        recommendation = "WAIT"
        expected_savings = current_rate - optimal['expected_price']
    else:
        recommendation = "BOOK_NOW"
        expected_savings = 0
    
    response = PricePredictionResponse(
        current_rate=current_rate,
        predicted_rate=optimal['expected_price'],
        confidence=optimal['confidence'],
        recommendation=recommendation,
        expected_savings=expected_savings,
        optimal_booking_date=optimal['recommended_booking_date'],
        price_lock_available=True,
        price_lock_fee=current_rate * 0.02  # 2% fee
    )
    
    # Cache for 1 hour
    cache.setex(cache_key, 3600, json.dumps(response.dict()))
    
    return response
```

---

## Part 2: CLINK Network™ Implementation

### Database Schema

```sql
-- Supplier verification and network
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    company_name_cn VARCHAR(200),
    registration_number VARCHAR(100),
    city VARCHAR(100), -- Guangzhou, Yiwu, Shenzhen, etc.
    address TEXT,
    contact_person VARCHAR(100),
    phone VARCHAR(50),
    wechat_id VARCHAR(100),
    email VARCHAR(100),
    website VARCHAR(200),
    
    -- Verification status
    verification_status VARCHAR(20) DEFAULT 'pending', -- pending, verified, gold, blacklisted
    verified_at TIMESTAMP,
    verified_by INTEGER REFERENCES verification_agents(id),
    next_verification_due TIMESTAMP,
    
    -- Categories
    primary_categories JSONB, -- ['electronics', 'mobile_accessories']
    
    -- Network benefits
    negotiated_moq_reduction_percent INTEGER DEFAULT 0,
    network_discount_percent INTEGER DEFAULT 0,
    
    -- Metrics
    quality_score DECIMAL(2,1) DEFAULT 0, -- 0-5
    on_time_delivery_rate INTEGER DEFAULT 0, -- percentage
    total_orders INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE supplier_verification_reports (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id),
    agent_id INTEGER REFERENCES verification_agents(id),
    visit_date DATE,
    report TEXT,
    photos JSONB,
    factory_video_url VARCHAR(500),
    certifications JSONB,
    
    -- Assessment
    production_capacity_score INTEGER, -- 1-5
    quality_control_score INTEGER,
    communication_score INTEGER,
    reliability_score INTEGER,
    
    recommendations TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Group buying
CREATE TABLE group_buys (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id),
    product_name VARCHAR(200),
    product_description TEXT,
    product_images JSONB,
    
    -- Pricing
    individual_price DECIMAL(10,2),
    group_price DECIMAL(10,2),
    target_quantity INTEGER,
    current_quantity INTEGER DEFAULT 0,
    
    -- Timeline
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    estimated_delivery_date DATE,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active', -- active, completed, cancelled
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE group_buy_orders (
    id SERIAL PRIMARY KEY,
    group_buy_id INTEGER REFERENCES group_buys(id),
    customer_id INTEGER REFERENCES users(id),
    quantity INTEGER,
    unit_price DECIMAL(10,2),
    total_price DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, paid, shipped
    created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews (verified purchases only)
CREATE TABLE supplier_reviews (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id),
    customer_id INTEGER REFERENCES users(id),
    shipment_id INTEGER REFERENCES shipments(id), -- must have shipped through us
    
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    review TEXT,
    photos JSONB,
    video_url VARCHAR(500),
    
    -- Specific ratings
    quality_rating INTEGER,
    communication_rating INTEGER,
    delivery_speed_rating INTEGER,
    value_rating INTEGER,
    
    -- Verified flags
    verified_purchase BOOLEAN DEFAULT TRUE,
    would_buy_again BOOLEAN,
    
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### China Verification Operations

```python
# operations/verification_workflow.py
class SupplierVerificationWorkflow:
    """Manages on-ground verification process in China"""
    
    def __init__(self):
        self.cities = ['guangzhou', 'yiwu', 'shenzhen', 'foshan']
        self.agents = self._load_verification_agents()
    
    async def schedule_verification(self, supplier_id: int):
        """Schedule physical verification visit"""
        supplier = await self.get_supplier(supplier_id)
        
        # Find available agent in supplier's city
        agent = await self.find_available_agent(supplier.city)
        
        # Schedule visit
        visit = await self.create_verification_visit(
            supplier_id=supplier_id,
            agent_id=agent.id,
            scheduled_date=self._next_available_date(agent)
        )
        
        # Send notifications
        await self.notify_supplier(supplier, visit)
        await self.notify_agent(agent, visit)
        
        return visit
    
    async def conduct_verification(self, visit_id: int, report_data: dict):
        """Process verification report from agent"""
        visit = await self.get_visit(visit_id)
        
        # Create verification report
        report = await self.create_report(visit_id, report_data)
        
        # Calculate scores
        overall_score = self._calculate_overall_score(report_data)
        
        # Update supplier status
        if overall_score >= 4.0:
            status = 'gold'
        elif overall_score >= 3.0:
            status = 'verified'
        else:
            status = 'rejected'
        
        await self.update_supplier_status(
            visit.supplier_id,
            status=status,
            quality_score=overall_score,
            verification_report_id=report.id
        )
        
        # If verified, negotiate network terms
        if status in ['verified', 'gold']:
            await self.negotiate_network_terms(visit.supplier_id)
        
        return report
    
    async def negotiate_network_terms(self, supplier_id: int):
        """Negotiate preferential terms for CLINK Network"""
        supplier = await self.get_supplier(supplier_id)
        
        # Standard network benefits
        negotiated_terms = {
            'moq_reduction_percent': 20,  -- 20% MOQ reduction
            'discount_percent': 5 if supplier.quality_score >= 4 else 3,
            'payment_terms': '30% deposit, 70% before shipping',
            'exclusive_territories': ['Mali', 'Senegal', 'Ivory Coast'],
            'commission_structure': '3% on referred orders'
        }
        
        # Send to supplier for approval
        await self.send_negotiation_package(supplier, negotiated_terms)
        
        return negotiated_terms
```

---

## Part 3: CLINK Credit™ Implementation

### Risk Model Implementation

```python
# credit/risk_model.py
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split

class ClinkCreditScorer:
    """Credit scoring model for African trade finance"""
    
    def __init__(self):
        self.model = None
        self.feature_weights = {
            'shipping_history': 0.40,
            'business_verification': 0.30,
            'market_data': 0.20,
            'behavioral': 0.10
        }
    
    def calculate_credit_score(self, customer_id: int) -> dict:
        """Calculate comprehensive credit score"""
        customer = self.get_customer(customer_id)
        
        # Feature calculation
        shipping_score = self._calculate_shipping_score(customer)
        verification_score = self._calculate_verification_score(customer)
        market_score = self._calculate_market_score(customer)
        behavioral_score = self._calculate_behavioral_score(customer)
        
        # Weighted average
        final_score = (
            shipping_score * self.feature_weights['shipping_history'] +
            verification_score * self.feature_weights['business_verification'] +
            market_score * self.feature_weights['market_data'] +
            behavioral_score * self.feature_weights['behavioral']
        )
        
        # Determine credit limit and rate
        credit_limit = self._score_to_credit_limit(final_score, customer)
        interest_rate = self._score_to_interest_rate(final_score)
        
        return {
            'credit_score': round(final_score, 1),
            'credit_limit_usd': credit_limit,
            'interest_rate_monthly': interest_rate,
            'max_term_days': 90 if final_score >= 70 else 60 if final_score >= 50 else 30,
            'risk_tier': self._get_risk_tier(final_score),
            'factor_breakdown': {
                'shipping_history': shipping_score,
                'business_verification': verification_score,
                'market_data': market_score,
                'behavioral': behavioral_score
            }
        }
    
    def _calculate_shipping_score(self, customer) -> float:
        """Score based on shipping history"""
        shipments = self.get_customer_shipments(customer.id)
        
        if len(shipments) == 0:
            return 30  -- Base score for new customers
        
        factors = {
            'shipment_count': min(len(shipments) * 2, 20),
            'on_time_payment': (shipments.payment_on_time.sum() / len(shipments)) * 30,
            'value_trend': self._calculate_value_trend(shipments) * 10,
            'no_disputes': 20 if shipments.dispute_count.sum() == 0 else 10,
            'consistent_usage': 20 if len(shipments) >= 6 else 10
        }
        
        return sum(factors.values())
    
    def _calculate_market_score(self, customer) -> float:
        """Score based on industry and country risk"""
        country_risk = {
            'Mali': 0.7,
            'Senegal': 0.8,
            'Ivory Coast': 0.75,
            'Burkina Faso': 0.6,
            'Niger': 0.5
        }
        
        industry_risk = {
            'electronics': 0.8,
            'fashion': 0.7,
            'machinery': 0.9,
            'agriculture': 0.6,
            'general_trade': 0.7
        }
        
        country_factor = country_risk.get(customer.country, 0.5)
        industry_factor = industry_risk.get(customer.industry, 0.6)
        
        return (country_factor * industry_factor) * 100
    
    def _score_to_credit_limit(self, score: float, customer) -> int:
        """Convert score to credit limit"""
        if score >= 80:
            base_limit = 50000
        elif score >= 70:
            base_limit = 25000
        elif score >= 60:
            base_limit = 10000
        elif score >= 50:
            base_limit = 5000
        else:
            base_limit = 1000
        
        # Adjust based on historical shipment values
        avg_shipment = customer.avg_shipment_value
        max_limit = avg_shipment * 3 if avg_shipment else base_limit
        
        return min(base_limit, max_limit)
    
    def _score_to_interest_rate(self, score: float) -> float:
        """Convert score to monthly interest rate"""
        rates = [
            (80, 0.015),  -- 1.5% for excellent
            (70, 0.020),  -- 2.0% for good
            (60, 0.025),  -- 2.5% for fair
            (50, 0.030),  -- 3.0% for average
            (0, 0.035)    -- 3.5% for higher risk
        ]
        
        for threshold, rate in rates:
            if score >= threshold:
                return rate
        
        return 0.04  -- 4% for very high risk
```

### Loan Management System

```python
# credit/loan_management.py
from enum import Enum
from datetime import datetime, timedelta

class LoanStatus(Enum):
    PENDING = "pending"
    APPROVED = "approved"
    DISBURSED = "disbursed"
    ACTIVE = "active"
    REPAID = "repaid"
    DEFAULTED = "defaulted"

class LoanManager:
    """Manages trade finance loans"""
    
    async def create_loan_application(self, customer_id: int, loan_request: dict) -> dict:
        """Process new loan application"""
        
        # Get credit score
        scorer = ClinkCreditScorer()
        credit assessment = scorer.calculate_credit_score(customer_id)
        
        # Validate request
        if loan_request['amount'] > credit_assessment['credit_limit_usd']:
            return {
                'approved': False,
                'reason': f'Requested amount exceeds credit limit of ${credit_assessment["credit_limit_usd"]}'
            }
        
        if loan_request['term_days'] > credit_assessment['max_term_days']:
            return {
                'approved': False,
                'reason': f'Requested term exceeds maximum of {credit_assessment["max_term_days"]} days'
            }
        
        # Calculate terms
        principal = loan_request['amount']
        monthly_rate = credit_assessment['interest_rate_monthly']
        term_months = loan_request['term_days'] / 30
        
        # Simple interest calculation
        interest = principal * monthly_rate * term_months
        total_repayment = principal + interest
        
        # Create loan schedule
        schedule = self._create_repayment_schedule(
            principal, interest, loan_request['term_days']
        )
        
        # Auto-approve if score >= 60
        auto_approved = credit_assessment['credit_score'] >= 60
        
        loan = await self.create_loan_record({
            'customer_id': customer_id,
            'amount': principal,
            'interest': interest,
            'total_repayment': total_repayment,
            'term_days': loan_request['term_days'],
            'interest_rate': monthly_rate,
            'status': LoanStatus.APPROVED if auto_approved else LoanStatus.PENDING,
            'repayment_schedule': schedule,
            'purpose': loan_request.get('purpose'),
            'supplier_id': loan_request.get('supplier_id')
        })
        
        return {
            'approved': True,
            'loan_id': loan.id,
            'amount': principal,
            'interest': interest,
            'total_repayment': total_repayment,
            'monthly_payment': schedule[0]['amount'] if schedule else None,
            'auto_approved': auto_approved,
            'credit_score': credit_assessment['credit_score']
        }
    
    def _create_repayment_schedule(self, principal: float, interest: float, term_days: int) -> list:
        """Create repayment schedule"""
        total = principal + interest
        
        if term_days <= 30:
            # Single payment
            return [{
                'installment': 1,
                'due_date': datetime.now() + timedelta(days=term_days),
                'amount': total,
                'principal': principal,
                'interest': interest,
                'status': 'pending'
            }]
        
        # Monthly installments
        num_installments = max(2, term_days // 30)
        installment_amount = total / num_installments
        principal_per_installment = principal / num_installments
        interest_per_installment = interest / num_installments
        
        schedule = []
        for i in range(num_installments):
            schedule.append({
                'installment': i + 1,
                'due_date': datetime.now() + timedelta(days=30 * (i + 1)),
                'amount': round(installment_amount, 2),
                'principal': round(principal_per_installment, 2),
                'interest': round(interest_per_installment, 2),
                'status': 'pending'
            })
        
        return schedule
```

---

## Part 4: CLINK Lockers™ Implementation

### Locker Hardware Integration

```python
# lockers/hardware_interface.py
import serial
import qrcode
from gpiozero import Button, LED
from enum import Enum

class LockerSize(Enum):
    SMALL = "small"    -- 30x30x40 cm
    MEDIUM = "medium"  -- 40x40x60 cm
    LARGE = "large"    -- 60x60x80 cm

class SmartLocker:
    """Interface with smart locker hardware"""
    
    def __init__(self, locker_id: str, location: dict):
        self.locker_id = locker_id
        self.location = location
        self.compartments = self._initialize_compartments()
        self.serial_conn = serial.Serial('/dev/ttyUSB0', 9600)
    
    def _initialize_compartments(self) -> list:
        """Initialize locker compartments"""
        return [
            {'id': f'{self.locker_id}-S{i}', 'size': LockerSize.SMALL, 'occupied': False}
            for i in range(1, 21)
        ] + [
            {'id': f'{self.locker_id}-M{i}', 'size': LockerSize.MEDIUM, 'occupied': False}
            for i in range(1, 16)
        ] + [
            {'id': f'{self.locker_id}-L{i}', 'size': LockerSize.LARGE, 'occupied': False}
            for i in range(1, 11)
        ]
    
    async def assign_compartment(self, shipment_id: str, package_size: LockerSize) -> dict:
        """Assign available compartment for shipment"""
        
        # Find available compartment of right size
        available = [
            c for c in self.compartments 
            if c['size'] == package_size and not c['occupied']
        ]
        
        if not available:
            return {'success': False, 'error': 'No compartments available for this size'}
        
        # Select first available
        compartment = available[0]
        compartment['occupied'] = True
        compartment['shipment_id'] = shipment_id
        compartment['assigned_at'] = datetime.now()
        
        # Generate access code
        access_code = self._generate_access_code()
        compartment['access_code'] = access_code
        
        # Generate QR code
        qr_data = {
            'locker_id': self.locker_id,
            'compartment': compartment['id'],
            'code': access_code,
            'shipment': shipment_id
        }
        qr_image = self._generate_qr_code(qr_data)
        
        return {
            'success': True,
            'compartment_id': compartment['id'],
            'access_code': access_code,
            'qr_code': qr_image,
            'expires_at': datetime.now() + timedelta(hours=72)
        }
    
    async def open_compartment(self, access_method: str, code: str = None) -> dict:
        """Open compartment via QR code or PIN"""
        
        if access_method == 'qr':
            # Parse QR data
            qr_data = self._parse_qr_code(code)
            compartment = self._find_compartment_by_id(qr_data['compartment'])
        else:
            # PIN entry
            compartment = self._find_compartment_by_code(code)
        
        if not compartment:
            return {'success': False, 'error': 'Invalid code'}
        
        if compartment.get('access_code') != code and access_method != 'qr':
            return {'success': False, 'error': 'Incorrect PIN'}
        
        # Check expiration
        if datetime.now() > compartment.get('expires_at', datetime.min):
            return {'success': False, 'error': 'Code expired'}
        
        # Open compartment (hardware command)
        self._send_hardware_command(f'OPEN {compartment["id"]}')
        
        # Log access
        await self.log_access(compartment['id'], 'customer_pickup')
        
        # Mark as available after pickup
        await self._release_compartment(compartment['id'])
        
        return {
            'success': True,
            'compartment_id': compartment['id'],
            'shipment_id': compartment.get('shipment_id')
        }
    
    def _generate_access_code(self) -> str:
        """Generate random 6-digit PIN"""
        return ''.join(random.choices(string.digits, k=6))
    
    def _send_hardware_command(self, command: str):
        """Send command to locker hardware"""
        self.serial_conn.write(f'{command}\n'.encode())
        response = self.serial_conn.readline().decode().strip()
        return response == 'OK'
```

### Partner Pickup Point System

```python
# lockers/partner_system.py
class PartnerPickupSystem:
    """Manages partner pickup points (shops, agents, etc.)"""
    
    async def register_partner(self, partner_data: dict) -> dict:
        """Register new pickup point partner"""
        
        # Validate partner
        validation = await self._validate_partner(partner_data)
        if not validation['valid']:
            return {'success': False, 'errors': validation['errors']}
        
        # Create partner record
        partner = await self.create_partner({
            'business_name': partner_data['business_name'],
            'business_type': partner_data['business_type'],  # pharmacy, mobile_money, shop
            'owner_name': partner_data['owner_name'],
            'phone': partner_data['phone'],
            'email': partner_data.get('email'),
            'address': partner_data['address'],
            'city': partner_data['city'],
            'coordinates': partner_data.get('coordinates'),
            'operating_hours': partner_data['operating_hours'],
            'storage_capacity': partner_data.get('storage_capacity', 50),  -- packages
            'commission_per_pickup': 0.50,  -- $0.50 per pickup
            'status': 'pending_verification'
        })
        
        # Schedule verification visit
        await self.schedule_partner_verification(partner.id)
        
        return {
            'success': True,
            'partner_id': partner.id,
            'status': 'pending_verification',
            'next_steps': 'Verification visit scheduled within 48 hours'
        }
    
    async def process_pickup(self, partner_id: int, shipment_code: str, customer_phone: str) -> dict:
        """Process package pickup at partner location"""
        
        # Verify shipment
        shipment = await self.get_shipment_by_code(shipment_code)
        if not shipment:
            return {'success': False, 'error': 'Invalid shipment code'}
        
        # Verify customer identity
        if shipment.customer_phone != customer_phone:
            return {'success': False, 'error': 'Phone number does not match'}
        
        # Verify partner assignment
        if shipment.assigned_pickup_point != partner_id:
            return {'success': False, 'error': 'Package not assigned to this location'}
        
        # Process pickup
        await self.update_shipment_status(shipment.id, 'picked_up')
        await self.record_partner_commission(partner_id, shipment.id)
        
        # Notify customer
        await self.send_pickup_confirmation(shipment.customer_id, partner_id)
        
        return {
            'success': True,
            'shipment_id': shipment.id,
            'pickup_time': datetime.now(),
            'commission_earned': 0.50
        }
```

---

## Part 5: CLINK Platform™ Implementation

### API Gateway

```python
# platform/api_gateway.py
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from slowapi import Limiter
from slowapi.util import get_remote_address
import redis

app = FastAPI(title="CLINK Platform API", version="1.0.0")
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

# CORS for third-party integrations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  -- Configured per API key in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting by API key
redis_client = redis.Redis(host='localhost', port=6379, db=0)

class APIKeyManager:
    """Manages API keys and rate limits"""
    
    TIERS = {
        'free': {'requests_per_day': 100, 'support': 'community'},
        'starter': {'requests_per_day': 1000, 'support': 'email'},
        'growth': {'requests_per_day': 10000, 'support': 'priority'},
        'enterprise': {'requests_per_day': 100000, 'support': 'dedicated'}
    }
    
    async def validate_key(self, api_key: str) -> dict:
        """Validate API key and return tier info"""
        key_data = await self.get_key_data(api_key)
        
        if not key_data:
            raise HTTPException(status_code=401, detail="Invalid API key")
        
        if key_data['status'] != 'active':
            raise HTTPException(status_code=403, detail="API key inactive")
        
        # Check rate limit
        daily_key = f"rate_limit:{api_key}:{datetime.now().strftime('%Y-%m-%d')}"
        current_count = redis_client.incr(daily_key)
        
        if current_count == 1:
            redis_client.expire(daily_key, 86400)  -- 24 hours
        
        tier_limit = self.TIERS[key_data['tier']]['requests_per_day']
        
        if current_count > tier_limit:
            raise HTTPException(status_code=429, detail="Rate limit exceeded")
        
        return key_data

security = HTTPBearer()
api_manager = APIKeyManager()

async def get_api_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Dependency to validate API requests"""
    return await api_manager.validate_key(credentials.credentials)

# Rate API
@app.get("/v1/rates/air")
@limiter.limit("10/minute")
async def get_air_rates(
    origin: str,
    destination: str,
    weight: float,
    dimensions: str = None,
    api_user: dict = Depends(get_api_user)
):
    """Get real-time air freight rates"""
    
    rates = await calculate_air_rates(
        origin=origin,
        destination=destination,
        weight=weight,
        dimensions=dimensions
    )
    
    # Log API call
    await log_api_call(api_user['id'], 'rates/air', {'origin': origin, 'destination': destination})
    
    return {
        'rates': rates,
        'currency': 'USD',
        'valid_until': (datetime.now() + timedelta(hours=24)).isoformat()
    }

# Booking API
@app.post("/v1/shipments")
async def create_shipment(
    shipment: ShipmentCreateRequest,
    api_user: dict = Depends(get_api_user)
):
    """Create new shipment booking"""
    
    # Validate API user has booking permission
    if 'booking' not in api_user['permissions']:
        raise HTTPException(status_code=403, detail="Booking not permitted")
    
    # Create shipment
    new_shipment = await process_api_booking(shipment, api_user)
    
    return {
        'shipment_id': new_shipment.id,
        'tracking_number': new_shipment.tracking_number,
        'status': 'confirmed',
        'estimated_cost': new_shipment.estimated_cost,
        'pickup_scheduled': new_shipment.pickup_time
    }

# Tracking API
@app.get("/v1/tracking/{tracking_number}")
async def track_shipment(
    tracking_number: str,
    api_user: dict = Depends(get_api_user)
):
    """Get shipment tracking information"""
    
    tracking_data = await get_tracking_info(tracking_number)
    
    if not tracking_data:
        raise HTTPException(status_code=404, detail="Tracking number not found")
    
    return {
        'tracking_number': tracking_number,
        'status': tracking_data['status'],
        'current_location': tracking_data['current_location'],
        'estimated_delivery': tracking_data['estimated_delivery'],
        'events': tracking_data['events'],
        'last_updated': tracking_data['last_updated']
    }

# Webhook Subscriptions
@app.post("/v1/webhooks")
async def create_webhook(
    webhook: WebhookSubscription,
    api_user: dict = Depends(get_api_user)
):
    """Subscribe to webhook events"""
    
    subscription = await create_webhook_subscription(
        user_id=api_user['id'],
        url=webhook.url,
        events=webhook.events,
        secret=generate_webhook_secret()
    )
    
    return {
        'subscription_id': subscription.id,
        'webhook_secret': subscription.secret,
        'status': 'active',
        'events': webhook.events
    }

@app.delete("/v1/webhooks/{subscription_id}")
async def delete_webhook(
    subscription_id: str,
    api_user: dict = Depends(get_api_user)
):
    """Unsubscribe from webhook"""
    
    await delete_webhook_subscription(subscription_id, api_user['id'])
    
    return {'status': 'deleted'}
```

### Developer Portal

```typescript
// Developer Portal - Next.js pages
// app/developer/page.tsx

import { DeveloperDashboard } from '@/components/developer/Dashboard';
import { ApiKeyManager } from '@/components/developer/ApiKeyManager';
import { Documentation } from '@/components/developer/Documentation';
import { Analytics } from '@/components/developer/Analytics';

export default function DeveloperPortal() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DeveloperNavbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-3">
            <DeveloperSidebar 
              items={[
                { icon: 'dashboard', label: 'Dashboard', href: '/developer' },
                { icon: 'key', label: 'API Keys', href: '/developer/keys' },
                { icon: 'book', label: 'Documentation', href: '/developer/docs' },
                { icon: 'chart', label: 'Analytics', href: '/developer/analytics' },
                { icon: 'webhook', label: 'Webhooks', href: '/developer/webhooks' },
                { icon: 'support', label: 'Support', href: '/developer/support' },
              ]}
            />
          </aside>
          
          {/* Main Content */}
          <div className="col-span-9">
            <Switch>
              <Route path="/developer" exact>
                <DeveloperDashboard 
                  stats={{
                    apiCallsToday: 1234,
                    apiCallsThisMonth: 45678,
                    activeShipments: 23,
                    webhooksActive: 5
                  }}
                />
              </Route>
              
              <Route path="/developer/keys">
                <ApiKeyManager 
                  tiers={['free', 'starter', 'growth', 'enterprise']}
                  onGenerate={generateApiKey}
                  onRevoke={revokeApiKey}
                />
              </Route>
              
              <Route path="/developer/docs">
                <Documentation 
                  sections={[
                    { title: 'Getting Started', slug: 'getting-started' },
                    { title: 'Authentication', slug: 'authentication' },
                    { title: 'Rates API', slug: 'rates-api' },
                    { title: 'Booking API', slug: 'booking-api' },
                    { title: 'Tracking API', slug: 'tracking-api' },
                    { title: 'Webhooks', slug: 'webhooks' },
                    { title: 'SDKs', slug: 'sdks' },
                    { title: 'Changelog', slug: 'changelog' },
                  ]}
                />
              </Route>
              
              <Route path="/developer/analytics">
                <Analytics 
                  metrics={{
                    apiUsage: fetchApiUsageData(),
                    errorRates: fetchErrorRateData(),
                    latency: fetchLatencyData(),
                    topEndpoints: fetchTopEndpoints()
                  }}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

## Part 6: Hiring Plan

### Required Team Additions

| Role | Count | When | Salary/Month | Responsibilities |
|------|-------|------|--------------|------------------|
| **ML Engineer** | 1 | Month 1 | $4,000 | Build prediction models, data pipeline |
| **Backend Developer** | 1 | Month 1 | $2,500 | API development, integrations |
| **China Operations Manager** | 1 | Month 2 | $3,500 | Supplier verification, relationships |
| **Verification Agent (China)** | 2 | Month 3 | $1,500 each | On-ground supplier audits |
| **Credit Risk Analyst** | 1 | Month 6 | $2,800 | Lending risk models, compliance |
| **DevOps Engineer** | 1 | Month 6 | $3,000 | Infrastructure, scaling |
| **Developer Relations** | 1 | Month 9 | $2,500 | API support, partner integrations |
| **Locker Operations** | 2 | Month 4 | $800 each | Locker maintenance, partner management |

**Total Team Cost**: ~$25,000/month at peak

---

## Appendix: Technology Decisions

### Why These Technologies?

| Component | Choice | Reason |
|-----------|--------|--------|
| ML Framework | Python + XGBoost | Proven for tabular data, fast inference |
| API Framework | FastAPI | Async support, auto-generated docs |
| Database | PostgreSQL + TimescaleDB | Time-series optimized for shipping data |
| Cache | Redis | Fast, supports rate limiting |
| Frontend | Next.js 15 | Team already familiar |
| Mobile | React Native | Cross-platform, reuse logic |
| Infrastructure | AWS (af-south-1) | Closest to African users |
| ML Platform | MLflow | Model versioning, experiment tracking |

### Third-Party Integrations

| Service | Purpose | Integration Complexity |
|---------|---------|----------------------|
| WhatsApp Business API | Customer notifications | Medium |
| Orange Money / Wave | Mobile payments | Medium |
| Ethiopian Airlines API | Rate/tracking data | High |
| Maersk API | Container tracking | Medium |
| Alibaba/1688 API | Supplier data | High |
| Shopify API | E-commerce integration | Low |

---

*Implementation Guide Version 1.0*  
*For technical questions: tech@chinalinkexpress.com*
