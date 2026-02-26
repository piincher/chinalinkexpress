# ChinaLink Express - Architecture Diagrams
## Visual Reference for Technical Implementation

---

## 1. Overall System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web App<br/>Next.js 15]
        MOBILE[Mobile App<br/>React Native]
        ADMIN[Admin Portal<br/>Next.js]
    end

    subgraph "Edge Layer"
        CDN[Cloudflare CDN]
        WAF[Web Application Firewall]
    end

    subgraph "API Layer"
        GATEWAY[Kong API Gateway]
        AUTH[Auth Service<br/>OAuth 2.0]
    end

    subgraph "Feature Services"
        SOURCING[AI Sourcing<br/>Python/FastAPI]
        TRACKING[Visual Tracking<br/>Node.js/Python]
        PREDICTIVE[Predictive Engine<br/>Python/MLflow]
        FINANCE[Finance Platform<br/>Node.js]
        CARGO3D[3D Cargo Viz<br/>Node.js/Python]
    end

    subgraph "AI/ML Platform"
        MLFLOW[MLflow<br/>Model Registry]
        FEAST[Feast<br/>Feature Store]
        KAFKA[Apache Kafka<br/>Event Streaming]
    end

    subgraph "Blockchain Layer"
        HL[Hyperledger Fabric]
        IPFS[IPFS Storage]
    end

    subgraph "Data Layer"
        PG[(PostgreSQL<br/>Primary DB)]
        REDIS[(Redis<br/>Cache/Session)]
        S3[(AWS S3<br/>Object Storage)]
        DELTA[Delta Lake<br/>Data Lake]
    end

    subgraph "External APIs"
        ALIBABA[Alibaba API]
        MOBILE_MONEY[Mobile Money APIs]
        AIS[AIS/Vessel Tracking]
        WEATHER[Weather APIs]
    end

    WEB --> CDN
    MOBILE --> CDN
    CDN --> WAF
    WAF --> GATEWAY
    GATEWAY --> AUTH
    GATEWAY --> SOURCING
    GATEWAY --> TRACKING
    GATEWAY --> PREDICTIVE
    GATEWAY --> FINANCE
    GATEWAY --> CARGO3D

    SOURCING --> MLFLOW
    SOURCING --> FEAST
    TRACKING --> HL
    TRACKING --> IPFS
    PREDICTIVE --> MLFLOW
    PREDICTIVE --> FEAST
    PREDICTIVE --> KAFKA

    SOURCING --> ALIBABA
    FINANCE --> MOBILE_MONEY
    PREDICTIVE --> AIS
    PREDICTIVE --> WEATHER

    SOURCING --> PG
    TRACKING --> S3
    PREDICTIVE --> DELTA
    FINANCE --> PG
    CARGO3D --> S3

    MLFLOW --> S3
    FEAST --> REDIS
```

---

## 2. AI Sourcing Assistant - Data Flow

```mermaid
sequenceDiagram
    actor Customer
    participant Web as Web App
    participant API as Search API
    participant AI as AI Services
    participant Cache as Redis Cache
    participant Vector as Vector DB
    participant Alibaba as Alibaba API
    participant ML as ML Models

    Customer->>Web: Search "electronic components"
    Web->>API: GET /api/sourcing/search
    API->>Cache: Check cache
    
    alt Cache Hit
        Cache-->>API: Return cached results
    else Cache Miss
        API->>AI: Process query
        AI->>AI: Translate FR→CN
        AI->>AI: Extract intent & filters
        
        par Parallel Search
            AI->>Vector: Semantic search
            AI->>Alibaba: API search
        end
        
        AI->>ML: Score suppliers
        AI->>ML: Predict prices
        AI->>ML: Assess quality
        
        AI->>AI: Rank & filter results
        AI->>Cache: Store results (5min TTL)
    end
    
    API-->>Web: JSON results
    Web-->>Customer: Display products
    
    Customer->>Web: Start negotiation
    Web->>API: POST /api/sourcing/negotiate
    API->>AI: Initiate negotiation bot
    AI->>AI: Load strategy
    AI->>Alibaba: Send message
    Alibaba-->>AI: Supplier response
    AI->>AI: Analyze & respond
    API-->>Web: Negotiation status
