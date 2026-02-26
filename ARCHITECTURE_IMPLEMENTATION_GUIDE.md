# ChinaLink Express - Implementation Guide
## Code Patterns, API Specifications & Best Practices

---

## 1. Project Structure

```
chinalink-platform/
├── apps/
│   ├── web/                    # Next.js 15 frontend
│   ├── mobile/                 # React Native app
│   └── admin/                  # Admin dashboard
├── services/
│   ├── api-gateway/            # Kong configuration
│   ├── sourcing-service/       # AI Sourcing (Python)
│   ├── tracking-service/       # Visual Tracking (Node.js)
│   ├── predictive-service/     # ML Predictions (Python)
│   ├── finance-service/        # Payments/Finance (Node.js)
│   ├── cargo3d-service/        # 3D Visualization (Node.js)
│   └── blockchain-service/     # Hyperledger integration
├── ml/
│   ├── models/                 # Trained model artifacts
│   ├── training/               # Training pipelines
│   └── feature-store/          # Feast configuration
├── infrastructure/
│   ├── terraform/              # IaC definitions
│   ├── kubernetes/             # K8s manifests
│   └── docker/                 # Docker configurations
├── shared/
│   ├── types/                  # Shared TypeScript types
│   ├── constants/              # Shared constants
│   └── proto/                  # gRPC/protobuf definitions
└── docs/
    ├── api/                    # API documentation
    └── architecture/           # Architecture docs
```

---

## 2. API Design Patterns

### 2.1 REST API Standards

```typescript
// Standard API Response Wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
  links?: {
    self: string;
    first?: string;
    prev?: string;
    next?: string;
    last?: string;
  };
}

interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  requestId: string;
}

// Example: Sourcing Search Endpoint
// GET /api/v1/sourcing/search?q=laptop&category=electronics&min_price=100&max_price=500

interface SourcingSearchResponse extends ApiResponse<{
  products: SourcingProduct[];
  facets: {
    categories: FacetItem[];
    priceRanges: FacetItem[];
    suppliers: FacetItem[];
  };
}> {}

// Example: Predictive ETA Endpoint
// GET /api/v1/predictions/shipments/{shipmentId}/eta

interface ETAPredictionResponse extends ApiResponse<{
  shipmentId: string;
  prediction: {
    earliest: string; // ISO 8601
    expected: string;
    latest: string;
  };
  confidence: number;
  factors: RiskFactor[];
  modelVersion: string;
  calculatedAt: string;
}> {}
```

### 2.2 Error Handling

```typescript
// apps/web/lib/api/client.ts

class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public details?: Record<string, string[]>,
    public requestId?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const errorCodes = {
  // Authentication
  UNAUTHORIZED: { status: 401, message: 'Authentication required' },
  FORBIDDEN: { status: 403, message: 'Insufficient permissions' },
  TOKEN_EXPIRED: { status: 401, message: 'Token has expired' },
  
  // Validation
  VALIDATION_ERROR: { status: 400, message: 'Invalid input data' },
  INVALID_JSON: { status: 400, message: 'Invalid JSON in request body' },
  
  // Business Logic
  PRODUCT_NOT_FOUND: { status: 404, message: 'Product not found' },
  SUPPLIER_UNAVAILABLE: { status: 409, message: 'Supplier is currently unavailable' },
  INSUFFICIENT_CREDIT: { status: 402, message: 'Insufficient credit limit' },
  ESCROW_ALREADY_FUNDED: { status: 409, message: 'Escrow is already funded' },
  
  // Rate Limiting
  RATE_LIMIT_EXCEEDED: { status: 429, message: 'Too many requests' },
  QUOTA_EXCEEDED: { status: 429, message: 'API quota exceeded' },
  
  // System
  INTERNAL_ERROR: { status: 500, message: 'Internal server error' },
  SERVICE_UNAVAILABLE: { status: 503, message: 'Service temporarily unavailable' },
  GATEWAY_TIMEOUT: { status: 504, message: 'Upstream service timeout' },
} as const;

async function handleApiResponse<T>(response: Response): Promise<T> {
  const requestId = response.headers.get('X-Request-Id');
  
  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(
      error.error.code,
      error.error.message,
      response.status,
      error.error.details,
      requestId || undefined
    );
  }
  
  const data = await response.json();
  return data.data;
}
```

---

## 3. Service Implementation Patterns

### 3.1 AI Sourcing Service (Python/FastAPI)

