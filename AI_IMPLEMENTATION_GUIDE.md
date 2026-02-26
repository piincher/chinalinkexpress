# AI Implementation Guide
## Technical Architecture & Code Patterns for ChinaLink Express AI Features

**Document Version:** 1.0  
**Date:** February 2026  
**Audience:** Engineering Team

---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [AI Service Infrastructure](#2-ai-service-infrastructure)
3. [Feature Implementation Patterns](#3-feature-implementation-patterns)
4. [Data Pipeline Architecture](#4-data-pipeline-architecture)
5. [MLOps & Model Management](#5-mlops--model-management)
6. [Security & Privacy](#6-security--privacy)
7. [Integration Patterns](#7-integration-patterns)
8. [Performance Optimization](#8-performance-optimization)

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │   Web    │  │  Mobile  │  │ WhatsApp │  │   IVR    │  │   API    │      │
│  │  (Next)  │  │  (RN)    │  │  (Meta)  │  │ (Voice)  │  │ (REST)   │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       └─────────────┴─────────────┴─────────────┴─────────────┘            │
│                              │                                              │
└──────────────────────────────┼──────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          API GATEWAY (Kong/AWS)                             │
│  • Authentication  • Rate Limiting  • Request Routing  • Caching            │
└──────────────────────────────┬──────────────────────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  NODE.JS API    │  │  PYTHON AI API  │  │  REAL-TIME API  │
│  (Core Services)│  │   (ML Models)   │  │  (WebSocket)    │
│                 │  │                 │  │                 │
│ • User Mgmt     │  │ • Predictions   │  │ • Live Tracking │
│ • Orders        │  │ • Embeddings    │  │ • Notifications │
│ • Payments      │  │ • CV Processing │  │ • Chat          │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
┌─────────────────────────────┼─────────────────────────────────────────────┐
│                             ▼                                             │
│                     MESSAGE QUEUE (Redis/RabbitMQ)                        │
│  • Async Processing  • Event Streaming  • Job Queue                       │
└─────────────────────────────┬─────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   POSTGRESQL    │  │  VECTOR DB      │  │    REDIS        │
│  (Primary DB)   │  │  (Pinecone)     │  │   (Cache)       │
│                 │  │                 │  │                 │
│ • Users         │  │ • Product       │  │ • Sessions      │
│ • Orders        │  │   Embeddings    │  │ • Rate Limits   │
│ • Shipments     │  │ • Document      │  │ • Real-time     │
│ • Transactions  │  │   Vectors       │  │   Data          │
└─────────────────┘  └─────────────────┘  └─────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL AI SERVICES                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  OpenAI  │  Anthropic  │  Azure AI  │  Google Cloud  │  Hugging Face      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack Summary

| Component | Technology | Justification |
|-----------|------------|---------------|
| **Frontend** | Next.js 15 + React 19 | Existing stack, SSR for SEO |
| **API Gateway** | Kong or AWS API Gateway | Rate limiting, auth, routing |
| **Core API** | Node.js / NestJS | Existing team expertise |
| **AI API** | Python / FastAPI | ML ecosystem, async support |
| **Message Queue** | Redis + Bull | Simple, fast, good for Node.js |
| **Primary DB** | PostgreSQL 15 | ACID, JSON support, familiar |
| **Vector DB** | Pinecone or Weaviate | Managed, scalable, hybrid search |
| **Cache** | Redis Cluster | Sessions, real-time data |
| **Object Storage** | DigitalOcean Spaces | Existing infrastructure |
| **ML Platform** | MLflow + Feast | Experiment tracking, feature store |
| **Monitoring** | Datadog / Grafana | Full-stack observability |

---

## 2. AI Service Infrastructure

### 2.1 AI Service Directory Structure

```
ai-services/
├── api/                          # FastAPI application
│   ├── __init__.py
│   ├── main.py                   # App entry point
│   ├── config.py                 # Configuration
│   ├── dependencies.py           # FastAPI dependencies
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── sourcing.py           # Alibaba Brain endpoints
│   │   ├── logistics.py          # RouteAI endpoints
│   │   ├── assistant.py          # Bamba endpoints
│   │   ├── vision.py             # VisionQC endpoints
│   │   └── finance.py            # FinanceAI endpoints
│   └── middleware/
│       ├── __init__.py
│       ├── auth.py               # JWT validation
│       ├── rate_limit.py         # Rate limiting
│       └── logging.py            # Request logging
│
├── models/                       # ML models
│   ├── __init__.py
│   ├── sourcing/
│   │   ├── supplier_scorer.pkl
│   │   ├── price_predictor.pkl
│   │   └── embeddings/
│   ├── logistics/
│   │   ├── eta_predictor.pkl
│   │   ├── route_optimizer.pkl
│   │   └── price_forecaster.pkl
│   ├── vision/
│   │   ├── quality_classifier.pkl
│   │   ├── counterfeit_detector.pkl
│   │   └── document_ocr/
│   └── finance/
│       ├── credit_scorer.pkl
│       └── fraud_detector.pkl
│
├── services/                     # Business logic
│   ├── __init__.py
│   ├── sourcing_service.py
│   ├── logistics_service.py
│   ├── assistant_service.py
│   ├── vision_service.py
│   └── finance_service.py
│
├── pipelines/                    # Data pipelines
│   ├── __init__.py
│   ├── feature_engineering.py
│   ├── model_training.py
│   └── inference.py
│
├── clients/                      # External API clients
│   ├── __init__.py
│   ├── openai_client.py
│   ├── pinecone_client.py
│   ├── whatsapp_client.py
│   └── alibaba_client.py
│
├── core/                         # Shared utilities
│   ├── __init__.py
│   ├── exceptions.py
│   ├── logging.py
│   └── security.py
│
├── tests/
│   ├── __init__.py
│   ├── test_api/
│   ├── test_services/
│   └── test_models/
│
├── notebooks/                    # Research notebooks
│   ├── sourcing/
│   ├── logistics/
│   └── finance/
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── requirements-dev.txt
└── pyproject.toml
```

### 2.2 FastAPI Application Setup

```python
# ai-services/api/main.py
"""
AI Services API - FastAPI Application
Main entry point for all AI feature endpoints.
"""

import sentry_sdk
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse

from api.config import Settings, get_settings
from api.middleware.auth import AuthMiddleware
from api.middleware.rate_limit import RateLimitMiddleware
from api.routers import assistant, finance, logistics, sourcing, vision
from core.exceptions import AIServiceException
from core.logging import setup_logging

# Initialize Sentry for error tracking
sentry_sdk.init(
    dsn=get_settings().sentry_dsn,
    traces_sample_rate=0.1,
    profiles_sample_rate=0.1,
)

# Setup structured logging
logger = setup_logging()

app = FastAPI(
    title="ChinaLink Express AI Services",
    description="AI-powered logistics and trade services",
    version="1.0.0",
    docs_url="/api/ai/docs",
    redoc_url="/api/ai/redoc",
)

# Middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(AuthMiddleware)
app.add_middleware(RateLimitMiddleware)

# Exception handler
@app.exception_handler(AIServiceException)
async def ai_exception_handler(request: Request, exc: AIServiceException):
    logger.error(f"AI Service Error: {exc.message}", extra={
        "error_code": exc.error_code,
        "path": request.url.path,
    })
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.error_code,
            "message": exc.message,
            "details": exc.details,
        },
    )

# Health check
@app.get("/api/ai/health")
async def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "services": ["sourcing", "logistics", "assistant", "vision", "finance"],
    }

# Routers
app.include_router(sourcing.router, prefix="/api/ai/sourcing", tags=["Sourcing"])
app.include_router(logistics.router, prefix="/api/ai/logistics", tags=["Logistics"])
app.include_router(assistant.router, prefix="/api/ai/assistant", tags=["Assistant"])
app.include_router(vision.router, prefix="/api/ai/vision", tags=["Vision"])
app.include_router(finance.router, prefix="/api/ai/finance", tags=["Finance"])

@app.on_event("startup")
async def startup_event():
    """Initialize resources on startup."""
    logger.info("AI Services starting up...")
    # Load models into memory
    # Initialize connections to vector DB
    # Warm up embeddings cache

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup resources on shutdown."""
    logger.info("AI Services shutting down...")
    # Close connections
    # Save cache
```

### 2.3 Configuration Management

```python
# ai-services/api/config.py
"""Configuration management using Pydantic Settings."""

from functools import lru_cache
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )
    
    # Application
    app_name: str = "ChinaLink AI Services"
    debug: bool = False
    environment: str = "production"
    
    # API
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_workers: int = 4
    cors_origins: List[str] = ["https://chinalinkexpress.com"]
    
    # Security
    jwt_secret: str = Field(..., description="JWT signing secret")
    jwt_algorithm: str = "HS256"
    api_key_header: str = "X-API-Key"
    
    # OpenAI
    openai_api_key: str = Field(..., description="OpenAI API key")
    openai_org_id: str = Field(default="", description="OpenAI organization ID")
    openai_default_model: str = "gpt-4o"
    openai_embedding_model: str = "text-embedding-3-large"
    
    # Vector Database (Pinecone)
    pinecone_api_key: str = Field(..., description="Pinecone API key")
    pinecone_environment: str = Field(..., description="Pinecone environment")
    pinecone_index_name: str = "chinalink-products"
    
    # PostgreSQL
    postgres_host: str = Field(..., description="PostgreSQL host")
    postgres_port: int = 5432
    postgres_db: str = Field(..., description="PostgreSQL database")
    postgres_user: str = Field(..., description="PostgreSQL user")
    postgres_password: str = Field(..., description="PostgreSQL password")
    
    # Redis
    redis_host: str = "localhost"
    redis_port: int = 6379
    redis_db: int = 0
    redis_password: str = ""
    
    # WhatsApp
    whatsapp_api_token: str = Field(default="", description="WhatsApp Business API token")
    whatsapp_phone_id: str = Field(default="", description="WhatsApp phone number ID")
    
    # External APIs
    alibaba_api_key: str = Field(default="", description="Alibaba/1688 API key")
    ais_api_key: str = Field(default="", description="AIS tracking API key")
    
    # Monitoring
    sentry_dsn: str = Field(default="", description="Sentry DSN")
    datadog_api_key: str = Field(default="", description="Datadog API key")
    
    # Feature Flags
    enable_sourcing: bool = True
    enable_logistics: bool = True
    enable_assistant: bool = True
    enable_vision: bool = True
    enable_finance: bool = False  # Requires regulatory approval
    
    @property
    def postgres_dsn(self) -> str:
        return (
            f"postgresql://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )
    
    @property
    def redis_url(self) -> str:
        auth = f":{self.redis_password}@" if self.redis_password else ""
        return f"redis://{auth}{self.redis_host}:{self.redis_port}/{self.redis_db}"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
```

---

## 3. Feature Implementation Patterns

### 3.1 Alibaba Brain - Product Search with RAG

```python
# ai-services/services/sourcing_service.py
"""Sourcing Copilot - Product search and supplier scoring."""

import json
from typing import List, Optional

import openai
from pinecone import Pinecone
from tenacity import retry, stop_after_attempt, wait_exponential

from api.config import get_settings
from core.exceptions import SourcingException
from services.schemas import ProductMatch, SearchQuery, SupplierScore


class SourcingService:
    """AI-powered product sourcing service."""
    
    def __init__(self):
        self.settings = get_settings()
        self.openai_client = openai.AsyncOpenAI(api_key=self.settings.openai_api_key)
        self.pinecone = Pinecone(api_key=self.settings.pinecone_api_key)
        self.index = self.pinecone.Index(self.settings.pinecone_index_name)
    
    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
    async def search_products(
        self, 
        query: SearchQuery,
        customer_id: Optional[str] = None
    ) -> List[ProductMatch]:
        """
        Semantic product search using vector embeddings.
        
        Args:
            query: Natural language search query
            customer_id: Optional customer ID for personalization
            
        Returns:
            List of matching products with relevance scores
        """
        try:
            # Step 1: Extract structured parameters from natural language
            params = await self._extract_search_params(query.text)
            
            # Step 2: Generate embedding for semantic search
            embedding = await self._generate_embedding(query.text)
            
            # Step 3: Hybrid search (semantic + metadata filters)
            matches = self._hybrid_search(
                vector=embedding,
                filters=self._build_filters(params),
                top_k=query.limit or 20
            )
            
            # Step 4: Rerank with LLM for relevance
            reranked = await self._rerank_results(query.text, matches)
            
            # Step 5: Enrich with supplier scores
            enriched = await self._enrich_supplier_data(reranked)
            
            # Step 6: Apply customer preferences if available
            if customer_id:
                enriched = self._apply_personalization(enriched, customer_id)
            
            return enriched[:query.limit or 10]
            
        except Exception as e:
            raise SourcingException(
                message=f"Product search failed: {str(e)}",
                error_code="SOURCING_SEARCH_ERROR"
            )
    
    async def _extract_search_params(self, query_text: str) -> dict:
        """Extract structured parameters from natural language query."""
        
        system_prompt = """You are a parameter extraction system for product search.
        Extract the following from the user's query:
        - product_category: Main category of product
        - max_price: Maximum price in USD (if mentioned)
        - moq: Minimum order quantity (if mentioned)
        - quality_tier: "premium", "standard", or "budget" (if implied)
        - shipping_urgency: "urgent", "standard", or "slow" (if mentioned)
        - brand_preferences: Any specific brands mentioned
        
        Return ONLY a JSON object with these fields. Use null for unknown values."""
        
        response = await self.openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": query_text}
            ],
            response_format={"type": "json_object"},
            temperature=0.1,
        )
        
        return json.loads(response.choices[0].message.content)
    
    async def _generate_embedding(self, text: str) -> List[float]:
        """Generate vector embedding for search query."""
        response = await self.openai_client.embeddings.create(
            model=self.settings.openai_embedding_model,
            input=text,
        )
        return response.data[0].embedding
    
    def _hybrid_search(
        self, 
        vector: List[float], 
        filters: dict, 
        top_k: int
    ) -> List[dict]:
        """Perform hybrid vector + metadata search."""
        
        query_response = self.index.query(
            vector=vector,
            filter=filters,
            top_k=top_k * 2,  # Fetch more for reranking
            include_metadata=True,
        )
        
        return [
            {
                "id": match.id,
                "score": match.score,
                "metadata": match.metadata,
            }
            for match in query_response.matches
        ]
    
    async def _rerank_results(
        self, 
        query: str, 
        matches: List[dict]
    ) -> List[dict]:
        """Rerank results using LLM for relevance scoring."""
        
        # Format matches for LLM
        matches_text = "\n\n".join([
            f"Product {i+1}: {m['metadata']['title']}\n"
            f"Description: {m['metadata']['description'][:200]}...\n"
            f"Category: {m['metadata']['category']}"
            for i, m in enumerate(matches[:10])  # Rerank top 10
        ])
        
        system_prompt = f"""Given the user query: "{query}"
        
        Rate each product's relevance on a scale of 1-10.
        Return a JSON array with objects containing:
        - product_index: The product number (1-based)
        - relevance_score: 1-10 rating
        - reasoning: Brief explanation
        
        Products:\n{matches_text}"""
        
        response = await self.openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": system_prompt}],
            response_format={"type": "json_object"},
            temperature=0.2,
        )
        
        rerank_data = json.loads(response.choices[0].message.content)
        
        # Apply reranking scores
        for item in rerank_data.get("ratings", []):
            idx = item["product_index"] - 1
            if idx < len(matches):
                matches[idx]["relevance_score"] = item["relevance_score"]
                matches[idx]["rerank_reasoning"] = item["reasoning"]
        
        # Sort by combined score
        return sorted(
            matches,
            key=lambda x: (x.get("relevance_score", 5) * 0.6 + x["score"] * 0.4),
            reverse=True
        )
    
    async def score_supplier(self, supplier_id: str) -> SupplierScore:
        """Calculate trust score for a supplier using ML model."""
        
        # Fetch supplier data
        supplier_data = await self._fetch_supplier_data(supplier_id)
        
        # Feature engineering
        features = self._extract_supplier_features(supplier_data)
        
        # Load and run model
        import joblib
        model = joblib.load("models/sourcing/supplier_scorer.pkl")
        
        score = model.predict_proba([features])[0][1]  # Probability of being reliable
        
        return SupplierScore(
            supplier_id=supplier_id,
            overall_score=round(score * 100),
            breakdown={
                "transaction_history": min(features["years_on_platform"] * 10, 25),
                "review_quality": features["review_sentiment"] * 20,
                "response_rate": features["response_rate"] * 15,
                "certifications": features["cert_count"] * 5,
                "chinalink_performance": features["delivery_success_rate"] * 25,
            },
            risk_factors=self._identify_risk_factors(features),
        )
```

### 3.2 RouteAI - ETA Prediction

```python
# ai-services/services/logistics_service.py
"""Predictive logistics service - ETA prediction and route optimization."""

from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple

import joblib
import numpy as np
import pandas as pd
from pydantic import BaseModel

from core.exceptions import LogisticsException
from services.schemas import ETAPrediction, Route, RouteOptimizationRequest


class LogisticsService:
    """AI-powered logistics prediction and optimization."""
    
    def __init__(self):
        self.eta_model = joblib.load("models/logistics/eta_predictor.pkl")
        self.route_optimizer = joblib.load("models/logistics/route_optimizer.pkl")
        self.price_model = joblib.load("models/logistics/price_forecaster.pkl")
    
    async def predict_eta(
        self,
        origin: str,
        destination: str,
        carrier: str,
        shipping_mode: str,
        departure_date: datetime,
        cargo_type: Optional[str] = None,
    ) -> ETAPrediction:
        """
        Predict arrival time with confidence intervals.
        
        Returns predicted arrival date with risk factors and alternatives.
        """
        try:
            # Feature engineering
            features = self._extract_eta_features(
                origin, destination, carrier, shipping_mode, 
                departure_date, cargo_type
            )
            
            # Get prediction with uncertainty
            prediction = self.eta_model.predict(features)
            uncertainty = self._calculate_uncertainty(features)
            
            # Risk factor analysis
            risk_factors = self._analyze_risks(features)
            
            # Confidence interval
            base_eta_days = int(prediction[0])
            confidence_interval = (
                max(0, base_eta_days - int(uncertainty)),
                base_eta_days + int(uncertainty)
            )
            
            predicted_arrival = departure_date + timedelta(days=base_eta_days)
            
            return ETAPrediction(
                origin=origin,
                destination=destination,
                predicted_arrival=predicted_arrival,
                confidence_interval_days=confidence_interval,
                confidence_score=self._calculate_confidence(features),
                risk_factors=risk_factors,
                alternatives=await self._suggest_alternatives(features),
                model_version="2.1.0",
            )
            
        except Exception as e:
            raise LogisticsException(
                message=f"ETA prediction failed: {str(e)}",
                error_code="LOGISTICS_ETA_ERROR"
            )
    
    def _extract_eta_features(self, **kwargs) -> pd.DataFrame:
        """Extract features for ETA prediction model."""
        
        # Current port conditions
        port_congestion = self._get_port_congestion(kwargs["origin"], kwargs["destination"])
        weather_risk = self._get_weather_risk_score(kwargs["destination"])
        
        # Historical performance
        carrier_performance = self._get_carrier_performance(kwargs["carrier"])
        route_historical = self._get_route_historical_data(
            kwargs["origin"], kwargs["destination"], kwargs["shipping_mode"]
        )
        
        # Seasonal factors
        season = self._get_season_factor(kwargs["departure_date"])
        
        features = pd.DataFrame([{
            "origin_encoded": self._encode_port(kwargs["origin"]),
            "destination_encoded": self._encode_port(kwargs["destination"]),
            "carrier_encoded": self._encode_carrier(kwargs["carrier"]),
            "shipping_mode_encoded": self._encode_mode(kwargs["shipping_mode"]),
            "month": kwargs["departure_date"].month,
            "day_of_week": kwargs["departure_date"].weekday(),
            "port_congestion_origin": port_congestion["origin"],
            "port_congestion_destination": port_congestion["destination"],
            "weather_risk_score": weather_risk,
            "carrier_on_time_rate": carrier_performance["on_time_rate"],
            "carrier_avg_delay": carrier_performance["avg_delay_days"],
            "route_avg_days": route_historical["avg_days"],
            "route_std_days": route_historical["std_days"],
            "season_factor": season,
            "cargo_type_encoded": self._encode_cargo(kwargs.get("cargo_type", "general")),
        }])
        
        return features
    
    async def optimize_route(
        self,
        request: RouteOptimizationRequest
    ) -> List[Route]:
        """
        Multi-objective route optimization.
        
        Returns Pareto-optimal routes considering cost, time, reliability, CO2.
        """
        
        # Generate candidate routes
        candidates = self._generate_route_candidates(
            request.origin, request.destination, request.cargo
        )
        
        # Score each route on objectives
        scored_routes = []
        for route in candidates:
            scores = {
                "cost": self._estimate_route_cost(route),
                "time": self._estimate_route_time(route),
                "reliability": self._estimate_route_reliability(route),
                "carbon": self._estimate_carbon_footprint(route),
            }
            scored_routes.append((route, scores))
        
        # Filter by constraints
        feasible = [
            (r, s) for r, s in scored_routes
            if s["cost"] <= request.max_budget
            and s["time"] <= request.max_days
        ]
        
        # Find Pareto frontier
        pareto_optimal = self._find_pareto_frontier(feasible)
        
        # Sort by user's priority
        priority_weights = {
            "cost": {"cost": -1, "time": 0, "reliability": 0, "carbon": 0},
            "time": {"cost": 0, "time": -1, "reliability": 0, "carbon": 0},
            "balanced": {"cost": -0.3, "time": -0.3, "reliability": 0.4, "carbon": 0},
        }
        
        weights = priority_weights.get(request.priority, priority_weights["balanced"])
        
        sorted_routes = sorted(
            pareto_optimal,
            key=lambda x: sum(x[1][k] * v for k, v in weights.items()),
            reverse=True
        )
        
        return [route for route, _ in sorted_routes[:5]]
```

### 3.3 Bamba - WhatsApp Integration

```python
# ai-services/services/assistant_service.py
"""Multilingual trade assistant service."""

import json
from typing import Optional

import openai
import redis
from fastapi import BackgroundTasks

from api.config import get_settings
from clients.whatsapp_client import WhatsAppClient
from core.exceptions import AssistantException
from services.schemas import ConversationContext, Message, WhatsAppWebhook


class AssistantService:
    """AI-powered multilingual trade assistant."""
    
    def __init__(self):
        self.settings = get_settings()
        self.openai_client = openai.AsyncOpenAI(api_key=self.settings.openai_api_key)
        self.whatsapp = WhatsAppClient()
        self.redis = redis.Redis.from_url(self.settings.redis_url)
        
        # Conversation state management
        self.session_ttl = 3600  # 1 hour
    
    async def handle_whatsapp_message(
        self,
        webhook: WhatsAppWebhook,
        background_tasks: BackgroundTasks
    ) -> dict:
        """Handle incoming WhatsApp message."""
        
        try:
            # Extract message data
            phone_number = webhook.from_number
            message_text = webhook.message_text
            message_id = webhook.message_id
            
            # Get or create conversation context
            context = await self._get_conversation_context(phone_number)
            
            # Detect language
            detected_lang = await self._detect_language(message_text)
            
            # Process based on intent
            intent = await self._classify_intent(message_text)
            
            if intent == "track_shipment":
                response = await self._handle_tracking_query(
                    message_text, context, detected_lang
                )
            elif intent == "order_inquiry":
                response = await self._handle_order_query(
                    message_text, context, detected_lang
                )
            elif intent == "document_question":
                response = await self._handle_document_query(
                    webhook.media_url, context, detected_lang
                )
            elif intent == "general_help":
                response = await self._handle_general_query(
                    message_text, context, detected_lang
                )
            else:
                response = await self._generate_fallback_response(
                    message_text, context, detected_lang
                )
            
            # Update conversation context
            await self._update_context(phone_number, context, message_text, response)
            
            # Send response via WhatsApp
            background_tasks.add_task(
                self.whatsapp.send_message,
                to=phone_number,
                text=response,
                reply_to=message_id
            )
            
            return {"status": "processing", "message_id": message_id}
            
        except Exception as e:
            raise AssistantException(
                message=f"WhatsApp handling failed: {str(e)}",
                error_code="ASSISTANT_WHATSAPP_ERROR"
            )
    
    async def _get_conversation_context(self, phone_number: str) -> ConversationContext:
        """Retrieve conversation context from Redis."""
        
        key = f"conversation:{phone_number}"
        data = self.redis.get(key)
        
        if data:
            return ConversationContext.parse_raw(data)
        
        return ConversationContext(
            phone_number=phone_number,
            messages=[],
            customer_id=None,
            detected_language="fr",
        )
    
    async def _detect_language(self, text: str) -> str:
        """Detect message language."""
        
        # Fast path for common phrases
        if any(word in text.lower() for word in ["bonjour", "comment", "colis", "livraison"]):
            return "fr"
        if any(word in text.lower() for word in ["hello", "where", "shipment", "track"]):
            return "en"
        
        # Use LLM for ambiguous cases
        response = await self.openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{
                "role": "system",
                "content": "Detect the language of the following text. Return only the ISO 639-1 code (e.g., 'fr', 'en', 'bm' for Bambara)."
            }, {
                "role": "user",
                "content": text
            }],
            max_tokens=5,
        )
        
        return response.choices[0].message.content.strip().lower()
    
    async def _classify_intent(self, text: str) -> str:
        """Classify user intent."""
        
        intent_prompt = """Classify the user's intent into one of:
        - track_shipment: Questions about shipment location, delivery status
        - order_inquiry: Questions about orders, payments, invoices
        - document_question: Questions about uploaded documents
        - general_help: General questions about services, pricing, contact
        
        Return only the intent label."""
        
        response = await self.openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": intent_prompt},
                {"role": "user", "content": text}
            ],
            max_tokens=20,
        )
        
        return response.choices[0].message.content.strip()
    
    async def _handle_tracking_query(
        self,
        text: str,
        context: ConversationContext,
        language: str
    ) -> str:
        """Handle shipment tracking queries."""
        
        # Extract tracking number
        tracking_number = self._extract_tracking_number(text)
        
        if not tracking_number:
            return self._get_localized_response(
                "Please provide your tracking number (e.g., CLE-2026-12345).",
                language
            )
        
        # Fetch tracking data from core API
        tracking_data = await self._fetch_tracking_data(tracking_number)
        
        if not tracking_data:
            return self._get_localized_response(
                f"I couldn't find shipment {tracking_number}. Please check the number and try again.",
                language
            )
        
        # Format response based on status
        status_messages = {
            "fr": {
                "in_transit": "📦 Votre colis {tracking} est en transit.\nPosition actuelle: {location}\nLivraison estimée: {eta}",
                "delivered": "✅ Votre colis {tracking} a été livré le {date}.\nSigné par: {signee}",
                "pending": "⏳ Votre colis {tracking} est en attente d'expédition.",
            },
            "en": {
                "in_transit": "📦 Your shipment {tracking} is in transit.\nCurrent location: {location}\nEstimated delivery: {eta}",
                "delivered": "✅ Your shipment {tracking} was delivered on {date}.\nSigned by: {signee}",
                "pending": "⏳ Your shipment {tracking} is awaiting dispatch.",
            }
        }
        
        lang_messages = status_messages.get(language, status_messages["fr"])
        status = tracking_data["status"]
        
        if status in lang_messages:
            return lang_messages[status].format(**tracking_data)
        
        return tracking_data["description"]
```

### 3.4 VisionQC - Image Processing

```python
# ai-services/services/vision_service.py
"""Computer vision quality inspection service."""

import io
from typing import List, Optional

import numpy as np
import torch
import torchvision.transforms as transforms
from PIL import Image
from transformers import DetrForObjectDetection, DetrImageProcessor

from core.exceptions import VisionException
from services.schemas import Defect, InspectionResult, QualityReport


class VisionService:
    """AI-powered visual quality inspection."""
    
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        # Load models
        self.quality_model = torch.load(
            "models/vision/quality_classifier.pkl",
            map_location=self.device
        )
        self.counterfeit_model = torch.load(
            "models/vision/counterfeit_detector.pkl",
            map_location=self.device
        )
        self.defect_detector = DetrForObjectDetection.from_pretrained(
            "facebook/detr-resnet-50"
        ).to(self.device)
        self.detr_processor = DetrImageProcessor.from_pretrained(
            "facebook/detr-resnet-50"
        )
        
        # Image preprocessing
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
    
    async def inspect_product(
        self,
        image_data: bytes,
        product_category: str,
        inspection_type: str = "standard",
        reference_images: Optional[List[bytes]] = None
    ) -> InspectionResult:
        """
        Perform comprehensive product inspection.
        
        Args:
            image_data: Product image bytes
            product_category: Category for context-specific checks
            inspection_type: "standard", "detailed", or "counterfeit_check"
            reference_images: Authentic product images for comparison
            
        Returns:
            InspectionResult with quality scores and detected issues
        """
        try:
            # Load and preprocess image
            image = self._load_image(image_data)
            tensor = self.transform(image).unsqueeze(0).to(self.device)
            
            # Run inspections in parallel
            results = await self._run_parallel_inspections(
                image, tensor, product_category, inspection_type, reference_images
            )
            
            # Aggregate results
            overall_score = self._calculate_overall_score(results)
            
            # Generate report
            report = QualityReport(
                overall_score=overall_score,
                passed=overall_score >= 70,
                categories=results,
                recommendations=self._generate_recommendations(results),
                inspection_timestamp=datetime.utcnow(),
            )
            
            return InspectionResult(
                report=report,
                annotated_image=self._generate_annotated_image(image, results),
                raw_detections=results.get("defects", []),
            )
            
        except Exception as e:
            raise VisionException(
                message=f"Inspection failed: {str(e)}",
                error_code="VISION_INSPECTION_ERROR"
            )
    
    def _load_image(self, image_data: bytes) -> Image.Image:
        """Load image from bytes."""
        return Image.open(io.BytesIO(image_data)).convert("RGB")
    
    async def _run_parallel_inspections(
        self,
        image: Image.Image,
        tensor: torch.Tensor,
        category: str,
        inspection_type: str,
        reference_images: Optional[List[bytes]]
    ) -> dict:
        """Run all inspection types in parallel."""
        
        import asyncio
        
        tasks = [
            self._check_quality(tensor),
            self._detect_defects(image),
        ]
        
        if inspection_type in ["detailed", "counterfeit_check"]:
            tasks.append(self._check_packaging(tensor))
        
        if inspection_type == "counterfeit_check" and reference_images:
            tasks.append(self._detect_counterfeit(image, reference_images))
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        return {
            "quality": results[0] if not isinstance(results[0], Exception) else None,
            "defects": results[1] if not isinstance(results[1], Exception) else [],
            "packaging": results[2] if len(results) > 2 and not isinstance(results[2], Exception) else None,
            "counterfeit": results[3] if len(results) > 3 and not isinstance(results[3], Exception) else None,
        }
    
    async def _check_quality(self, tensor: torch.Tensor) -> dict:
        """Assess overall product quality."""
        
        self.quality_model.eval()
        with torch.no_grad():
            outputs = self.quality_model(tensor)
            probabilities = torch.softmax(outputs, dim=1)
            
        quality_classes = ["poor", "fair", "good", "excellent"]
        predicted_class = quality_classes[torch.argmax(probabilities).item()]
        confidence = torch.max(probabilities).item()
        
        # Convert to 0-100 score
        score_map = {"poor": 25, "fair": 50, "good": 75, "excellent": 95}
        
        return {
            "score": score_map[predicted_class],
            "rating": predicted_class,
            "confidence": round(confidence * 100, 2),
        }
    
    async def _detect_defects(self, image: Image.Image) -> List[Defect]:
        """Detect visual defects using DETR."""
        
        inputs = self.detr_processor(images=image, return_tensors="pt")
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        with torch.no_grad():
            outputs = self.defect_detector(**inputs)
        
        # Post-process results
        target_sizes = torch.tensor([image.size[::-1]])
        results = self.detr_processor.post_process_object_detection(
            outputs, threshold=0.7, target_sizes=target_sizes
        )[0]
        
        defects = []
        for score, label, box in zip(
            results["scores"], 
            results["labels"], 
            results["boxes"]
        ):
            defect_type = self.defect_detector.config.id2label[label.item()]
            
            # Map COCO labels to quality defects
            defect_mapping = {
                "scratch": ["scratch", "mark", "line"],
                "dent": ["dent", "depression"],
                "crack": ["crack", "break"],
                "stain": ["stain", "spot", "discoloration"],
            }
            
            if any(term in defect_type.lower() for terms in defect_mapping.values() for term in terms):
                defects.append(Defect(
                    type=defect_type,
                    confidence=round(score.item() * 100, 2),
                    bbox=[round(b.item(), 2) for b in box],
                    severity="major" if score > 0.9 else "minor",
                ))
        
        return defects
```

---

## 4. Data Pipeline Architecture

### 4.1 Feature Store Architecture

```python
# ai-services/pipelines/feature_engineering.py
"""Feature engineering pipeline for ML models."""

from datetime import datetime, timedelta
from typing import Dict, List

import feast
import pandas as pd
from feast import Entity, Feature, FeatureView, ValueType
from feast.types import Float32, Int64, String


# Feast Feature Store Definitions
project = "chinalink_ai"

# Entities
customer = Entity(
    name="customer_id",
    value_type=ValueType.STRING,
    description="Customer identifier",
)

shipment = Entity(
    name="shipment_id",
    value_type=ValueType.STRING,
    description="Shipment identifier",
)

supplier = Entity(
    name="supplier_id",
    value_type=ValueType.STRING,
    description="Supplier identifier",
)

# Feature Views
customer_features = FeatureView(
    name="customer_features",
    entities=["customer_id"],
    ttl=timedelta(days=365),
    features=[
        Feature(name="total_shipments", dtype=Int64),
        Feature(name="total_value_usd", dtype=Float32),
        Feature(name="avg_shipment_value", dtype=Float32),
        Feature(name="payment_delays_avg", dtype=Float32),
        Feature(name="preferred_shipping_mode", dtype=String),
        Feature(name="account_age_days", dtype=Int64),
        Feature(name="last_shipment_days_ago", dtype=Int64),
        Feature(name="dispute_rate", dtype=Float32),
    ],
    online=True,
    source=feast.FileSource(
        path="s3://chinalink-features/customer/",
        event_timestamp_column="timestamp",
    ),
)

supplier_features = FeatureView(
    name="supplier_features",
    entities=["supplier_id"],
    ttl=timedelta(days=180),
    features=[
        Feature(name="years_on_platform", dtype=Float32),
        Feature(name="transaction_count", dtype=Int64),
        Feature(name="transaction_volume_usd", dtype=Float32),
        Feature(name="avg_order_value", dtype=Float32),
        Feature(name="response_time_hours", dtype=Float32),
        Feature(name="dispute_rate", dtype=Float32),
        Feature(name="chinalink_success_rate", dtype=Float32),
        Feature(name="avg_delivery_days", dtype=Float32),
        Feature(name="review_sentiment", dtype=Float32),
    ],
    online=True,
    source=feast.FileSource(
        path="s3://chinalink-features/supplier/",
        event_timestamp_column="timestamp",
    ),
)

shipment_features = FeatureView(
    name="shipment_features",
    entities=["shipment_id"],
    ttl=timedelta(days=90),
    features=[
        Feature(name="origin_port", dtype=String),
        Feature(name="destination", dtype=String),
        Feature(name="carrier", dtype=String),
        Feature(name="shipping_mode", dtype=String),
        Feature(name="cargo_type", dtype=String),
        Feature(name="weight_kg", dtype=Float32),
        Feature(name="volume_cbm", dtype=Float32),
        Feature(name="declared_value_usd", dtype=Float32),
        Feature(name="month", dtype=Int64),
        Feature(name="day_of_week", dtype=Int64),
    ],
    online=True,
    source=feast.FileSource(
        path="s3://chinalink-features/shipment/",
        event_timestamp_column="timestamp",
    ),
)
```

### 4.2 Data Ingestion Pipeline

```python
# ai-services/pipelines/data_ingestion.py
"""Real-time and batch data ingestion pipeline."""

from datetime import datetime
from typing import Iterator

import pandas as pd
import psycopg2
from kafka import KafkaConsumer, KafkaProducer

from api.config import get_settings


class DataIngestionPipeline:
    """Pipeline for ingesting data from various sources."""
    
    def __init__(self):
        self.settings = get_settings()
        self.kafka_producer = KafkaProducer(
            bootstrap_servers=self.settings.kafka_brokers,
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )
    
    def ingest_historical_shipments(self, start_date: datetime, end_date: datetime) -> pd.DataFrame:
        """Batch ingestion of historical shipment data."""
        
        query = """
        SELECT 
            s.shipment_id,
            s.customer_id,
            s.origin_port,
            s.destination,
            s.carrier,
            s.shipping_mode,
            s.cargo_type,
            s.weight_kg,
            s.volume_cbm,
            s.declared_value_usd,
            s.departure_date,
            s.actual_arrival_date,
            s.status,
            DATEDIFF(day, s.departure_date, s.actual_arrival_date) as actual_transit_days,
            c.total_shipments as customer_total_shipments,
            c.account_created_date
        FROM shipments s
        JOIN customers c ON s.customer_id = c.customer_id
        WHERE s.departure_date BETWEEN %s AND %s
        AND s.status IN ('delivered', 'completed')
        """
        
        conn = psycopg2.connect(self.settings.postgres_dsn)
        df = pd.read_sql(query, conn, params=(start_date, end_date))
        conn.close()
        
        # Feature engineering
        df['month'] = pd.to_datetime(df['departure_date']).dt.month
        df['day_of_week'] = pd.to_datetime(df['departure_date']).dt.dayofweek
        df['account_age_days'] = (
            pd.to_datetime(df['departure_date']) - pd.to_datetime(df['account_created_date'])
        ).dt.days
        
        return df
    
    def stream_real_time_updates(self):
        """Stream real-time shipment updates."""
        
        consumer = KafkaConsumer(
            'shipment-updates',
            'tracking-events',
            'port-congestion',
            bootstrap_servers=self.settings.kafka_brokers,
            value_deserializer=lambda m: json.loads(m.decode('utf-8')),
            group_id='ai-service-ingestion'
        )
        
        for message in consumer:
            event = message.value
            event_type = message.topic
            
            # Process based on event type
            if event_type == 'shipment-updates':
                self._process_shipment_update(event)
            elif event_type == 'tracking-events':
                self._process_tracking_event(event)
            elif event_type == 'port-congestion':
                self._process_port_congestion(event)
    
    def _process_shipment_update(self, event: dict):
        """Process shipment status update."""
        
        # Update feature store
        features = {
            "shipment_id": event["shipment_id"],
            "status": event["status"],
            "current_location": event.get("location"),
            "last_update": datetime.utcnow().isoformat(),
        }
        
        # Push to online feature store for real-time inference
        self._push_to_online_store("shipment_features", features)
        
        # Trigger ETA recalculation if status changed significantly
        if event["status"] in ["departed", "arrived_port", "customs_hold"]:
            self._trigger_eta_recalculation(event["shipment_id"])
```

---

## 5. MLOps & Model Management

### 5.1 MLflow Integration

```python
# ai-services/pipelines/model_training.py
"""Model training pipeline with MLflow tracking."""

import mlflow
import mlflow.xgboost
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import xgboost as xgb

from api.config import get_settings


class ModelTrainingPipeline:
    """ML model training pipeline with experiment tracking."""
    
    def __init__(self):
        self.settings = get_settings()
        mlflow.set_tracking_uri(self.settings.mlflow_tracking_uri)
        mlflow.set_experiment("chinalink_logistics_models")
    
    def train_eta_predictor(self, training_data: pd.DataFrame) -> str:
        """Train ETA prediction model."""
        
        with mlflow.start_run(run_name="eta_predictor_v2"):
            # Log parameters
            mlflow.log_params({
                "model_type": "xgboost",
                "n_estimators": 500,
                "max_depth": 8,
                "learning_rate": 0.05,
                "objective": "reg:squarederror",
            })
            
            # Prepare data
            feature_cols = [
                'month', 'day_of_week', 'weight_kg', 'volume_cbm',
                'declared_value_usd', 'account_age_days', 'customer_total_shipments'
            ]
            
            X = training_data[feature_cols]
            y = training_data['actual_transit_days']
            
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42
            )
            
            # Train model
            model = xgb.XGBRegressor(
                n_estimators=500,
                max_depth=8,
                learning_rate=0.05,
                objective='reg:squarederror',
                random_state=42
            )
            
            model.fit(
                X_train, y_train,
                eval_set=[(X_test, y_test)],
                early_stopping_rounds=50,
                verbose=False
            )
            
            # Evaluate
            y_pred = model.predict(X_test)
            mae = mean_absolute_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)
            
            # Log metrics
            mlflow.log_metrics({
                "mae_days": mae,
                "r2_score": r2,
                "within_1_day": (abs(y_test - y_pred) <= 1).mean(),
                "within_3_days": (abs(y_test - y_pred) <= 3).mean(),
            })
            
            # Log model
            mlflow.xgboost.log_model(
                model,
                artifact_path="eta_predictor",
                registered_model_name="eta_predictor"
            )
            
            # Log feature importance
            importance = pd.DataFrame({
                'feature': feature_cols,
                'importance': model.feature_importances_
            }).sort_values('importance', ascending=False)
            
            importance.to_csv("feature_importance.csv", index=False)
            mlflow.log_artifact("feature_importance.csv")
            
            return mlflow.active_run().info.run_id
    
    def deploy_model(self, model_name: str, version: int, stage: str = "Production"):
        """Deploy model to specified stage."""
        
        client = mlflow.tracking.MlflowClient()
        
        # Transition model version to stage
        client.transition_model_version_stage(
            name=model_name,
            version=version,
            stage=stage
        )
        
        # Load model for serving
        model_uri = f"models:/{model_name}/{stage}"
        model = mlflow.pyfunc.load_model(model_uri)
        
        # Save to local model directory for API serving
        import joblib
        joblib.dump(model, f"models/logistics/{model_name}.pkl")
        
        return model_uri
```

### 5.2 Model Monitoring

```python
# ai-services/pipelines/model_monitoring.py
"""Model performance monitoring and drift detection."""

from datetime import datetime, timedelta
from typing import Dict

import numpy as np
import pandas as pd
from scipy import stats

from api.config import get_settings


class ModelMonitor:
    """Monitor model performance and detect drift."""
    
    def __init__(self):
        self.settings = get_settings()
        self.drift_threshold = 0.05
        self.performance_threshold = 0.1  # 10% degradation
    
    def check_prediction_drift(
        self,
        model_name: str,
        reference_predictions: pd.Series,
        current_predictions: pd.Series
    ) -> Dict:
        """Detect prediction drift using Kolmogorov-Smirnov test."""
        
        # KS test for distribution drift
        ks_statistic, p_value = stats.ks_2samp(
            reference_predictions,
            current_predictions
        )
        
        drift_detected = p_value < self.drift_threshold
        
        return {
            "model_name": model_name,
            "ks_statistic": ks_statistic,
            "p_value": p_value,
            "drift_detected": drift_detected,
            "reference_mean": reference_predictions.mean(),
            "current_mean": current_predictions.mean(),
            "mean_shift_pct": (
                (current_predictions.mean() - reference_predictions.mean())
                / reference_predictions.mean() * 100
            ),
            "timestamp": datetime.utcnow().isoformat(),
        }
    
    def check_feature_drift(
        self,
        reference_data: pd.DataFrame,
        current_data: pd.DataFrame
    ) -> Dict:
        """Check for feature distribution drift."""
        
        drift_results = {}
        
        for column in reference_data.columns:
            if reference_data[column].dtype in ['int64', 'float64']:
                # Numerical feature - use KS test
                ks_stat, p_val = stats.ks_2samp(
                    reference_data[column].dropna(),
                    current_data[column].dropna()
                )
                drift_results[column] = {
                    "type": "numerical",
                    "ks_statistic": ks_stat,
                    "p_value": p_val,
                    "drift": p_val < self.drift_threshold,
                }
            else:
                # Categorical feature - use Chi-square test
                ref_counts = reference_data[column].value_counts(normalize=True)
                curr_counts = current_data[column].value_counts(normalize=True)
                
                # Align categories
                all_categories = set(ref_counts.index) | set(curr_counts.index)
                ref_aligned = [ref_counts.get(cat, 0) for cat in all_categories]
                curr_aligned = [curr_counts.get(cat, 0) for cat in all_categories]
                
                chi2, p_val = stats.chisquare(curr_aligned, ref_aligned)
                drift_results[column] = {
                    "type": "categorical",
                    "chi2_statistic": chi2,
                    "p_value": p_val,
                    "drift": p_val < self.drift_threshold,
                }
        
        return drift_results
    
    def track_model_performance(
        self,
        model_name: str,
        predictions: pd.Series,
        actuals: pd.Series
    ) -> Dict:
        """Track model performance metrics."""
        
        from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
        
        mae = mean_absolute_error(actuals, predictions)
        rmse = np.sqrt(mean_squared_error(actuals, predictions))
        r2 = r2_score(actuals, predictions)
        
        # Compare to baseline
        baseline_metrics = self._get_baseline_metrics(model_name)
        
        performance = {
            "model_name": model_name,
            "timestamp": datetime.utcnow().isoformat(),
            "metrics": {
                "mae": mae,
                "rmse": rmse,
                "r2": r2,
                "mape": (abs(actuals - predictions) / actuals).mean() * 100,
            },
            "vs_baseline": {
                "mae_change_pct": (mae - baseline_metrics["mae"]) / baseline_metrics["mae"] * 100,
                "r2_change": r2 - baseline_metrics["r2"],
            },
            "alert": abs(mae - baseline_metrics["mae"]) / baseline_metrics["mae"] > self.performance_threshold,
        }
        
        # Send alert if performance degraded
        if performance["alert"]:
            self._send_performance_alert(model_name, performance)
        
        return performance
```

---

## 6. Security & Privacy

### 6.1 Authentication & Authorization

```python
# ai-services/api/middleware/auth.py
"""Authentication middleware for AI services."""

import time
from typing import Optional

import jwt
from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer
from starlette.middleware.base import BaseHTTPMiddleware

from api.config import get_settings


class AuthMiddleware(BaseHTTPMiddleware):
    """JWT authentication middleware."""
    
    def __init__(self, app):
        super().__init__(app)
        self.settings = get_settings()
        self.security = HTTPBearer()
    
    async def dispatch(self, request: Request, call_next):
        # Skip auth for health check and docs
        if request.url.path in ["/api/ai/health", "/api/ai/docs", "/api/ai/redoc"]:
            return await call_next(request)
        
        # Check for API key
        api_key = request.headers.get(self.settings.api_key_header)
        if api_key and await self._validate_api_key(api_key):
            request.state.auth_type = "api_key"
            return await call_next(request)
        
        # Check for JWT token
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.replace("Bearer ", "")
            try:
                payload = jwt.decode(
                    token,
                    self.settings.jwt_secret,
                    algorithms=[self.settings.jwt_algorithm]
                )
                request.state.user_id = payload.get("sub")
                request.state.user_role = payload.get("role", "customer")
                request.state.auth_type = "jwt"
                
                # Rate limiting per user
                if not await self._check_rate_limit(request.state.user_id):
                    raise HTTPException(status_code=429, detail="Rate limit exceeded")
                
            except jwt.ExpiredSignatureError:
                raise HTTPException(status_code=401, detail="Token expired")
            except jwt.InvalidTokenError:
                raise HTTPException(status_code=401, detail="Invalid token")
        else:
            raise HTTPException(status_code=401, detail="Authentication required")
        
        return await call_next(request)
    
    async def _validate_api_key(self, api_key: str) -> bool:
        """Validate enterprise API key."""
        # Check against database or cache
        import redis
        r = redis.Redis.from_url(get_settings().redis_url)
        return r.exists(f"api_key:{api_key}")
    
    async def _check_rate_limit(self, user_id: str, limit: int = 100) -> bool:
        """Check if user has exceeded rate limit."""
        import redis
        r = redis.Redis.from_url(get_settings().redis_url)
        
        key = f"rate_limit:{user_id}:{int(time.time()) // 60}"
        current = r.incr(key)
        if current == 1:
            r.expire(key, 60)
        
        return current <= limit
```

### 6.2 Data Privacy Controls

```python
# ai-services/core/privacy.py
"""Data privacy and PII handling utilities."""

import hashlib
import re
from typing import Any, Dict

from cryptography.fernet import Fernet


class PrivacyController:
    """Handle data privacy requirements."""
    
    def __init__(self, encryption_key: str):
        self.cipher = Fernet(encryption_key)
        self.pii_patterns = {
            "email": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
            "phone": r"\+?[1-9]\d{1,14}",
            "credit_card": r"\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b",
        }
    
    def anonymize_text(self, text: str) -> str:
        """Remove PII from text."""
        anonymized = text
        for pii_type, pattern in self.pii_patterns.items():
            anonymized = re.sub(pattern, f"[{pii_type}_REDACTED]", anonymized)
        return anonymized
    
    def pseudonymize_id(self, original_id: str) -> str:
        """Create pseudonym for user ID."""
        return hashlib.sha256(original_id.encode()).hexdigest()[:16]
    
    def encrypt_sensitive_data(self, data: str) -> bytes:
        """Encrypt sensitive data."""
        return self.cipher.encrypt(data.encode())
    
    def decrypt_sensitive_data(self, encrypted: bytes) -> str:
        """Decrypt sensitive data."""
        return self.cipher.decrypt(encrypted).decode()
    
    def apply_data_retention(self, data: Dict, retention_days: int = 365) -> bool:
        """Check if data should be retained based on age."""
        from datetime import datetime, timedelta
        
        created_at = data.get("created_at")
        if not created_at:
            return True
        
        data_age = datetime.utcnow() - datetime.fromisoformat(created_at)
        return data_age <= timedelta(days=retention_days)
```

---

## 7. Integration Patterns

### 7.1 Next.js Frontend Integration

```typescript
// src/services/aiClient.ts
/**
 * AI Services Client
 * Client-side API integration for AI features
 */

import { getSession } from 'next-auth/react';

const AI_API_BASE = process.env.NEXT_PUBLIC_AI_API_URL || 'https://ai.chinalinkexpress.com';

interface AIRequestOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  timeout?: number;
}

class AIClient {
  private async request<T>(options: AIRequestOptions): Promise<T> {
    const { endpoint, method = 'GET', body, timeout = 30000 } = options;
    
    // Get auth token
    const session = await getSession();
    const token = session?.accessToken;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(`${AI_API_BASE}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const error = await response.json();
        throw new AIError(error.message, error.error_code, response.status);
      }
      
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
  
  // Alibaba Brain - Product Search
  async searchProducts(query: string, filters?: SearchFilters): Promise<ProductSearchResult> {
    return this.request({
      endpoint: '/api/ai/sourcing/search',
      method: 'POST',
      body: { query, filters, limit: 20 },
      timeout: 10000,
    });
  }
  
  async getSupplierScore(supplierId: string): Promise<SupplierScore> {
    return this.request({
      endpoint: `/api/ai/sourcing/suppliers/${supplierId}/score`,
      method: 'GET',
    });
  }
  
  // RouteAI - ETA Prediction
  async predictETA(params: ETAPredictionRequest): Promise<ETAPrediction> {
    return this.request({
      endpoint: '/api/ai/logistics/predict-eta',
      method: 'POST',
      body: params,
      timeout: 5000,
    });
  }
  
  async optimizeRoute(params: RouteOptimizationRequest): Promise<Route[]> {
    return this.request({
      endpoint: '/api/ai/logistics/optimize-route',
      method: 'POST',
      body: params,
      timeout: 10000,
    });
  }
  
  // VisionQC - Image Inspection
  async inspectProduct(
    imageFile: File,
    category: string,
    onProgress?: (progress: number) => void
  ): Promise<InspectionResult> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('category', category);
    
    const session = await getSession();
    
    const response = await fetch(`${AI_API_BASE}/api/ai/vision/inspect`, {
      method: 'POST',
      headers: {
        'Authorization': session?.accessToken ? `Bearer ${session.accessToken}` : '',
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Inspection failed');
    }
    
    return await response.json();
  }
}

class AIError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'AIError';
  }
}

export const aiClient = new AIClient();
```

### 7.2 React Hook for AI Features

```typescript
// src/hooks/useAI.ts
/**
 * React hooks for AI feature integration
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { aiClient } from '@/services/aiClient';
import { useToast } from '@/components/ui/use-toast';

// Product Search Hook
export function useProductSearch() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: aiClient.searchProducts.bind(aiClient),
    onError: (error: AIError) => {
      toast({
        title: 'Search Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// ETA Prediction Hook
export function useETAPrediction(shipmentId: string) {
  return useQuery({
    queryKey: ['eta', shipmentId],
    queryFn: () => aiClient.predictETA({ shipmentId }),
    refetchInterval: 1000 * 60 * 30, // Refresh every 30 minutes
    staleTime: 1000 * 60 * 15,
  });
}

// Vision Inspection Hook
export function useVisionInspection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ file, category }: { file: File; category: string }) =>
      aiClient.inspectProduct(file, category),
    onSuccess: () => {
      toast({
        title: 'Inspection Complete',
        description: 'Quality analysis finished successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['inspections'] });
    },
    onError: () => {
      toast({
        title: 'Inspection Failed',
        description: 'Could not analyze image. Please try again.',
        variant: 'destructive',
      });
    },
  });
}
```

---

## 8. Performance Optimization

### 8.1 Caching Strategy

```python
# ai-services/core/cache.py
"""Caching utilities for AI services."""

import hashlib
import json
from functools import wraps
from typing import Any, Callable

import redis

from api.config import get_settings


class CacheManager:
    """Multi-layer caching for AI services."""
    
    def __init__(self):
        self.redis = redis.Redis.from_url(get_settings().redis_url)
        self.default_ttl = 3600  # 1 hour
    
    def cached(
        self,
        ttl: int = None,
        key_prefix: str = "",
        cache_empty: bool = False
    ) -> Callable:
        """Decorator for caching function results."""
        
        def decorator(func: Callable) -> Callable:
            @wraps(func)
            async def wrapper(*args, **kwargs):
                # Generate cache key
                cache_key = self._generate_key(key_prefix, func.__name__, args, kwargs)
                
                # Try to get from cache
                cached = self.redis.get(cache_key)
                if cached:
                    return json.loads(cached)
                
                # Execute function
                result = await func(*args, **kwargs)
                
                # Cache result if not empty or if cache_empty is True
                if result or cache_empty:
                    self.redis.setex(
                        cache_key,
                        ttl or self.default_ttl,
                        json.dumps(result, default=str)
                    )
                
                return result
            
            return wrapper
        return decorator
    
    def _generate_key(
        self,
        prefix: str,
        func_name: str,
        args: tuple,
        kwargs: dict
    ) -> str:
        """Generate deterministic cache key."""
        
        key_data = {
            "prefix": prefix,
            "func": func_name,
            "args": args,
            "kwargs": kwargs,
        }
        key_hash = hashlib.sha256(
            json.dumps(key_data, sort_keys=True).encode()
        ).hexdigest()[:16]
        
        return f"{prefix}:{func_name}:{key_hash}"
    
    def invalidate_pattern(self, pattern: str) -> int:
        """Invalidate all keys matching pattern."""
        
        keys = self.redis.scan_iter(match=pattern)
        count = 0
        for key in keys:
            self.redis.delete(key)
            count += 1
        return count


# Usage examples
cache = CacheManager()

class SourcingService:
    @cache.cached(ttl=1800, key_prefix="sourcing")  # 30 min cache
    async def search_products(self, query: str, limit: int = 10):
        # Expensive search operation
        return await self._perform_search(query, limit)
    
    @cache.cached(ttl=3600, key_prefix="supplier")  # 1 hour cache
    async def get_supplier_score(self, supplier_id: str):
        # ML inference
        return await self._calculate_score(supplier_id)
```

### 8.2 Batch Processing

```python
# ai-services/core/batch.py
"""Batch processing for efficient inference."""

import asyncio
from collections import deque
from typing import Callable, List, Any
from dataclasses import dataclass
import time


@dataclass
class BatchItem:
    input_data: Any
    future: asyncio.Future
    timestamp: float


class BatchProcessor:
    """Dynamic batching for ML inference."""
    
    def __init__(
        self,
        process_fn: Callable[[List[Any]], List[Any]],
        max_batch_size: int = 32,
        max_latency_ms: float = 50.0
    ):
        self.process_fn = process_fn
        self.max_batch_size = max_batch_size
        self.max_latency = max_latency_ms / 1000.0
        
        self.queue: deque[BatchItem] = deque()
        self.processing = False
        self._lock = asyncio.Lock()
    
    async def submit(self, input_data: Any) -> Any:
        """Submit item for batch processing."""
        
        future = asyncio.get_event_loop().create_future()
        item = BatchItem(input_data, future, time.time())
        
        async with self._lock:
            self.queue.append(item)
            
            # Start processing if not already running
            if not self.processing:
                self.processing = True
                asyncio.create_task(self._process_batch())
        
        return await future
    
    async def _process_batch(self):
        """Process batched items."""
        
        while True:
            async with self._lock:
                if not self.queue:
                    self.processing = False
                    return
                
                # Collect batch
                batch = []
                start_time = self.queue[0].timestamp
                
                while (
                    len(batch) < self.max_batch_size and
                    self.queue and
                    (time.time() - start_time) < self.max_latency
                ):
                    batch.append(self.queue.popleft())
            
            if batch:
                try:
                    # Process batch
                    inputs = [item.input_data for item in batch]
                    results = await self.process_fn(inputs)
                    
                    # Fulfill futures
                    for item, result in zip(batch, results):
                        if not item.future.done():
                            item.future.set_result(result)
                
                except Exception as e:
                    # Fail all items in batch
                    for item in batch:
                        if not item.future.done():
                            item.future.set_exception(e)
            
            # Small delay to allow more items to queue
            await asyncio.sleep(0.001)


# Usage example
async def batch_embeddings(texts: List[str]) -> List[List[float]]:
    """Process multiple texts in a single API call."""
    
    response = await openai.embeddings.create(
        model="text-embedding-3-large",
        input=texts  # Batch input
    )
    
    return [item.embedding for item in response.data]

# Create batch processor
embedding_processor = BatchProcessor(
    process_fn=batch_embeddings,
    max_batch_size=100,
    max_latency_ms=50
)

# Use in service
async def get_embedding(text: str) -> List[float]:
    return await embedding_processor.submit(text)
```

---

## Appendix A: API Reference

### A.1 Sourcing Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai/sourcing/search` | POST | Semantic product search |
| `/api/ai/sourcing/suppliers/{id}/score` | GET | Get supplier trust score |
| `/api/ai/sourcing/negotiate` | POST | Get negotiation suggestions |
| `/api/ai/sourcing/compare` | POST | Compare multiple products |

### A.2 Logistics Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai/logistics/predict-eta` | POST | Predict shipment arrival |
| `/api/ai/logistics/optimize-route` | POST | Find optimal shipping route |
| `/api/ai/logistics/price-forecast` | GET | Get price predictions |

### A.3 Assistant Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai/assistant/whatsapp/webhook` | POST | WhatsApp webhook handler |
| `/api/ai/assistant/chat` | POST | General chat interface |
| `/api/ai/assistant/document-qa` | POST | Document question answering |

### A.4 Vision Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai/vision/inspect` | POST | Quality inspection |
| `/api/ai/vision/detect-counterfeit` | POST | Counterfeit detection |
| `/api/ai/vision/ocr` | POST | Document OCR |

---

*Document prepared for ChinaLink Express Engineering Team*  
*Last Updated: February 2026*