```

---

## 3. Visual Tracking - Photo Verification Flow

```mermaid
sequenceDiagram
    actor Agent as Field Agent
    participant Mobile as Mobile App
    participant Upload as Upload Service
    participant AI as AI Analysis
    participant Blockchain as Hyperledger
    participant IPFS as IPFS
    participant S3 as AWS S3
    participant Customer as Customer Web

    Agent->>Mobile: Take checkpoint photo
    Mobile->>Mobile: Capture EXIF (GPS, timestamp)
    Mobile->>Mobile: Sign with device key
    Mobile->>Upload: POST /upload
    
    Upload->>Upload: Validate EXIF
    Upload->>Upload: Verify agent signature
    Upload->>S3: Store original
    Upload->>Upload: Generate thumbnail
    
    par Async Processing
        Upload->>AI: Analyze image
        AI->>AI: Detect damage (YOLO)
        AI->>AI: Read labels (OCR)
        AI->>AI: Compare with previous
        AI->>Upload: Analysis results
    and Blockchain Storage
        Upload->>IPFS: Upload to IPFS
        IPFS-->>Upload: IPFS hash
        Upload->>Blockchain: Store hash + metadata
        Blockchain-->>Upload: Transaction receipt
    end
    
    Upload->>Customer: Real-time notification
    Customer->>Customer: View in gallery
    
    Note over Blockchain: Immutable proof of condition
    Note over IPFS: Decentralized storage
```

---

## 4. Predictive Logistics - ETA Calculation

```mermaid
flowchart TD
    A[Shipment Event] --> B{Event Type}
    
    B -->|Pickup| C[Extract Features]
    B -->|In Transit| C
    B -->|Port Delay| D[Update Features]
    
    C --> E[Feature Store]
    D --> E
    
    E --> F[Fetch 200+ Features]
    F --> G[ML Ensemble]
    
    subgraph "ML Models"
        G --> H[XGBoost<br/>Static Features]
        G --> I[LSTM<br/>Sequence Patterns]
        G --> J[Prophet<br/>Seasonality]
    end
    
    H --> K[Aggregate Predictions]
    I --> K
    J --> K
    
    K --> L[Calculate Confidence]
    L --> M[Identify Risk Factors]
    
    M --> N[Generate ETA Window]
    N --> O[p10: Earliest]
    N --> P[p50: Expected]
    N --> Q[p90: Latest]
    
    O --> R[Cache Result]
    P --> R
    Q --> R
    
    R --> S[Notify Customer]
    R --> T[Alert if Anomaly]
    
    U[Actual Delivery] --> V[Feedback Loop]
    V --> W[Retrain Models]
```

---

## 5. Embedded Finance - Escrow Flow

```mermaid
sequenceDiagram
    actor Buyer as Customer
    actor Seller as Supplier
    participant Web as Platform
    participant Escrow as Escrow Service
    participant Payment as Payment Orchestrator
    participant MobileMoney as Orange Money/Wave
    participant Blockchain as Blockchain Ledger

    Buyer->>Web: Create escrow agreement
    Web->>Escrow: POST /escrow/create
    Escrow->>Escrow: Generate smart contract
    Escrow->>Blockchain: Deploy contract
    Blockchain-->>Escrow: Contract address
    
    Escrow->>Buyer: Funding required
    Buyer->>Web: Fund escrow
    Web->>Payment: Process payment
    Payment->>MobileMoney: Charge customer
    MobileMoney-->>Payment: Success
    Payment-->>Escrow: Funds held
    
    Escrow->>Seller: Order confirmed, ship goods
    
    loop Checkpoints
        Seller->>Escrow: Milestone complete
        Escrow->>Blockchain: Verify condition
        Blockchain-->>Escrow: Verified
        Escrow->>Payment: Release portion
        Payment->>Seller: Transfer funds
    end
    
    alt Dispute
        Buyer->>Escrow: File dispute
        Escrow->>Escrow: Freeze funds
        Escrow->>Arbitrator: Review case
        Arbitrator->>Escrow: Decision
        Escrow->>Payment: Execute decision
    else Successful
        Escrow->>Payment: Release final payment
        Payment->>Seller: Transfer remaining
        Escrow->>Blockchain: Close contract
    end