```python
# services/sourcing-service/src/main.py

from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import asyncio
from datetime import datetime

from src.models.product import SourcingProduct
from src.services.search import SearchService
from src.services.price_prediction import PricePredictionService
from src.services.quality_assessment import QualityAssessmentService
from src.services.negotiation import NegotiationService
from src.dependencies import get_current_user, rate_limiter

app = FastAPI(
    title="ChinaLink AI Sourcing API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://chinalinkexpress.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Request/Response Models
class SearchRequest(BaseModel):
    query: str
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    min_moq: Optional[int] = None
    max_moq: Optional[int] = None
    certifications: List[str] = []
    sort_by: str = "relevance"  # relevance, price_asc, price_desc, rating
    page: int = 1
    per_page: int = 20

class SearchResponse(BaseModel):
    products: List[SourcingProduct]
    total: int
    facets: dict
    query_enhanced: str  # AI-enhanced query
    suggested_queries: List[str]

class NegotiationStartRequest(BaseModel):
    product_id: str
    target_price: float
    target_currency: str = "USD"
    quantity: int
    message: Optional[str] = None
    urgency: str = "normal"  # low, normal, high, critical

# Service instances
search_service = SearchService()
price_service = PricePredictionService()
quality_service = QualityAssessmentService()
negotiation_service = NegotiationService()

@app.get("/api/v1/sourcing/search", response_model=SearchResponse)
async def search_products(
    q: str = Query(..., min_length=2, max_length=200),
    category: Optional[str] = None,
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    user = Depends(get_current_user),
    rate_limit = Depends(rate_limiter("search", requests=100, window=60))
):
    """
    Search for products across Alibaba, 1688, and Taobao.
    
    Features:
    - Semantic search with query enhancement
    - Real-time price prediction
    - Quality assessment scoring
    - Personalized results based on user history
    """
    try:
        # Parallel execution of search, price prediction, and quality assessment
        search_task = search_service.search(
            query=q,
            category=category,
            price_range=(min_price, max_price) if min_price or max_price else None,
            page=page,
            per_page=per_page,
            user_preferences=user.preferences
        )
        
        results = await search_task
        
        # Enrich with AI predictions
        enriched_products = await asyncio.gather(*[
            enrich_product(product)
            for product in results.products
        ])
        
        return SearchResponse(
            products=enriched_products,
            total=results.total,
            facets=results.facets,
            query_enhanced=results.enhanced_query,
            suggested_queries=results.suggestions
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={
                "code": "SEARCH_FAILED",
                "message": "Failed to execute search",
                "request_id": str(uuid.uuid4())
            }
        )

async def enrich_product(product: SourcingProduct) -> SourcingProduct:
    """Enrich product with AI-generated insights."""
    price_prediction = await price_service.predict(product)
    quality_score = await quality_service.assess(product)
    
    product.predicted_price = price_prediction
    product.quality = quality_score
    return product

@app.post("/api/v1/sourcing/negotiations")
async def start_negotiation(
    request: NegotiationStartRequest,
    user = Depends(get_current_user)
):
    """
    Start an AI-powered negotiation with a supplier.
    
    The AI will:
    1. Analyze the product and market conditions
    2. Determine optimal negotiation strategy
    3. Engage with supplier via chat
    4. Report back with results
    """
    negotiation = await negotiation_service.start(
        customer_id=user.id,
        product_id=request.product_id,
        target_price=Money(amount=request.target_price, currency=request.target_currency),
        quantity=request.quantity,
        urgency=request.urgency,
        initial_message=request.message
    )
    
    return {
        "negotiation_id": negotiation.id,
        "status": negotiation.status,
        "strategy": negotiation.strategy.summary(),
        "estimated_duration": negotiation.estimated_duration,
        "created_at": negotiation.created_at
    }

@app.get("/api/v1/sourcing/negotiations/{negotiation_id}")
async def get_negotiation_status(
    negotiation_id: str,
    user = Depends(get_current_user)
):
    """Get real-time status of an ongoing negotiation."""
    negotiation = await negotiation_service.get(negotiation_id)
    
    if negotiation.customer_id != user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    return {
        "id": negotiation.id,
        "status": negotiation.status,
        "current_offer": negotiation.current_offer,
        "messages": negotiation.messages[-10:],  # Last 10 messages
        "progress": negotiation.progress_percentage,
        "next_action": negotiation.next_action
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check for load balancer."""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }
```

### 3.2 Visual Tracking Service (Node.js)

```typescript
// services/tracking-service/src/services/photo.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createHash } from 'crypto';
import sharp from 'sharp';
import { PhotoCheckpoint } from '../entities/photo-checkpoint.entity';
import { BlockchainService } from './blockchain.service';
import { AIService } from './ai.service';
import { IPFSService } from './ipfs.service';

interface UploadPhotoDto {
  shipmentId: string;
  checkpointType: CheckpointType;
  imageBuffer: Buffer;
  metadata: {
    agentId: string;
    deviceId: string;
    gps: { lat: number; lng: number };
    timestamp: Date;
  };
}

interface PhotoAnalysisResult {
  damageDetected: boolean;
  damageSeverity: 'none' | 'minor' | 'moderate' | 'severe';
  damageRegions: DamageRegion[];
  objects: DetectedObject[];
  ocrText: string;
  conditionDelta?: ConditionDelta;
}

@Injectable()
export class PhotoService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    @InjectRepository(PhotoCheckpoint)
    private checkpointRepo: Repository<PhotoCheckpoint>,
    private blockchainService: BlockchainService,
    private aiService: AIService,
    private ipfsService: IPFSService,
  ) {
    this.s3Client = new S3Client({ region: process.env.AWS_REGION });
    this.bucketName = process.env.S3_BUCKET_NAME;
  }

  async uploadAndProcess(dto: UploadPhotoDto): Promise<PhotoCheckpoint> {
    const { shipmentId, checkpointType, imageBuffer, metadata } = dto;

    // 1. Validate EXIF and agent signature
    await this.validatePhoto(metadata);

    // 2. Generate image hash for integrity
    const imageHash = createHash('sha256').update(imageBuffer).digest('hex');

    // 3. Process image (resize, compress)
    const processedImages = await this.processImage(imageBuffer);

    // 4. Upload to S3
    const s3Keys = await this.uploadToS3(shipmentId, processedImages);

    // 5. AI Analysis
    const analysis = await this.aiService.analyzeImage(imageBuffer, {
      previousCheckpoint: await this.getPreviousCheckpoint(shipmentId),
      detectDamage: true,
      readLabels: true,
    });

    // 6. Upload to IPFS for decentralized storage
    const ipfsHash = await this.ipfsService.upload(imageBuffer);

    // 7. Record on blockchain
    const blockchainTx = await this.blockchainService.recordCheckpoint({
      imageHash,
      ipfsHash,
      metadata: {
        shipmentId,
        checkpointType,
        timestamp: metadata.timestamp,
        gps: metadata.gps,
        agentId: metadata.agentId,
      },
      analysis: {
        damageDetected: analysis.damageDetected,
        conditionHash: this.hashCondition(analysis),
      },
    });

    // 8. Save to database
    const checkpoint = this.checkpointRepo.create({
      shipmentId,
      type: checkpointType,
      location: metadata.gps,
      timestamp: metadata.timestamp,
      agentId: metadata.agentId,
      images: [
        {
          originalUrl: s3Keys.original,
          thumbnailUrl: s3Keys.thumbnail,
          ipfsHash,
          imageHash,
          size: imageBuffer.length,
          metadata: {
            width: processedImages.original.width,
            height: processedImages.original.height,
            format: processedImages.original.format,
            exif: processedImages.original.exif,
          },
        },
      ],
      analysis: {
        damage: analysis.damage,
        objects: analysis.objects,
        ocr: analysis.ocr,
        conditionDelta: analysis.conditionDelta,
      },
      blockchain: {
        transactionHash: blockchainTx.hash,
        blockNumber: blockchainTx.blockNumber,
        timestamp: new Date(),
      },
    });

    return this.checkpointRepo.save(checkpoint);
  }

  private async processImage(buffer: Buffer): Promise<ProcessedImages> {
    const original = sharp(buffer);
    const metadata = await original.metadata();

    // Generate thumbnail
    const thumbnail = await original
      .resize(400, 400, { fit: 'inside' })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Generate web-optimized version
    const webOptimized = await original
      .resize(1920, 1920, { fit: 'inside' })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer();

    return {
      original: {
        buffer,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        exif: metadata.exif,
      },
      thumbnail: {
        buffer: thumbnail,
        width: 400,
        height: 400,
      },
      web: {
        buffer: webOptimized,
        width: Math.min(metadata.width, 1920),
        height: Math.min(metadata.height, 1920),
      },
    };
  }

  private async uploadToS3(
    shipmentId: string,
    images: ProcessedImages,
  ): Promise<S3Keys> {
    const timestamp = Date.now();
    const prefix = `shipments/${shipmentId}/photos/${timestamp}`;

    const uploads = await Promise.all([
      this.s3Upload(`${prefix}/original.jpg`, images.original.buffer, 'image/jpeg'),
      this.s3Upload(`${prefix}/thumbnail.jpg`, images.thumbnail.buffer, 'image/jpeg'),
      this.s3Upload(`${prefix}/web.jpg`, images.web.buffer, 'image/jpeg'),
    ]);

    return {
      original: uploads[0],
      thumbnail: uploads[1],
      web: uploads[2],
    };
  }

  private async s3Upload(key: string, body: Buffer, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
      Metadata: {
        'x-amz-meta-uploaded-by': 'tracking-service',
        'x-amz-meta-timestamp': new Date().toISOString(),
      },
    });

    await this.s3Client.send(command);
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  private async validatePhoto(metadata: PhotoMetadata): Promise<void> {
    // Verify agent is authorized
    // Verify device is registered
    // Verify GPS is within expected route
    // Verify timestamp is recent (within 5 minutes)
    const timeDiff = Date.now() - metadata.timestamp.getTime();
    if (timeDiff > 5 * 60 * 1000) {
      throw new Error('Photo timestamp too old');
    }
  }

  private hashCondition(analysis: PhotoAnalysisResult): string {
    const condition = {
      damage: analysis.damageDetected,
      severity: analysis.damageSeverity,
      objectCount: analysis.objects.length,
    };
    return createHash('sha256')
      .update(JSON.stringify(condition))
      .digest('hex');
  }
}
```