```

---

## 6. 3D Cargo Visualizer - Optimization Pipeline

```mermaid
flowchart LR
    subgraph "Input"
        A[Product Photos]
        B[Dimensions<br/>Manual/AI]
        C[Weight & Properties]
    end
    
    subgraph "Processing"
        D[Dimension Estimation<br/>PyTorch]
        E[3D Model Generation<br/>Procedural]
        F[Bin Packing<br/>OR-Tools]
        G[Stability Check<br/>Physics Sim]
    end
    
    subgraph "Optimization"
        H[Multi-Objective]
        I{Constraints Met?}
        J[Adjust Parameters]
    end
    
    subgraph "Output"
        K[3D Visualization<br/>Three.js]
        L[Loading Instructions]
        M[Cost Analysis]
    end
    
    A --> D
    B --> E
    C --> F
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I -->|No| J
    J --> F
    I -->|Yes| K
    I -->|Yes| L
    I -->|Yes| M
```

---

## 7. Security Architecture

```mermaid
flowchart TB
    subgraph "Perimeter"
        A[DDoS Protection]
        B[WAF Rules]
        C[Rate Limiting]
    end
    
    subgraph "Authentication"
        D[OAuth 2.0 + PKCE]
        E[JWT Tokens]
        F[MFA]
        G[Device Fingerprinting]
    end
    
    subgraph "Authorization"
        H[RBAC]
        I[Scope Validation]
        J[Resource Ownership]
    end
    
    subgraph "Service Mesh"
        K[mTLS]
        L[Service Identity]
        M[Traffic Encryption]
    end
    
    subgraph "Data Protection"
        N[Encryption at Rest]
        O[Encryption in Transit]
        P[Field-Level Encryption]
        Q[Tokenization]
    end
    
    subgraph "Monitoring"
        R[SIEM]
        S[Audit Logs]
        T[Anomaly Detection]
    end
    
    A --> B --> C --> D
    D --> E --> F --> G
    G --> H --> I --> J
    J --> K --> L --> M
    M --> N --> O --> P --> Q
    Q --> R --> S --> T