### 3.3 Predictive Service - ML Model Serving

```python
# services/predictive-service/src/models/eta_predictor.py

import os
import joblib
import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Optional
from datetime import datetime, timedelta
from dataclasses import dataclass
import xgboost as xgb
from prophet import Prophet
import tensorflow as tf
from feast import FeatureStore

from src.features.shipment_features import ShipmentFeatureEngine
from src.utils.logging import get_logger

logger = get_logger(__name__)

@dataclass
class ETAPrediction:
    shipment_id: str
    p10: datetime  # 10th percentile (optimistic)
    p50: datetime  # 50th percentile (expected)
    p90: datetime  # 90th percentile (pessimistic)
    confidence: float
    factors: List[RiskFactor]
    model_version: str
    calculated_at: datetime

@dataclass
class RiskFactor:
    type: str
    severity: str
    description: str
    impact_days: float
    mitigation: Optional[str]

class ETAPredictor:
    """
    Ensemble model for shipment delivery time prediction.
    
    Combines:
    - XGBoost for tabular feature processing
    - LSTM for sequence patterns
    - Prophet for seasonality
    """
    
    def __init__(self, model_path: str):
        self.model_path = model_path
        self.feature_engine = ShipmentFeatureEngine()
        self.feature_store = FeatureStore(repo_path="/app/feature_repo")
        
        # Load models
        self.xgb_model = joblib.load(f"{model_path}/xgb_model.pkl")
        self.lstm_model = tf.keras.models.load_model(f"{model_path}/lstm_model")
        self.prophet_model = joblib.load(f"{model_path}/prophet_model.pkl")
        
        # Model weights for ensemble
        self.weights = {
            'xgboost': 0.5,
            'lstm': 0.3,
            'prophet': 0.2
        }
        
        self.model_version = self._load_version()
    
    def predict(
        self,
        shipment_id: str,
        current_checkpoint: Optional[str] = None
    ) -> ETAPrediction:
        """
        Generate ETA prediction for a shipment.
        
        Args:
            shipment_id: Unique shipment identifier
            current_checkpoint: Current tracking checkpoint (optional)
            
        Returns:
            ETAPrediction with confidence intervals and risk factors
        """
        try:
            # 1. Fetch features from feature store
            features = self._fetch_features(shipment_id)
            
            # 2. Generate engineered features
            feature_vector = self.feature_engine.transform(features)
            
            # 3. Get predictions from each model
            xgb_pred = self._predict_xgboost(feature_vector)
            lstm_pred = self._predict_lstm(features['sequence'])
            prophet_pred = self._predict_prophet(features['timestamp'])
            
            # 4. Ensemble prediction
            ensemble_pred = self._ensemble_predictions(
                xgb_pred, lstm_pred, prophet_pred
            )
            
            # 5. Calculate confidence intervals
            p10, p50, p90 = self._calculate_confidence_intervals(
                ensemble_pred, feature_vector
            )
            
            # 6. Identify risk factors
            risk_factors = self._identify_risk_factors(features, feature_vector)
            
            # 7. Calculate confidence score
            confidence = self._calculate_confidence(
                ensemble_pred, risk_factors
            )
            
            return ETAPrediction(
                shipment_id=shipment_id,
                p10=p10,
                p50=p50,
                p90=p90,
                confidence=confidence,
                factors=risk_factors,
                model_version=self.model_version,
                calculated_at=datetime.utcnow()
            )
            
        except Exception as e:
            logger.error(f"Prediction failed for shipment {shipment_id}: {e}")
            raise
    
    def _fetch_features(self, shipment_id: str) -> Dict:
        """Fetch 200+ features from feature store."""
        features = self.feature_store.get_online_features(
            entity_rows=[{"shipment_id": shipment_id}],
            features=[
                # Shipment features
                "shipment:weight",
                "shipment:volume",
                "shipment:service_type",
                "shipment:origin_country",
                "shipment:destination_country",
                
                # Carrier features
                "carrier:historical_ontime_rate",
                "carrier:current_capacity_utilization",
                "carrier:avg_delay_by_lane",
                
                # Port features
                "port:congestion_index",
                "port:avg_wait_time",
                "port:berth_availability",
                
                # Vessel features (if sea)
                "vessel:age",
                "vessel:current_position",
                "vessel:average_speed",
                
                # Weather features
                "weather:forecast_conditions",
                "weather:storm_probability",
                
                # Historical features
                "historical:lane_avg_transit_time",
                "historical:seasonal_factor",
                "historical:customs_avg_clearance",
            ]
        ).to_dict()
        
        return features
    
    def _predict_xgboost(self, features: np.ndarray) -> Dict:
        """Generate prediction using XGBoost model."""
        dmatrix = xgb.DMatrix(features.reshape(1, -1))
        
        # Predict quantiles
        pred_p10 = self.xgb_model.predict(dmatrix, iteration_range=(0, 100))
        pred_p50 = self.xgb_model.predict(dmatrix, iteration_range=(100, 200))
        pred_p90 = self.xgb_model.predict(dmatrix, iteration_range=(200, 300))
        
        return {
            'p10': pred_p10[0],
            'p50': pred_p50[0],
            'p90': pred_p90[0]
        }
    
    def _predict_lstm(self, sequence: np.ndarray) -> Dict:
        """Generate prediction using LSTM model."""
        sequence = sequence.reshape(1, sequence.shape[0], sequence.shape[1])
        prediction = self.lstm_model.predict(sequence)
        
        return {
            'p10': prediction[0][0],
            'p50': prediction[0][1],
            'p90': prediction[0][2]
        }
    
    def _predict_prophet(self, timestamp: datetime) -> Dict:
        """Generate prediction using Prophet model for seasonality."""
        future = self.prophet_model.make_future_dataframe(periods=30)
        forecast = self.prophet_model.predict(future)
        
        # Extract prediction for target date
        target_row = forecast[forecast['ds'] == timestamp].iloc[0]
        
        return {
            'p10': target_row['yhat_lower'],
            'p50': target_row['yhat'],
            'p90': target_row['yhat_upper']
        }
    
    def _ensemble_predictions(
        self,
        xgb_pred: Dict,
        lstm_pred: Dict,
        prophet_pred: Dict
    ) -> Dict:
        """Combine predictions using weighted average."""
        return {
            'p10': (
                xgb_pred['p10'] * self.weights['xgboost'] +
                lstm_pred['p10'] * self.weights['lstm'] +
                prophet_pred['p10'] * self.weights['prophet']
            ),
            'p50': (
                xgb_pred['p50'] * self.weights['xgboost'] +
                lstm_pred['p50'] * self.weights['lstm'] +
                prophet_pred['p50'] * self.weights['prophet']
            ),
            'p90': (
                xgb_pred['p90'] * self.weights['xgboost'] +
                lstm_pred['p90'] * self.weights['lstm'] +
                prophet_pred['p90'] * self.weights['prophet']
            ),
        }
    
    def _identify_risk_factors(
        self,
        features: Dict,
        feature_vector: np.ndarray
    ) -> List[RiskFactor]:
        """Identify risk factors that could delay shipment."""
        risks = []
        
        # Weather risk
        if features.get('weather:storm_probability', 0) > 0.3:
            risks.append(RiskFactor(
                type='weather',
                severity='high' if features['weather:storm_probability'] > 0.6 else 'medium',
                description=f"Storm probability: {features['weather:storm_probability']:.0%}",
                impact_days=features['weather:storm_probability'] * 3,
                mitigation='Monitor weather updates, consider alternative route'
            ))
        
        # Port congestion risk
        if features.get('port:congestion_index', 0) > 0.7:
            risks.append(RiskFactor(
                type='congestion',
                severity='critical' if features['port:congestion_index'] > 0.9 else 'high',
                description=f"Port congestion: {features['port:congestion_index']:.0%}",
                impact_days=(features['port:congestion_index'] - 0.5) * 5,
                mitigation='Expedite customs documentation'
            ))
        
        # Carrier performance risk
        if features.get('carrier:historical_ontime_rate', 1.0) < 0.8:
            risks.append(RiskFactor(
                type='carrier',
                severity='medium',
                description=f"Carrier on-time rate: {features['carrier:historical_ontime_rate']:.0%}",
                impact_days=1.5,
                mitigation=None
            ))
        
        # Customs risk
        if features.get('historical:customs_avg_clearance', 0) > 48:
            risks.append(RiskFactor(
                type='customs',
                severity='medium',
                description=f"Avg customs clearance: {features['historical:customs_avg_clearance']:.0f}h",
                impact_days=features['historical:customs_avg_clearance'] / 24 - 1,
                mitigation='Ensure all documentation is complete'
            ))
        
        return risks
    
    def _calculate_confidence(
        self,
        prediction: Dict,
        risk_factors: List[RiskFactor]
    ) -> float:
        """Calculate overall confidence score (0-1)."""
        base_confidence = 0.85
        
        # Reduce confidence based on risks
        for risk in risk_factors:
            if risk.severity == 'critical':
                base_confidence -= 0.15
            elif risk.severity == 'high':
                base_confidence -= 0.10
            elif risk.severity == 'medium':
                base_confidence -= 0.05
        
        # Reduce confidence if prediction interval is wide
        interval_width = (prediction['p90'] - prediction['p10']) / prediction['p50']
        if interval_width > 0.5:
            base_confidence -= 0.10
        
        return max(0.3, min(0.95, base_confidence))
    
    def _load_version(self) -> str:
        """Load model version from metadata."""
        version_file = f"{self.model_path}/version.txt"
        if os.path.exists(version_file):
            with open(version_file, 'r') as f:
                return f.read().strip()
        return "unknown"
```

---

## 4. Frontend Integration Patterns

### 4.1 React Hook for ETA Display

```typescript
// apps/web/hooks/useShipmentETA.ts

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface UseShipmentETAReturn {
  eta: {
    earliest: Date;
    expected: Date;
    latest: Date;
  } | null;
  confidence: number;
  factors: RiskFactor[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refresh: () => void;
}

export function useShipmentETA(shipmentId: string): UseShipmentETAReturn {
  const [pollingInterval, setPollingInterval] = useState(300000); // 5 minutes

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['shipment-eta', shipmentId],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/predictions/shipments/${shipmentId}/eta`,
        {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch ETA prediction');
      }
      
      return response.json();
    },
    refetchInterval: pollingInterval,
    staleTime: 60000, // 1 minute
  });

  // Adjust polling based on shipment status
  useEffect(() => {
    if (data?.data?.confidence < 0.5) {
      setPollingInterval(60000); // Poll more frequently if low confidence
    } else {
      setPollingInterval(300000);
    }
  }, [data]);

  return {
    eta: data?.data?.prediction ? {
      earliest: new Date(data.data.prediction.earliest),
      expected: new Date(data.data.prediction.expected),
      latest: new Date(data.data.prediction.latest),
    } : null,
    confidence: data?.data?.confidence ?? 0,
    factors: data?.data?.factors ?? [],
    isLoading,
    isError,
    error,
    refresh: refetch,
  };
}