```

---

## 8. Data Architecture

```mermaid
erDiagram
    CUSTOMER ||--o{ SHIPMENT : places
    CUSTOMER ||--o{ ESCROW : participates
    CUSTOMER ||--o{ CREDIT_LINE : has
    
    SHIPMENT ||--o{ CHECKPOINT : contains
    SHIPMENT ||--o{ PREDICTION : generates
    SHIPMENT ||--|| ESCROW : secures
    
    CHECKPOINT ||--o{ TRACKING_IMAGE : includes
    CHECKPOINT ||--|| BLOCKCHAIN_PROOF : verified_by
    
    TRACKING_IMAGE ||--o{ IMAGE_ANALYSIS : analyzed
    
    PRODUCT ||--o{ SUPPLIER : offered_by
    PRODUCT ||--o{ PRICE_HISTORY : has
    PRODUCT ||--o{ QUALITY_SCORE : assessed
    
    SUPPLIER ||--o{ SUPPLIER_RATING : rated
    
    CARGO_ITEM ||--o{ PACKING_SOLUTION : packed_in
    PACKING_SOLUTION ||--|| CONTAINER_SPEC : uses
    
    CUSTOMER {
        string id
        string email
        string phone
        json kyc_data
        decimal trust_score
        timestamp created_at
    }
    
    SHIPMENT {
        string id
        string tracking_number
        string status
        json origin
        json destination
        decimal weight
        json dimensions
        timestamp created_at
    }
    
    CHECKPOINT {
        string id
        string type
        point location
        timestamp captured_at
        string agent_id
    }
    
    TRACKING_IMAGE {
        string id
        string url
        string ipfs_hash
        json exif_data
        string blockchain_tx
    }
    
    PRODUCT {
        string id
        json external_ids
        json names
        json pricing
        json quality_scores
        timestamp last_crawled
    }
    
    PREDICTION {
        string id
        string shipment_id
        timestamp earliest
        timestamp expected
        timestamp latest
        decimal confidence
        json risk_factors
    }
    
    ESCROW {
        string id
        string type
        json parties
        json terms
        string status
        string blockchain_ref
    }
    
    PACKING_SOLUTION {
        string id
        json items
        decimal volume_utilization
        decimal weight_utilization
        json cost_breakdown
    }
```

---

## 9. Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        subgraph "Kubernetes Cluster"
            subgraph "Frontend Namespace"
                WEB1[Web Pod 1]
                WEB2[Web Pod 2]
                WEB3[Web Pod 3]
            end
            
            subgraph "API Namespace"
                API1[API Pod 1]
                API2[API Pod 2]
            end
            
            subgraph "ML Namespace"
                ML1[ML Serving Pod]
                ML2[Training Pod]
            end
            
            subgraph "Data Namespace"
                DB[(PostgreSQL Primary)]
                DB_REP[(PostgreSQL Replica)]
                CACHE[(Redis Cluster)]
            end
        end
        
        subgraph "Storage"
            S3[(AWS S3)]
            EFS[(EFS Shared Storage)]
        end
        
        subgraph "External"
            CDN[Cloudflare CDN]
            LB[AWS ALB]
        end
    end
    
    subgraph "Monitoring"
        PROM[Prometheus]
        GRAF[Grafana]
        JAEGER[Jaeger]
        ELK[ELK Stack]
    end
    
    CDN --> LB
    LB --> WEB1
    LB --> WEB2
    LB --> WEB3
    
    WEB1 --> API1
    WEB2 --> API1
    WEB3 --> API2
    
    API1 --> DB
    API2 --> DB_REP
    API1 --> CACHE
    
    API1 --> ML1
    API2 --> ML1
    
    ML1 --> S3
    ML2 --> EFS
    
    API1 --> PROM
    API2 --> PROM
    ML1 --> PROM
    
    PROM --> GRAF
```

---

## 10. Integration Points

```mermaid
flowchart LR
    subgraph "ChinaLink Platform"
        CORE[Core Services]
    end
    
    subgraph "E-Commerce"
        ALIBABA[Alibaba API]
        TAOBAO[Taobao API]
        A1688[1688 API]
    end
    
    subgraph "Logistics"
        MAERSK[Maersk API]
        ETHIOPIAN[Ethiopian Airlines]
        DHL[DHL API]
    end
    
    subgraph "Payments"
        ORANGE[Orange Money]
        WAVE[Wave]
        MTN[MTN MoMo]
        STRIPE[Stripe]
        WISE[Wise]
    end
    
    subgraph "Data"
        AIS[MarineTraffic AIS]
        WEATHER[OpenWeather]
        PORTS[PortBase]
    end
    
    subgraph "Compliance"
        KYC[Sumsub KYC]
        FRAUD[Sift Fraud]
    end
    
    CORE --> ALIBABA
    CORE --> TAOBAO
    CORE --> A1688
    
    CORE --> MAERSK
    CORE --> ETHIOPIAN
    CORE --> DHL
    
    CORE --> ORANGE
    CORE --> WAVE
    CORE --> MTN
    CORE --> STRIPE
    CORE --> WISE
    
    CORE --> AIS
    CORE --> WEATHER
    CORE --> PORTS
    
    CORE --> KYC
    CORE --> FRAUD
```

---

*These diagrams provide visual reference for the technical architecture described in ARCHITECTURE_DEFENSIBLE_FEATURES.md*