// Usage in component
function ShipmentETACard({ shipmentId }: { shipmentId: string }) {
  const { eta, confidence, factors, isLoading } = useShipmentETA(shipmentId);

  if (isLoading) return <ETASkeleton />;

  return (
    <div className="eta-card">
      <div className="eta-main">
        <span className="eta-label">Expected Delivery</span>
        <time className="eta-date">
          {eta?.expected.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <span className="eta-window">
          Between {eta?.earliest.toLocaleDateString()} and {eta?.latest.toLocaleDateString()}
        </span>
      </div>
      
      <ConfidenceBadge confidence={confidence} />
      
      {factors.length > 0 && (
        <RiskFactorsList factors={factors} />
      )}
    </div>
  );
}
```

### 4.2 3D Cargo Visualizer Component

```typescript
// apps/web/components/cargo3d/ContainerViewer.tsx

'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface ContainerViewerProps {
  solution: PackingSolution;
  container: ContainerSpec;
}

function Container({ dimensions }: { dimensions: { l: number; w: number; h: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <mesh ref={meshRef} position={[0, dimensions.h / 2, 0]}>
      <boxGeometry args={[dimensions.l, dimensions.h, dimensions.w]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
        transmission={0.9}
        thickness={0.1}
      />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(dimensions.l, dimensions.h, dimensions.w)]} />
        <lineBasicMaterial color="#3b82f6" linewidth={2} />
      </lineSegments>
    </mesh>
  );
}

function PackedItem({
  item,
  isSelected,
  onClick,
}: {
  item: PackedItem;
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (isSelected && meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={[item.position.x, item.position.y, item.position.z]}>
      <mesh
        ref={meshRef}
        rotation={[item.rotation.x, item.rotation.y, item.rotation.z]}
        onClick={onClick}
      >
        <boxGeometry args={[item.dimensions.l, item.dimensions.h, item.dimensions.w]} />
        <meshStandardMaterial
          color={isSelected ? '#3b82f6' : '#64748b'}
          transparent
          opacity={0.8}
        />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(item.dimensions.l, item.dimensions.h, item.dimensions.w)]} />
          <lineBasicMaterial color={isSelected ? '#60a5fa' : '#94a3b8'} />
        </lineSegments>
      </mesh>
      
      {isSelected && (
        <Text
          position={[0, item.dimensions.h / 2 + 5, 0]}
          fontSize={3}
          color="#1e293b"
          anchorX="center"
          anchorY="bottom"
        >
          {item.name}
        </Text>
      )}
    </group>
  );
}

export function ContainerViewer({ solution, container }: ContainerViewerProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'full' | 'exploded'>('full');

  const scale = 0.1; // Scale down for viewing

  return (
    <div className="container-viewer">
      <div className="viewer-controls">
        <button onClick={() => setViewMode(viewMode === 'full' ? 'exploded' : 'full')}>
          {viewMode === 'full' ? 'Exploded View' : 'Full View'}
        </button>
        <div className="utilization-stats">
          <span>Volume: {(solution.metrics.volumeUtilization * 100).toFixed(1)}%</span>
          <span>Weight: {(solution.metrics.weightUtilization * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="canvas-container" style={{ height: '500px' }}>
        <Canvas shadows camera={{ position: [100, 100, 100], fov: 50 }}>
          <PerspectiveCamera makeDefault position={[150, 150, 150]} />
          <OrbitControls enablePan enableZoom enableRotate />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[100, 100, 50]} intensity={1} castShadow />
          
          <Container
            dimensions={{
              l: container.internalDimensions.length * scale,
              w: container.internalDimensions.width * scale,
              h: container.internalDimensions.height * scale,
            }}
          />
          
          {solution.items.map((item) => (
            <PackedItem
              key={item.id}
              item={{
                ...item,
                position: {
                  x: item.position.x * scale,
                  y: item.position.y * scale,
                  z: item.position.z * scale,
                },
                dimensions: {
                  l: item.dimensions.length * scale,
                  w: item.dimensions.width * scale,
                  h: item.dimensions.height * scale,
                },
              }}
              isSelected={selectedItem === item.id}
              onClick={() => setSelectedItem(item.id)}
            />
          ))}
          
          <gridHelper args={[200, 20, '#e2e8f0', '#e2e8f0']} />
        </Canvas>
      </div>

      {selectedItem && (
        <ItemDetailsPanel
          item={solution.items.find((i) => i.id === selectedItem)!}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
```

---

## 5. Infrastructure as Code

### 5.1 Terraform - AWS Infrastructure

```hcl
# infrastructure/terraform/main.tf

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
  
  backend "s3" {
    bucket = "chinalink-terraform-state"
    key    = "production/terraform.tfstate"
    region = "af-south-1"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "chinalink-platform"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

# VPC Configuration
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"
  
  name = "chinalink-${var.environment}"
  cidr = "10.0.0.0/16"
  
  azs             = ["${var.aws_region}a", "${var.aws_region}b", "${var.aws_region}c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  
  enable_nat_gateway = true
  enable_vpn_gateway = false
  
  tags = {
    Name = "chinalink-vpc-${var.environment}"
  }
}

# EKS Cluster
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"
  
  cluster_name    = "chinalink-${var.environment}"
  cluster_version = "1.28"
  
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  
  eks_managed_node_groups = {
    general = {
      desired_size = 3
      min_size     = 2
      max_size     = 10
      
      instance_types = ["m6i.xlarge"]
      
      labels = {
        workload = "general"
      }
    }
    
    ml = {
      desired_size = 2
      min_size     = 1
      max_size     = 5
      
      instance_types = ["g5.xlarge"]  # GPU instances for ML
      
      labels = {
        workload = "ml"
      }
      
      taints = [{
        key    = "nvidia.com/gpu"
        value  = "true"
        effect = "NO_SCHEDULE"
      }]
    }
  }
  
  cluster_addons = {
    coredns = {
      most_recent = true
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent = true
    }
    aws-ebs-csi-driver = {
      most_recent = true
    }
  }
}

# RDS - PostgreSQL
module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 6.0"
  
  identifier = "chinalink-${var.environment}"
  
  engine               = "postgres"
  engine_version       = "15.4"
  family               = "postgres15"
  major_engine_version = "15"
  instance_class       = "db.r6g.xlarge"
  
  allocated_storage = 100
  max_allocated_storage = 500
  
  db_name  = "chinalink"
  username = "admin"
  port     = 5432
  
  multi_az               = true
  db_subnet_group_name   = module.vpc.database_subnet_group
  vpc_security_group_ids = [aws_security_group.rds.id]
  
  backup_retention_period = 30
  backup_window          = "03:00-04:00"
  maintenance_window     = "Mon:04:00-Mon:05:00"
  
  storage_encrypted = true
  
  performance_insights_enabled = true
}

# ElastiCache - Redis
module "redis" {
  source  = "terraform-aws-modules/elasticache/aws"
  version = "~> 1.0"
  
  cluster_id = "chinalink-${var.environment}"
  
  engine          = "redis"
  engine_version  = "7.0"
  node_type       = "cache.r6g.large"
  num_cache_nodes = 2
  
  subnet_group_name = aws_elasticache_subnet_group.redis.name
  security_group_ids = [aws_security_group.redis.id]
  
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
}

# S3 Buckets
resource "aws_s3_bucket" "photos" {
  bucket = "chinalink-photos-${var.environment}"
}

resource "aws_s3_bucket_versioning" "photos" {
  bucket = aws_s3_bucket.photos.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_encryption" "photos" {
  bucket = aws_s3_bucket.photos.id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
  }
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "cdn" {
  enabled = true
  
  origin {
    domain_name = aws_s3_bucket.photos.bucket_regional_domain_name
    origin_id   = "S3-photos"
    
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }
  
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-photos"
    
    forwarded_values {
      query_string = false
      
      cookies {
        forward = "none"
      }
    }
    
    viewer_protocol_policy = "https-only"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }
  
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = aws_acm_certificate.cdn.arn
    ssl_support_method             = "sni-only"
  }
}
```

---

## 6. Deployment Patterns

### 6.1 GitHub Actions - CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml

name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  AWS_REGION: af-south-1
  ECR_REGISTRY: ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.af-south-1.amazonaws.com
  EKS_CLUSTER: chinalink-production

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run tests
        run: npm run test:ci
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: [web, sourcing-service, tracking-service, predictive-service, finance-service]
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Build and push image
        uses: docker/build-push-action@v5
        with:
          context: ./services/${{ matrix.service }}
          push: ${{ github.event_name != 'pull_request' }}
          tags: |
            ${{ env.ECR_REGISTRY }}/chinalink-${{ matrix.service }}:${{ github.sha }}
            ${{ env.ECR_REGISTRY }}/chinalink-${{ matrix.service }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Update kubeconfig
        run: |
          aws eks update-kubeconfig --name ${{ env.EKS_CLUSTER }} --region ${{ env.AWS_REGION }}
      
      - name: Deploy to EKS
        run: |
          # Update image tags in kustomization
          cd infrastructure/kubernetes/overlays/production
          kustomize edit set image \
            web=${{ env.ECR_REGISTRY }}/chinalink-web:${{ github.sha }} \
            sourcing-service=${{ env.ECR_REGISTRY }}/chinalink-sourcing-service:${{ github.sha }} \
            tracking-service=${{ env.ECR_REGISTRY }}/chinalink-tracking-service:${{ github.sha }} \
            predictive-service=${{ env.ECR_REGISTRY }}/chinalink-predictive-service:${{ github.sha }} \
            finance-service=${{ env.ECR_REGISTRY }}/chinalink-finance-service:${{ github.sha }}
          
          # Apply manifests
          kustomize build . | kubectl apply -f -
      
      - name: Verify deployment
        run: |
          kubectl rollout status deployment/web -n production --timeout=300s
          kubectl rollout status deployment/sourcing-service -n production --timeout=300s
      
      - name: Run smoke tests
        run: |
          ./scripts/smoke-tests.sh
```

---

## 7. Monitoring & Observability

### 7.1 OpenTelemetry Configuration

```typescript
// shared/observability/tracing.ts

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME,
  [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION,
  [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV,
});

const traceExporter = new OTLPTraceExporter({
  url: process.env.OTEL_COLLECTOR_URL || 'http://otel-collector:4318/v1/traces',
});

const metricExporter = new OTLPMetricExporter({
  url: process.env.OTEL_COLLECTOR_URL || 'http://otel-collector:4318/v1/metrics',
});

export const sdk = new NodeSDK({
  resource,
  traceExporter,
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 60000,
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': {
        enabled: false, // Too noisy
      },
    }),
  ],
});

// Initialize tracing
sdk.start();

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((err) => console.error('Error terminating tracing', err))
    .finally(() => process.exit(0));
});
```

### 7.2 Custom Business Metrics

```typescript
// services/finance-service/src/metrics/business.metrics.ts

import { metrics, Counter, Histogram, ObservableGauge } from '@opentelemetry/api';

const meter = metrics.getMeter('finance-service');

// Business metrics
export const paymentCounter = meter.createCounter('payments.total', {
  description: 'Total number of payments processed',
});

export const paymentAmountHistogram = meter.createHistogram('payments.amount', {
  description: 'Distribution of payment amounts',
  unit: 'USD',
});

export const escrowActiveGauge = meter.createObservableGauge('escrow.active', {
  description: 'Number of active escrow agreements',
});

export const creditUtilizationHistogram = meter.createHistogram('credit.utilization', {
  description: 'Credit utilization ratio',
  unit: '1',
});

// Usage in code
class PaymentService {
  async processPayment(payment: PaymentRequest): Promise<PaymentResult> {
    const startTime = Date.now();
    
    try {
      // Process payment logic
      const result = await this.executePayment(payment);
      
      // Record metrics
      paymentCounter.add(1, {
        currency: payment.currency,
        method: payment.method,
        status: 'success',
      });
      
      paymentAmountHistogram.record(payment.amount, {
        currency: payment.currency,
      });
      
      return result;
      
    } catch (error) {
      paymentCounter.add(1, {
        currency: payment.currency,
        method: payment.method,
        status: 'failed',
        error_code: error.code,
      });
      throw error;
      
    } finally {
      // Record latency
      const duration = Date.now() - startTime;
      meter.createHistogram('payments.duration').record(duration, {
        currency: payment.currency,
      });
    }
  }
}
```

---

*This implementation guide provides practical patterns and code examples for building the ChinaLink Express defensible features platform.*
