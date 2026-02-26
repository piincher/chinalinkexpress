# ChinaLink Express - Real-Time Features Design Document

## Executive Summary

This document outlines the design for 7 cutting-edge real-time features that will transform ChinaLink Express from a static logistics website into an immersive, app-like experience. These features leverage WebSockets, Server-Sent Events (SSE), and modern React patterns to provide unprecedented transparency and engagement.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Feature 1: Live Shipment Map](#2-feature-1-live-shipment-map)
3. [Feature 2: Live Pricing Ticker](#3-feature-2-live-pricing-ticker)
4. [Feature 3: Active Shipment Count-Up](#4-feature-3-active-shipment-count-up)
5. [Feature 4: Interactive Shipping Schedule](#5-feature-4-interactive-shipping-schedule)
6. [Feature 5: Live Chat + Co-browsing](#6-feature-5-live-chat--co-browsing)
7. [Feature 6: Dynamic Testimonials](#7-feature-6-dynamic-testimonials)
8. [Feature 7: Currency Exchange Monitor](#8-feature-7-currency-exchange-monitor)
9. [Implementation Roadmap](#9-implementation-roadmap)

---

## 1. Architecture Overview

### 1.1 Real-Time Communication Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         REAL-TIME ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌──────────────────────────────────────────────────┐   │
│  │   Client    │    │              Next.js 15 Application              │   │
│  │  (Browser)  │◄──►│  ┌─────────────┐  ┌─────────────┐  ┌─────────┐  │   │
│  └─────────────┘    │  │   Route     │  │   Route     │  │  Route  │  │   │
│         ▲           │  │  Handler    │  │  Handler    │  │ Handler │  │   │
│         │           │  │  (WebSocket)│  │   (SSE)     │  │  (API)  │  │   │
│         │           │  └──────┬──────┘  └──────┬──────┘  └────┬────┘  │   │
│    WebSocket/SSE    │         │                │              │       │   │
│         │           │         └────────────────┼──────────────┘       │   │
│         │           │                          │                      │   │
│         ▼           │                   ┌──────┴──────┐               │   │
│  ┌─────────────┐    │                   │  Real-Time  │               │   │
│  │  Upstash    │    │                   │   Service   │               │   │
│  │   Redis     │◄───┼───────────────────│   Layer     │               │   │
│  │  (Pub/Sub)  │    │                   │             │               │   │
│  └─────────────┘    │                   └──────┬──────┘               │   │
│         ▲           │                          │                      │   │
│         │           │         ┌────────────────┼──────────────┐       │   │
│    Pub/Sub          │         │                │              │       │   │
│         │           │    ┌────┴────┐     ┌─────┴─────┐   ┌────┴───┐  │   │
│         ▼           │    │Pricing  │     │Shipment   │   │Currency│  │   │
│  ┌─────────────┐    │    │Service   │     │Tracking   │   │Service │  │   │
│  │  External   │    │    │          │     │API        │   │        │  │   │
│  │    APIs     │────┼───►│ (Redis)  │     │(Real-time)│   │(Cache) │  │   │
│  │             │    │    └──────────┘     └───────────┘   └────────┘  │   │
│  └─────────────┘    │                                                  │   │
│                     └──────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Real-Time Backend | Next.js Route Handlers + PartyKit | WebSocket/SSE connections |
| Pub/Sub | Upstash Redis | Cross-instance state sync |
| State Management | Zustand + Immer | Client-side state |
| Maps | Mapbox GL JS | Interactive shipment visualization |
| Charts | Recharts / Tremor | Historical data visualization |
| Animation | Framer Motion | Smooth UI transitions |
| Service Worker | Workbox | Offline support |

---

## 2. Feature 1: Live Shipment Map

### 2.1 Overview

A real-time interactive map displaying all active shipments across the China-Africa logistics network, with clustering, weather overlays, and detailed shipment information on demand.

### 2.2 User Experience

```
┌─────────────────────────────────────────────────────────────────────┐
│  🗺️ CARTE DES EXPÉDITIONS EN DIRECT                                 │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │    ● Shanghai                    ● Beijing                  │   │
│  │      ◯ 12 actifs                                            │   │
│  │                                                             │   │
│  │         ╭─────╮                                             │   │
│  │    ─────│ ●32 │─────►                                       │   │
│  │         ╰─────╯            ◯ 8 actifs                       │   │
│  │    ● Shenzhen ─────────────► ● Lagos                        │   │
│  │         ╭─────╮                                             │   │
│  │    ─────│ ●18 │─────►                                       │   │
│  │         ╰─────╯                                             │   │
│  │    ● Guangzhou ───────────► ● Bamako ◄─── Vous êtes ici    │   │
│  │                                                             │   │
│  │    ╔═══════════════════════════════════════════════════╗   │   │
│  │    ║ ⚡ Tempête en cours sur l'océan Indien            ║   │   │
│  │    ║ Retards prévus de 24-48h sur les routes maritimes ║   │   │
│  │    ╚═══════════════════════════════════════════════════╝   │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  [🌦️ Météo] [✈️ Aérien] [🚢 Maritime] [📊 Statistiques]           │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.3 Technical Architecture

```typescript
// src/features/shipment-map/types.ts

interface ShipmentMarker {
  id: string;
  trackingNumber: string;
  type: 'air' | 'sea' | 'cluster';
  position: {
    lat: number;
    lng: number;
  };
  origin: string;
  destination: string;
  progress: number; // 0-100
  status: ShipmentStatus;
  eta: string;
  weatherImpact?: 'none' | 'minor' | 'major';
  customer?: {
    name: string;
    avatar?: string;
  };
}

interface MapCluster {
  id: string;
  position: { lat: number; lng: number };
  count: number;
  shipments: string[]; // IDs
  zoomLevel: number;
}

interface WeatherOverlay {
  type: 'storm' | 'clear' | 'fog' | 'wind';
  severity: 1 | 2 | 3;
  affectedRoutes: string[];
  expiresAt: string;
  polygon: GeoJSON.Polygon;
}

interface MapViewport {
  center: { lat: number; lng: number };
  zoom: number;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}
```

### 2.4 Real-Time Architecture

```typescript
// src/features/shipment-map/hooks/useShipmentMap.ts

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useShipmentMapStore } from '../store/useShipmentMapStore';
import type { ShipmentMarker, MapViewport } from '../types';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://api.chinalinkexpress.com/ws';

export function useShipmentMap() {
  const [isConnected, setIsConnected] = useState(false);
  const [viewport, setViewport] = useState<MapViewport>(DEFAULT_VIEWPORT);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const markers = useShipmentMapStore((state) => state.markers);
  const clusters = useShipmentMapStore((state) => state.clusters);
  const weatherOverlays = useShipmentMapStore((state) => state.weatherOverlays);
  const updateMarker = useShipmentMapStore((state) => state.updateMarker);
  const setMarkers = useShipmentMapStore((state) => state.setMarkers);

  // WebSocket connection with automatic reconnection
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(`${WS_URL}/shipments/map`);
    
    ws.onopen = () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
      
      // Subscribe to viewport-specific updates
      ws.send(JSON.stringify({
        type: 'subscribe',
        viewport: {
          bounds: viewport.bounds,
          zoom: viewport.zoom,
        },
      }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      switch (message.type) {
        case 'marker_update':
          updateMarker(message.payload);
          break;
        case 'viewport_update':
          setMarkers(message.payload.markers);
          break;
        case 'weather_alert':
          handleWeatherAlert(message.payload);
          break;
        case 'cluster_update':
          updateClusters(message.payload);
          break;
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      
      // Attempt reconnection with exponential backoff
      if (reconnectAttempts.current < maxReconnectAttempts) {
        const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
        setTimeout(() => {
          reconnectAttempts.current++;
          connect();
        }, delay);
      }
    };

    wsRef.current = ws;
  }, [viewport, updateMarker, setMarkers]);

  // Update viewport and request new data
  const updateViewport = useCallback((newViewport: MapViewport) => {
    setViewport(newViewport);
    
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'viewport_change',
        viewport: {
          bounds: newViewport.bounds,
          zoom: newViewport.zoom,
        },
      }));
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  return {
    markers,
    clusters,
    weatherOverlays,
    isConnected,
    viewport,
    updateViewport,
    connect,
  };
}
```

### 2.5 Backend Implementation (Next.js Route Handler)

```typescript
// src/app/api/ws/shipments/map/route.ts

import { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Upgrade HTTP to WebSocket
export async function GET(req: NextRequest) {
  const { socket, response } = Deno.upgradeWebSocket(req);
  
  const clientId = crypto.randomUUID();
  let currentViewport: MapViewport | null = null;

  socket.onopen = async () => {
    // Subscribe to Redis pub/sub for this viewport
    await redis.publish('map:connections', JSON.stringify({
      clientId,
      action: 'connected',
    }));
  };

  socket.onmessage = async (event) => {
    const message = JSON.parse(event.data);
    
    switch (message.type) {
      case 'subscribe':
        currentViewport = message.viewport;
        // Send initial data for this viewport
        const initialData = await getShipmentsInViewport(currentViewport);
        socket.send(JSON.stringify({
          type: 'viewport_update',
          payload: initialData,
        }));
        break;
        
      case 'viewport_change':
        currentViewport = message.viewport;
        const updatedData = await getShipmentsInViewport(currentViewport);
        socket.send(JSON.stringify({
          type: 'viewport_update',
          payload: updatedData,
        }));
        break;
    }
  };

  socket.onclose = async () => {
    await redis.publish('map:connections', JSON.stringify({
      clientId,
      action: 'disconnected',
    }));
  };

  return response;
}

// Get shipments based on viewport (with clustering for performance)
async function getShipmentsInViewport(viewport: MapViewport) {
  const { bounds, zoom } = viewport;
  
  // Use Redis geospatial queries
  const shipments = await redis.georadius(
    'shipments:positions',
    bounds.west,
    bounds.south,
    bounds.east,
    bounds.north,
    'WITHCOORD',
    'WITHDIST'
  );

  // Apply clustering based on zoom level
  if (zoom < 6) {
    return clusterShipments(shipments, zoom);
  }

  return { markers: shipments, clusters: [] };
}
```

### 2.6 Component Implementation

```typescript
// src/features/shipment-map/components/ShipmentMap.tsx

'use client';

import { useRef, useCallback } from 'react';
import Map, { Marker, Source, Layer, Popup } from 'react-map-gl';
import { motion, AnimatePresence } from 'framer-motion';
import { useShipmentMap } from '../hooks/useShipmentMap';
import { ShipmentMarker } from './ShipmentMarker';
import { WeatherOverlay } from './WeatherOverlay';
import { MapControls } from './MapControls';
import type { MapViewport } from '../types';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function ShipmentMap() {
  const mapRef = useRef<MapRef>(null);
  const { markers, clusters, weatherOverlays, isConnected, updateViewport } = useShipmentMap();
  const [selectedMarker, setSelectedMarker] = useState<ShipmentMarker | null>(null);
  const [showWeather, setShowWeather] = useState(true);

  const handleViewportChange = useCallback((evt: ViewState) => {
    const bounds = mapRef.current?.getBounds();
    if (bounds) {
      updateViewport({
        center: { lat: evt.latitude, lng: evt.longitude },
        zoom: evt.zoom,
        bounds: {
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        },
      });
    }
  }, [updateViewport]);

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
      {/* Connection Status */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
        <div className={cn(
          'w-2 h-2 rounded-full',
          isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        )} />
        <span className="text-xs font-medium">
          {isConnected ? 'En direct' : 'Reconnexion...'}
        </span>
      </div>

      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 50,
          latitude: 20,
          zoom: 3,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onMove={handleViewportChange}
      >
        {/* Weather Overlay */}
        <AnimatePresence>
          {showWeather && weatherOverlays.map((overlay) => (
            <WeatherOverlay key={overlay.id} overlay={overlay} />
          ))}
        </AnimatePresence>

        {/* Cluster Markers */}
        {clusters.map((cluster) => (
          <Marker
            key={cluster.id}
            longitude={cluster.position.lng}
            latitude={cluster.position.lat}
          >
            <ClusterMarker count={cluster.count} onClick={() => zoomToCluster(cluster)} />
          </Marker>
        ))}

        {/* Individual Shipment Markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.position.lng}
            latitude={marker.position.lat}
          >
            <ShipmentMarker
              marker={marker}
              isSelected={selectedMarker?.id === marker.id}
              onClick={() => setSelectedMarker(marker)}
            />
          </Marker>
        ))}

        {/* Selected Marker Popup */}
        <AnimatePresence>
          {selectedMarker && (
            <Popup
              longitude={selectedMarker.position.lng}
              latitude={selectedMarker.position.lat}
              anchor="bottom"
              onClose={() => setSelectedMarker(null)}
              closeButton={false}
              className="shipment-popup"
            >
              <ShipmentDetails shipment={selectedMarker} />
            </Popup>
          )}
        </AnimatePresence>
      </Map>

      {/* Map Controls */}
      <MapControls
        showWeather={showWeather}
        onToggleWeather={() => setShowWeather(!showWeather)}
        onZoomIn={() => mapRef.current?.zoomIn()}
        onZoomOut={() => mapRef.current?.zoomOut()}
      />
    </div>
  );
}
```

### 2.7 Why Competitors Don't Have This

| Aspect | ChinaLink Express | Competitors |
|--------|-------------------|-------------|
| Real-time Updates | WebSocket live positions | Static, daily updates |
| Weather Integration | Live weather impact alerts | No weather data |
| Customer View | Customers see their shipment on map | Tracking number only |
| Clustering | Smart clustering (10k+ shipments) | Map crashes with 100+ pins |
| Interactive | Click for details, ETA countdown | Non-interactive images |

### 2.8 Performance Considerations

1. **Viewport-based Loading**: Only load visible shipments
2. **Clustering Algorithm**: Douglas-Peucker for route simplification, Supercluster for markers
3. **WebGL Rendering**: Use Mapbox's GPU-accelerated rendering
4. **Delta Updates**: Only send changed marker positions (not full state)
5. **Connection Pooling**: Reuse WebSocket connections across tabs (SharedWorker)

### 2.9 Offline/Low Connectivity Fallback

```typescript
// Service Worker caching strategy
// src/lib/pwa/shipment-map-sw.ts

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/shipments/map')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Return cached data immediately, then update in background
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            caches.open('shipment-map-v1').then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
            return networkResponse;
          })
          .catch(() => response); // Fallback to cache on error

        return response || fetchPromise;
      })
    );
  }
});

// Fallback UI when offline
function OfflineMapFallback() {
  return (
    <div className="relative w-full h-[600px] bg-slate-900 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <WifiOff className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <h3 className="text-white font-semibold mb-2">Mode hors ligne</h3>
        <p className="text-slate-400 text-sm mb-4">
          Dernière mise à jour: {formatTime(lastUpdateTime)}
        </p>
        <Button onClick={retryConnection} variant="outline">
          Réessayer
        </Button>
      </div>
    </div>
  );
}
```

---

## 3. Feature 2: Live Pricing Ticker

### 3.1 Overview

A stock market-style ticker displaying real-time freight rates, exchange rates, and trend indicators with the ability to lock in rates instantly.

### 3.2 User Experience

```
┌─────────────────────────────────────────────────────────────────────┐
│  💰 TAUX EN DIRECT                    [Verrouiller ce taux ▼]      │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  ╔═══════╗  Fret Aérien    85,000 XOF/kg    ▲ +2.3%    [📈] │   │
│  │  ║ ✈️    ║  Trend: 7j ↑                           Trending  │   │
│  │  ╚═══════╝                                                  │   │
│  │       M-6      M-5      M-4      M-3      M-2      Hier      │   │
│  │  ───┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────►    │   │
│  │     │    │    │    │   ████  ████  █████ █████ ██████       │   │
│  │     │    │    │   ████ │    │    │    │    │    │          │   │
│  │    82K   83K  84K  85K 86K  87K  88K  89K  90K              │   │
│  │                                                             │   │
│  │  ╔═══════╗  Fret Maritime   45,000 XOF/m³   ▼ -1.2%   [📉] │   │
│  │  ║ 🚢    ║  Trend: 7j ↓                           Stable    │   │
│  │  ╚═══════╝                                                  │   │
│  │                                                             │   │
│  │  ╔═══════╗  USD/XOF       605.50          ─ 0.0%      [➡️] │   │
│  │  ║ 💱    ║  Favorable pour l'import!              Lock ⏰   │   │
│  │  ╚═══════╝                                                  │   │
│  │                                                             │   │
│  │  ╔═══════╗  CNY/XOF       83.75           ▲ +0.8%     [📈] │   │
│  │  ║ 🇨🇳   ║  Yuan en hausse                              5m  │   │
│  │  ╚═══════╝                                                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  💡 Alertes: [Alerte quand USD < 600] [+ Créer une alerte]         │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.3 Technical Architecture

```typescript
// src/features/pricing-ticker/types.ts

interface FreightRate {
  id: string;
  service: 'air' | 'sea' | 'express';
  origin: string;
  destination: string;
  rate: number;
  currency: string;
  unit: 'kg' | 'm3' | 'cbm';
  change: {
    value: number;
    percentage: number;
    direction: 'up' | 'down' | 'stable';
  };
  history: RateHistoryPoint[];
  validUntil: string;
  isLocked: boolean;
  lockedAt?: string;
  lockedBy?: string;
}

interface ExchangeRate {
  pair: string; // "USD/XOF", "CNY/XOF"
  rate: number;
  inverseRate: number;
  change: {
    value: number;
    percentage: number;
    direction: 'up' | 'down' | 'stable';
  };
  history: RateHistoryPoint[];
  isFavorable: boolean;
  recommendation?: string;
}

interface RateHistoryPoint {
  timestamp: string;
  rate: number;
  volume?: number;
}

interface RateAlert {
  id: string;
  type: 'freight' | 'exchange';
  condition: 'above' | 'below' | 'change_percent';
  threshold: number;
  isActive: boolean;
  notifiedAt?: string;
}
```

### 3.4 Real-Time Implementation (SSE)

```typescript
// src/features/pricing-ticker/hooks/useLivePricing.ts

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePricingTickerStore } from '../store/usePricingTickerStore';
import type { FreightRate, ExchangeRate } from '../types';

const SSE_URL = process.env.NEXT_PUBLIC_SSE_URL || '/api/sse/pricing';

export function useLivePricing() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const freightRates = usePricingTickerStore((state) => state.freightRates);
  const exchangeRates = usePricingTickerStore((state) => state.exchangeRates);
  const updateFreightRate = usePricingTickerStore((state) => state.updateFreightRate);
  const updateExchangeRate = usePricingTickerStore((state) => state.updateExchangeRate);
  const setHistoricalData = usePricingTickerStore((state) => state.setHistoricalData);

  const connect = useCallback(() => {
    if (eventSourceRef.current?.readyState === EventSource.OPEN) return;

    const es = new EventSource(SSE_URL);
    eventSourceRef.current = es;

    es.onopen = () => {
      setIsConnected(true);
    };

    // Handle freight rate updates
    es.addEventListener('freight-update', (event) => {
      const data: FreightRate = JSON.parse(event.data);
      updateFreightRate(data);
      setLastUpdate(new Date());
      
      // Show toast notification for significant changes
      if (Math.abs(data.change.percentage) > 5) {
        showRateAlert(data);
      }
    });

    // Handle exchange rate updates
    es.addEventListener('exchange-update', (event) => {
      const data: ExchangeRate = JSON.parse(event.data);
      updateExchangeRate(data);
      setLastUpdate(new Date());
    });

    // Handle historical data batch
    es.addEventListener('historical-data', (event) => {
      const data = JSON.parse(event.data);
      setHistoricalData(data);
    });

    es.onerror = () => {
      setIsConnected(false);
      es.close();
      
      // Reconnect with exponential backoff
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, 5000);
    };
  }, [updateFreightRate, updateExchangeRate, setHistoricalData]);

  // Lock a rate for customer
  const lockRate = useCallback(async (rateId: string, duration: number) => {
    const response = await fetch('/api/pricing/lock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rateId, duration }),
    });
    
    if (!response.ok) throw new Error('Failed to lock rate');
    
    return response.json();
  }, []);

  // Subscribe to alerts
  const subscribeToAlert = useCallback(async (alert: Omit<RateAlert, 'id'>) => {
    const response = await fetch('/api/pricing/alerts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert),
    });
    
    return response.json();
  }, []);

  useEffect(() => {
    connect();
    
    return () => {
      eventSourceRef.current?.close();
      clearTimeout(reconnectTimeoutRef.current);
    };
  }, [connect]);

  return {
    freightRates,
    exchangeRates,
    isConnected,
    lastUpdate,
    lockRate,
    subscribeToAlert,
  };
}
```

### 3.5 Backend (SSE Implementation)

```typescript
// src/app/api/sse/pricing/route.ts

import { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Send headers for SSE
      controller.enqueue(encoder.encode('event: connected\ndata: {}\n\n'));

      // Subscribe to Redis channels
      const freightSubscriber = redis.subscribe('pricing:freight');
      const exchangeSubscriber = redis.subscribe('pricing:exchange');

      // Handle freight rate updates
      freightSubscriber.onMessage(async (message) => {
        const data = JSON.parse(message);
        controller.enqueue(encoder.encode(
          `event: freight-update\ndata: ${JSON.stringify(data)}\n\n`
        ));
      });

      // Handle exchange rate updates
      exchangeSubscriber.onMessage(async (message) => {
        const data = JSON.parse(message);
        controller.enqueue(encoder.encode(
          `event: exchange-update\ndata: ${JSON.stringify(data)}\n\n`
        ));
      });

      // Send heartbeat every 30 seconds
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode('event: heartbeat\ndata: {}\n\n'));
      }, 30000);

      // Cleanup on close
      req.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
        freightSubscriber.unsubscribe();
        exchangeSubscriber.unsubscribe();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

### 3.6 Rate Locking System

```typescript
// src/features/pricing-ticker/components/RateLockModal.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Clock, CheckCircle } from 'lucide-react';
import { useLivePricing } from '../hooks/useLivePricing';
import type { FreightRate } from '../types';

interface RateLockModalProps {
  rate: FreightRate;
  isOpen: boolean;
  onClose: () => void;
}

const LOCK_DURATIONS = [
  { value: 1, label: '1 heure', price: 0 },
  { value: 24, label: '24 heures', price: 5000 },
  { value: 72, label: '3 jours', price: 10000 },
  { value: 168, label: '7 jours', price: 15000 },
];

export function RateLockModal({ rate, isOpen, onClose }: RateLockModalProps) {
  const [selectedDuration, setSelectedDuration] = useState(24);
  const [isLocking, setIsLocking] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { lockRate } = useLivePricing();

  const handleLock = async () => {
    setIsLocking(true);
    try {
      await lockRate(rate.id, selectedDuration);
      setIsLocked(true);
      
      // Send notification
      await fetch('/api/notifications/send', {
        method: 'POST',
        body: JSON.stringify({
          type: 'rate_locked',
          rateId: rate.id,
          duration: selectedDuration,
          rate: rate.rate,
        }),
      });
    } finally {
      setIsLocking(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {!isLocked ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Verrouiller le taux</h3>
                    <p className="text-gray-500 text-sm">
                      {rate.service === 'air' ? 'Fret Aérien' : 'Fret Maritime'}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600">
                    {rate.rate.toLocaleString()} {rate.currency}
                  </div>
                  <div className="text-sm text-gray-500">par {rate.unit}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">Durée de verrouillage</label>
                  {LOCK_DURATIONS.map((duration) => (
                    <button
                      key={duration.value}
                      onClick={() => setSelectedDuration(duration.value)}
                      className={cn(
                        'w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all',
                        selectedDuration === duration.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-slate-700 hover:border-gray-300'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">{duration.label}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {duration.price > 0 ? `+${duration.price.toLocaleString()} XOF` : 'Gratuit'}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={onClose} className="flex-1">
                    Annuler
                  </Button>
                  <Button 
                    onClick={handleLock} 
                    isLoading={isLocking}
                    className="flex-1"
                  >
                    Verrouiller
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Taux verrouillé!</h3>
                <p className="text-gray-500 mb-6">
                  Votre taux est garanti pour les prochaines {selectedDuration} heures.
                </p>
                <Button onClick={onClose} className="w-full">
                  Continuer
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### 3.7 Why Competitors Don't Have This

| Feature | ChinaLink Express | Competitors |
|---------|-------------------|-------------|
| Real-time Rates | Live SSE updates | Static PDF price lists |
| Rate Locking | Instant lock with duration | Email requests, 24h delay |
| Historical Trends | 6-month charts | No historical data |
| Exchange Integration | Live FCFA/CNY/USD rates | Manual calculations |
| Alerts | Customizable price alerts | No alert system |

### 3.8 Fallback Strategy

```typescript
// Cached rate display when offline
function CachedRateDisplay({ rate }: { rate: FreightRate }) {
  const isStale = Date.now() - new Date(rate.lastUpdated).getTime() > 3600000; // 1 hour

  return (
    <div className={cn(
      'p-4 rounded-xl border-2',
      isStale ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'
    )}>
      <div className="flex items-center gap-2 mb-2">
        {isStale ? (
          <>
            <WifiOff className="w-4 h-4 text-amber-600" />
            <span className="text-amber-600 text-sm font-medium">
              Mode hors ligne - données de {formatTime(rate.lastUpdated)}
            </span>
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-600 text-sm font-medium">À jour</span>
          </>
        )}
      </div>
      <div className="text-2xl font-bold">{rate.rate.toLocaleString()} {rate.currency}</div>
    </div>
  );
}
```

---

## 4. Feature 3: Active Shipment Count-Up

### 4.1 Overview

Animated statistics dashboard showing real-time counters for packages delivered, weight shipped, and customer satisfaction scores with beautiful animations and social proof.

### 4.2 User Experience

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│        🌍 ENSEMBLE, NOUS CONSTRUISONS L'AFRIQUE                     │
│                                                                     │
│     ┌─────────────┐    ┌─────────────┐    ┌─────────────┐          │
│     │   12,847    │    │  2,456,789  │    │    98.7%    │          │
│     │   ═══════   │    │   ═══════   │    │   ═══════   │          │
│     │   Colis     │    │     kg      │    │ Satisfaction│          │
│     │  aujourd'hui│    │ ce mois     │    │    client   │          │
│     │  ↑ +234     │    │  ↑ +12,456  │    │   ★★★★★     │          │
│     └─────────────┘    └─────────────┘    └─────────────┘          │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  🔔 Activité récente:                                       │   │
│  │  ─────────────────────────────────────────────────────────  │   │
│  │  ┌─► ✅ Colis #CLE-8392 livré à Bamako (il y a 2 min)      │   │
│  │  ├─► 📦 Nouvelle expédition: Shenzhen → Lagos (il y a 5 min)│   │
│  │  ├─► ⭐ Nouvel avis 5 étoiles de Amadou K. (il y a 8 min)   │   │
│  │  └─► ✈️ Vol CLE-1847 décollé de Shanghai (il y a 12 min)    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│        "12,847 familles africaines ont reçu leurs produits         │
│                    aujourd'hui"                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.3 Technical Architecture

```typescript
// src/features/social-proof-dashboard/types.ts

interface DashboardMetrics {
  packagesToday: {
    current: number;
    target: number;
    change: number; // vs yesterday
  };
  weightThisMonth: {
    current: number;
    unit: 'kg' | 'tons';
    change: number;
  };
  satisfactionScore: {
    current: number; // 0-100
    totalReviews: number;
    change: number;
  };
  activeCustomers: {
    current: number;
    peakToday: number;
  };
}

interface ActivityEvent {
  id: string;
  type: 'delivered' | 'shipped' | 'review' | 'flight_departed' | 'flight_arrived';
  message: string;
  location: string;
  timestamp: string;
  metadata?: {
    trackingNumber?: string;
    customerName?: string;
    rating?: number;
    flightNumber?: string;
  };
}

interface CounterAnimation {
  startValue: number;
  endValue: number;
  duration: number;
  easing: 'linear' | 'easeOut' | 'spring';
}
```

### 4.4 Implementation

```typescript
// src/features/social-proof-dashboard/hooks/useAnimatedCounter.ts

'use client';

import { useState, useEffect, useRef } from 'react';
import { useSpring, useTransform, useMotionValue } from 'framer-motion';

interface UseAnimatedCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
}

export function useAnimatedCounter({
  start = 0,
  end,
  duration = 2,
  delay = 0,
  decimals = 0,
}: UseAnimatedCounterOptions) {
  const [displayValue, setDisplayValue] = useState(start);
  const motionValue = useMotionValue(start);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      motionValue.set(end);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [motionValue, end, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Number(latest.toFixed(decimals)));
    });

    return unsubscribe;
  }, [springValue, decimals]);

  return displayValue;
}
```

```typescript
// src/features/social-proof-dashboard/components/MetricsDashboard.tsx

'use client';

import { motion } from 'framer-motion';
import { Package, Weight, Star, Users } from 'lucide-react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { useLiveMetrics } from '../hooks/useLiveMetrics';
import { ActivityTicker } from './ActivityTicker';
import type { DashboardMetrics } from '../types';

interface MetricCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  change: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  delay?: number;
}

function MetricCard({
  icon,
  value,
  label,
  change,
  suffix = '',
  prefix = '',
  decimals = 0,
  delay = 0,
}: MetricCardProps) {
  const animatedValue = useAnimatedCounter({
    end: value,
    duration: 2.5,
    delay,
    decimals,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          {icon}
        </div>
        <div className={cn(
          'flex items-center gap-1 text-sm font-medium',
          change >= 0 ? 'text-green-600' : 'text-red-600'
        )}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      </div>
      
      <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
        {prefix}{animatedValue.toLocaleString()}{suffix}
      </div>
      
      <div className="text-gray-500 dark:text-gray-400 text-sm">
        {label}
      </div>

      {/* Animated progress bar */}
      <motion.div
        className="mt-4 h-1 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.5 }}
      >
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((animatedValue / value) * 100, 100)}%` }}
          transition={{ duration: 2.5, delay, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

export function MetricsDashboard() {
  const { metrics, activityEvents, isLive } = useLiveMetrics();

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium mb-4"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            En direct
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ensemble, nous construisons l'Afrique
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Chaque colis que nous livrons contribue au développement du commerce africain
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            icon={<Package className="w-6 h-6 text-blue-600" />}
            value={metrics.packagesToday.current}
            label="Colis aujourd'hui"
            change={metrics.packagesToday.change}
            delay={0}
          />
          <MetricCard
            icon={<Weight className="w-6 h-6 text-blue-600" />}
            value={metrics.weightThisMonth.current}
            label="kg ce mois"
            change={metrics.weightThisMonth.change}
            delay={0.1}
          />
          <MetricCard
            icon={<Star className="w-6 h-6 text-blue-600" />}
            value={metrics.satisfactionScore.current}
            label="Satisfaction client"
            change={metrics.satisfactionScore.change}
            suffix="%"
            decimals={1}
            delay={0.2}
          />
          <MetricCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            value={metrics.activeCustomers.current}
            label="Clients actifs"
            change={0}
            delay={0.3}
          />
        </div>

        {/* Activity Ticker */}
        <ActivityTicker events={activityEvents} />
      </div>
    </section>
  );
}
```

### 4.5 Real-Time Data Simulation

```typescript
// src/features/social-proof-dashboard/hooks/useLiveMetrics.ts

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSocialProofStore } from '../store/useSocialProofStore';
import type { DashboardMetrics, ActivityEvent } from '../types';

const ACTIVITY_MESSAGES = {
  delivered: [
    'Colis livré à {location}',
    'Livraison confirmée à {location}',
    'Client satisfait à {location}',
  ],
  shipped: [
    'Nouvelle expédition: {origin} → {destination}',
    'Colis en route vers {destination}',
    'Expédition démarrée depuis {origin}',
  ],
  review: [
    'Nouvel avis {rating}★ de {customer}',
    '{customer} a noté son expérience {rating}★',
    'Avis client: "{snippet}"',
  ],
  flight_departed: [
    'Vol {flight} décollé de {origin}',
    'Avion en route: {origin} → {destination}',
    'Départ confirmé: Vol {flight}',
  ],
  flight_arrived: [
    'Vol {flight} arrivé à {destination}',
    'Atterrissage confirmé: {destination}',
    'Cargaison arrivée à {destination}',
  ],
};

export function useLiveMetrics() {
  const [isLive, setIsLive] = useState(false);
  const [metrics, setMetrics] = useState<DashboardMetrics>(DEFAULT_METRICS);
  const [activityEvents, setActivityEvents] = useState<ActivityEvent[]>([]);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const wsRef = useRef<WebSocket | null>(null);

  // Simulate real-time metric updates
  const simulateMetricUpdate = useCallback(() => {
    setMetrics((prev) => ({
      packagesToday: {
        ...prev.packagesToday,
        current: prev.packagesToday.current + Math.floor(Math.random() * 3),
      },
      weightThisMonth: {
        ...prev.weightThisMonth,
        current: prev.weightThisMonth.current + Math.floor(Math.random() * 100),
      },
      // ... other metrics
    }));
  }, []);

  // Generate random activity event
  const generateActivityEvent = useCallback((): ActivityEvent => {
    const types = Object.keys(ACTIVITY_MESSAGES) as ActivityEvent['type'][];
    const type = types[Math.floor(Math.random() * types.length)];
    const messages = ACTIVITY_MESSAGES[type];
    const message = messages[Math.floor(Math.random() * messages.length)];

    return {
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      message: formatMessage(message, type),
      location: getRandomLocation(),
      timestamp: new Date().toISOString(),
      metadata: generateMetadata(type),
    };
  }, []);

  useEffect(() => {
    // Connect to WebSocket for real updates
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL + '/metrics');
    wsRef.current = ws;

    ws.onopen = () => setIsLive(true);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'metrics_update') {
        setMetrics(data.payload);
      } else if (data.type === 'activity') {
        setActivityEvents((prev) => [data.payload, ...prev].slice(0, 50));
      }
    };

    ws.onclose = () => {
      setIsLive(false);
      // Fall back to simulation
      intervalRef.current = setInterval(() => {
        simulateMetricUpdate();
        if (Math.random() > 0.7) {
          setActivityEvents((prev) => [generateActivityEvent(), ...prev].slice(0, 50));
        }
      }, 5000);
    };

    return () => {
      ws.close();
      clearInterval(intervalRef.current);
    };
  }, [simulateMetricUpdate, generateActivityEvent]);

  return { metrics, activityEvents, isLive };
}
```

### 4.6 Why Competitors Don't Have This

| Feature | ChinaLink Express | Competitors |
|---------|-------------------|-------------|
| Live Counters | Animated, real-time updates | Static numbers (if any) |
| Activity Feed | Real shipment events | Fake/generic testimonials |
| Social Proof | Verified delivery events | No transparency |
| Impact Metrics | Weight, packages, satisfaction | No metrics shown |
| Gamification | "Today's deliveries" counter | No engagement |

---

## 5. Feature 4: Interactive Shipping Schedule

### 5.1 Overview

A calendar-based booking system showing upcoming departures with real-time capacity indicators, allowing customers to book cargo space directly.

### 5.2 User Experience

```
┌─────────────────────────────────────────────────────────────────────┐
│  📅 CALENDRIER DES DÉPARTS                                          │
│                                                                     │
│  [◀ Mois précédent]      Février 2026        [Mois suivant ▶]      │
│                                                                     │
│  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐                       │
│  │ Lun │ Mar │ Mer │ Jeu │ Ven │ Sam │ Dim │                       │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                       │
│  │     │     │     │     │     │  1  │  2  │                       │
│  │     │     │     │     │     │     │     │                       │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                       │
│  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │                       │
│  │     │ ✈️  │     │ 🚢  │     │ ✈️  │     │                       │
│  │     │ 80% │     │ 65% │     │ 45% │     │                       │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                       │
│  │ 10  │ 11  │  12 │ 13  │ 14  │ 15  │ 16  │                       │
│  │     │ 🚢  │ ✈️  │     │ ✈️🚢 │     │     │                       │
│  │     │ 90% │ 30% │     │ 🔥   │     │     │                       │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                       │
│  │ ... │     │     │     │     │     │     │                       │
│  └─────┴─────┴─────┴─────┴─────┴─────┴─────┘                       │
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗ │
│  ║ 📆 Mardi 4 Février                                             ║ │
│  ║ ═════════════════════════════════════════════════════════════ ║ │
│  ║ ✈️ Vol CLE-8472 - Shanghai → Bamako                           ║ │
│  ║    Départ: 14:00 | Arrivée: 18:00 (J+5)                       ║ │
│  ║    Capacité: ████████░░ 80% (Remplissage rapide!)             ║ │
│  ║    Tarif: 85,000 XOF/kg | Places restantes: 120kg            ║ │
│  ║    [──────── Réserver maintenant ────────]                   ║ │
│  ║                                                                ║ │
│  ║ 🚢 Navire CLE-MAR-12 - Shenzhen → Lagos                       ║ │
│  ║    Départ: 09:00 | Arrivée: 15 Mars (35 jours)                ║ │
│  ║    Capacité: ██████░░░░ 60% (Bon timing)                      ║ │
│  ║    Tarif: 45,000 XOF/m³ | Places restantes: 45m³             ║ │
│  ║    [──────── Réserver maintenant ────────]                   ║ │
│  ╚═══════════════════════════════════════════════════════════════╝ │
│                                                                     │
│  Légende: [✈️ Aérien] [🚢 Maritime] [🔥 Presque plein]             │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.3 Technical Architecture

```typescript
// src/features/shipping-schedule/types.ts

interface ScheduledDeparture {
  id: string;
  type: 'air' | 'sea';
  flightNumber?: string;
  vesselName?: string;
  route: {
    origin: string;
    destination: string;
    stops?: string[];
  };
  schedule: {
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    duration: string;
  };
  capacity: {
    total: number;
    booked: number;
    available: number;
    unit: 'kg' | 'm3' | 'containers';
    percentageBooked: number;
  };
  pricing: {
    baseRate: number;
    currency: string;
    unit: string;
    surgeMultiplier?: number; // Dynamic pricing
  };
  status: 'open' | 'filling' | 'almost_full' | 'full' | 'departed';
  cutoffTime: string; // Booking deadline
}

interface BookingRequest {
  departureId: string;
  customerId: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  goodsType: string;
  specialRequirements?: string[];
}

interface BookingConfirmation {
  bookingId: string;
  departure: ScheduledDeparture;
  totalPrice: number;
  paymentDue: string;
  confirmationDeadline: string;
}
```

### 5.4 Implementation

```typescript
// src/features/shipping-schedule/hooks/useSchedule.ts

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useScheduleStore } from '../store/useScheduleStore';
import type { ScheduledDeparture, BookingRequest } from '../types';

export function useSchedule(month: Date) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDeparture, setSelectedDeparture] = useState<ScheduledDeparture | null>(null);
  
  const departures = useScheduleStore((state) => state.departures);
  const setDepartures = useScheduleStore((state) => state.setDepartures);
  const updateDeparture = useScheduleStore((state) => state.updateDeparture);

  // Fetch schedule for month
  useEffect(() => {
    setIsLoading(true);
    
    fetch(`/api/schedule?month=${month.toISOString()}`)
      .then((res) => res.json())
      .then((data) => {
        setDepartures(data.departures);
        setIsLoading(false);
      });
  }, [month, setDepartures]);

  // Subscribe to real-time capacity updates
  useEffect(() => {
    const es = new EventSource(`/api/sse/schedule?month=${month.toISOString()}`);
    
    es.addEventListener('capacity-update', (event) => {
      const update = JSON.parse(event.data);
      updateDeparture(update.departureId, {
        capacity: update.capacity,
        status: update.status,
      });
    });

    return () => es.close();
  }, [month, updateDeparture]);

  // Book capacity
  const bookDeparture = useCallback(async (request: BookingRequest) => {
    const response = await fetch('/api/schedule/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Booking failed');
    }

    const confirmation: BookingConfirmation = await response.json();
    
    // Optimistically update local capacity
    updateDeparture(request.departureId, (departure) => ({
      capacity: {
        ...departure.capacity,
        booked: departure.capacity.booked + request.weight,
        available: departure.capacity.available - request.weight,
        percentageBooked: Math.round(
          ((departure.capacity.booked + request.weight) / departure.capacity.total) * 100
        ),
      },
    }));

    return confirmation;
  }, [updateDeparture]);

  // Get departures for a specific date
  const getDeparturesForDate = useCallback((date: Date) => {
    return departures.filter((d) => 
      new Date(d.schedule.departureDate).toDateString() === date.toDateString()
    );
  }, [departures]);

  return {
    departures,
    isLoading,
    selectedDate,
    setSelectedDate,
    selectedDeparture,
    setSelectedDeparture,
    getDeparturesForDate,
    bookDeparture,
  };
}
```

```typescript
// src/features/shipping-schedule/components/ScheduleCalendar.tsx

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plane, Ship, AlertCircle } from 'lucide-react';
import { useSchedule } from '../hooks/useSchedule';
import { DepartureDetails } from './DepartureDetails';
import { BookingModal } from './BookingModal';

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export function ScheduleCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { departures, isLoading, selectedDate, setSelectedDate, getDeparturesForDate } = useSchedule(currentMonth);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() || 7; // 1 = Monday

    const days: Array<{ date: number | null; departures: typeof departures }> = [];
    
    // Empty cells for days before month starts
    for (let i = 1; i < startingDay; i++) {
      days.push({ date: null, departures: [] });
    }
    
    // Days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = new Date(year, month, date);
      const dayDepartures = getDeparturesForDate(currentDate);
      days.push({ date, departures: dayDepartures });
    }
    
    return days;
  }, [currentMonth, getDeparturesForDate]);

  const getCapacityColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getStatusIcon = (departures: typeof calendarDays[0]['departures']) => {
    const hasAir = departures.some((d) => d.type === 'air');
    const hasSea = departures.some((d) => d.type === 'sea');
    const hasFull = departures.some((d) => d.capacity.percentageBooked >= 95);
    
    return (
      <div className="flex items-center justify-center gap-1 mt-1">
        {hasAir && <Plane className="w-3 h-3 text-blue-500" />}
        {hasSea && <Ship className="w-3 h-3 text-cyan-500" />}
        {hasFull && <AlertCircle className="w-3 h-3 text-red-500" />}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold">
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <motion.button
            key={index}
            whileHover={day.date ? { scale: 1.05 } : {}}
            whileTap={day.date ? { scale: 0.95 } : {}}
            onClick={() => day.date && setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date))}
            className={cn(
              'aspect-square p-2 rounded-lg transition-all relative',
              !day.date && 'invisible',
              day.date && 'hover:bg-gray-50 dark:hover:bg-slate-800',
              selectedDate?.getDate() === day.date && 
                selectedDate?.getMonth() === currentMonth.getMonth() &&
                'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500'
            )}
            disabled={!day.date}
          >
            {day.date && (
              <>
                <span className={cn(
                  'text-sm font-medium',
                  selectedDate?.getDate() === day.date ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'
                )}>
                  {day.date}
                </span>
                {day.departures.length > 0 && (
                  <>
                    {getStatusIcon(day.departures)}
                    {/* Capacity indicator dots */}
                    <div className="flex justify-center gap-0.5 mt-1">
                      {day.departures.slice(0, 3).map((d, i) => (
                        <div
                          key={i}
                          className={cn('w-1.5 h-1.5 rounded-full', getCapacityColor(d.capacity.percentageBooked))}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </motion.button>
        ))}
      </div>

      {/* Selected Date Details */}
      <AnimatePresence>
        {selectedDate && (
          <DepartureDetails
            date={selectedDate}
            departures={getDeparturesForDate(selectedDate)}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

### 5.5 Why Competitors Don't Have This

| Feature | ChinaLink Express | Competitors |
|---------|-------------------|-------------|
| Live Calendar | Interactive booking calendar | Static PDF schedules |
| Capacity Display | Real-time % filled | No visibility |
| Direct Booking | Book from calendar | Email/call only |
| Dynamic Pricing | Surge pricing based on demand | Fixed rates |
| Cutoff Alerts | "Book before X time" | No urgency creation |

---

## 6. Feature 5: Live Chat + Co-browsing

### 6.1 Overview

Real-time support chat with co-browsing capabilities allowing agents to see what customers are viewing, guide them through the website, and resolve issues faster.

### 6.2 User Experience

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ╔═══════════════════════════════════════════════════════════════╗ │
│  ║ 💬 Support en direct                                    [_][X] ║ │
│  ╠═══════════════════════════════════════════════════════════════╣ │
│  ║                                                                ║ │
│  ║  👤 Vous: Bonjour, je ne comprends pas les tarifs aériens     ║ │
│  ║                                                                ║ │
│  ║  👩‍💼 Fatou (Agent): Bonjour! Je vois que vous êtes sur la      ║ │
│  ║     page des tarifs. Laissez-moi vous guider...               ║ │
│  ║     [📍 Fatou regarde cette page avec vous]                   ║ │
│  ║                                                                ║ │
│  ║     ┌─────────────────────────────────────┐                   ║ │
│  ║     │  🖱️ Fatou pointe vers:             │                   ║ │
│  ║     │  "Fret Aérien - 85,000 XOF/kg"     │                   ║ │
│  ║     │           👆                        │                   ║ │
│  ║     └─────────────────────────────────────┘                   ║ │
│  ║                                                                ║ │
│  ║  👩‍💼 Fatou: Ce tarif inclut le transport de Shanghai à         ║ │
│  ║     Bamako, avec dédouanement inclus.                         ║ │
│  ║                                                                ║ │
│  ║  👤 Vous: D'accord, et combien de temps ça prend?             ║ │
│  ║                                                                ║ │
│  ║  👩‍💼 Fatou: 5-7 jours ouvrables. [Voir les détails ▶]          ║ │
│  ║                                                                ║ │
│  ║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ║ │
│  ║  [Partager mon écran 📺]  [📎]  [😊]  [🎤]                   ║ │
│  ║  ┌─────────────────────────────────────────────────────────┐  ║ │
│  ║  │ Écrivez votre message...                               │  ║ │
│  ║  └─────────────────────────────────────────────────────────┘  ║ │
│  ╚═══════════════════════════════════════════════════════════════╝ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.3 Technical Architecture

```typescript
// src/features/live-chat/types.ts

interface ChatSession {
  id: string;
  customerId: string;
  agentId?: string;
  status: 'waiting' | 'active' | 'ended';
  startedAt: string;
  endedAt?: string;
  metadata: {
    pageUrl: string;
    referrer?: string;
    userAgent: string;
    ip?: string;
    country?: string;
  };
}

interface ChatMessage {
  id: string;
  sessionId: string;
  sender: 'customer' | 'agent' | 'system';
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'location' | 'product' | 'link';
  timestamp: string;
  isRead: boolean;
  metadata?: {
    fileUrl?: string;
    fileName?: string;
    productId?: string;
    linkUrl?: string;
  };
}

interface CoBrowsingEvent {
  type: 'cursor_move' | 'scroll' | 'click' | 'highlight' | 'navigate';
  position?: { x: number; y: number };
  element?: string; // CSS selector
  url?: string;
  scrollPosition?: { x: number; y: number };
  timestamp: string;
}

interface AgentPresence {
  agentId: string;
  name: string;
  avatar: string;
  status: 'online' | 'busy' | 'away';
  currentChats: number;
  specialization: string[];
}
```

### 6.4 Implementation

```typescript
// src/features/live-chat/hooks/useLiveChat.ts

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useChatStore } from '../store/useChatStore';
import type { ChatSession, ChatMessage, CoBrowsingEvent } from '../types';

const WS_URL = process.env.NEXT_PUBLIC_CHAT_WS_URL || 'wss://chat.chinalinkexpress.com';

export function useLiveChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [agentIsTyping, setAgentIsTyping] = useState(false);
  const [coBrowsingActive, setCoBrowsingActive] = useState(false);
  
  const wsRef = useRef<WebSocket | null>(null);
  const sessionRef = useRef<ChatSession | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const updateMessage = useChatStore((state) => state.updateMessage);

  const connect = useCallback(async () => {
    // Create or retrieve session
    const session = await fetch('/api/chat/session', {
      method: 'POST',
      body: JSON.stringify({
        pageUrl: window.location.href,
        referrer: document.referrer,
      }),
    }).then((r) => r.json());
    
    sessionRef.current = session;

    const ws = new WebSocket(`${WS_URL}/chat?sessionId=${session.id}`);
    wsRef.current = ws;

    ws.onopen = () => setIsConnected(true);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'message':
          addMessage(data.payload);
          break;
        case 'typing':
          setAgentIsTyping(data.payload.isTyping);
          break;
        case 'cobrowsing_start':
          setCoBrowsingActive(true);
          showCoBrowsingNotification();
          break;
        case 'cobrowsing_end':
          setCoBrowsingActive(false);
          break;
        case 'agent_assigned':
          sessionRef.current!.agentId = data.payload.agentId;
          addMessage({
            id: `system-${Date.now()}`,
            sessionId: session.id,
            sender: 'system',
            senderName: 'Système',
            content: `${data.payload.agentName} a rejoint la conversation`,
            type: 'text',
            timestamp: new Date().toISOString(),
            isRead: true,
          });
          break;
      }
    };

    ws.onclose = () => setIsConnected(false);
  }, [addMessage]);

  const sendMessage = useCallback((content: string, type: ChatMessage['type'] = 'text') => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const message: Omit<ChatMessage, 'id'> = {
      sessionId: sessionRef.current!.id,
      sender: 'customer',
      senderName: 'Vous',
      content,
      type,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    wsRef.current.send(JSON.stringify({
      type: 'message',
      payload: message,
    }));

    addMessage({ ...message, id: `temp-${Date.now()}` });
  }, [addMessage]);

  const sendTypingIndicator = useCallback((typing: boolean) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    
    wsRef.current.send(JSON.stringify({
      type: 'typing',
      payload: { isTyping: typing },
    }));
  }, []);

  // Send typing indicator with debounce
  const handleTyping = useCallback(() => {
    if (!isTyping) {
      setIsTyping(true);
      sendTypingIndicator(true);
    }
    
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      sendTypingIndicator(false);
    }, 2000);
  }, [isTyping, sendTypingIndicator]);

  // Co-browsing: Send cursor position
  useEffect(() => {
    if (!coBrowsingActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      wsRef.current?.send(JSON.stringify({
        type: 'cobrowsing',
        payload: {
          type: 'cursor_move',
          position: { x: e.clientX, y: e.clientY },
          timestamp: new Date().toISOString(),
        },
      }));
    };

    const handleScroll = () => {
      wsRef.current?.send(JSON.stringify({
        type: 'cobrowsing',
        payload: {
          type: 'scroll',
          scrollPosition: { x: window.scrollX, y: window.scrollY },
          timestamp: new Date().toISOString(),
        },
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [coBrowsingActive]);

  useEffect(() => {
    connect();
    return () => wsRef.current?.close();
  }, [connect]);

  return {
    messages,
    isConnected,
    isTyping,
    agentIsTyping,
    coBrowsingActive,
    sendMessage,
    handleTyping,
  };
}
```

### 6.5 Co-Browsing Overlay Component

```typescript
// src/features/live-chat/components/CoBrowsingOverlay.tsx

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Eye, X } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

interface CoBrowsingOverlayProps {
  agentName: string;
  agentCursor: { x: number; y: number } | null;
  highlightedElement: string | null;
  onEndSession: () => void;
}

export function CoBrowsingOverlay({
  agentName,
  agentCursor,
  highlightedElement,
  onEndSession,
}: CoBrowsingOverlayProps) {
  return (
    <>
      {/* Status Bar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: -50 }}
        className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white py-2 px-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">
            {agentName} peut voir votre écran
          </span>
        </div>
        <button
          onClick={onEndSession}
          className="text-white/80 hover:text-white text-sm flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Arrêter le partage
        </button>
      </motion.div>

      {/* Agent Cursor */}
      <AnimatePresence>
        {agentCursor && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: agentCursor.x,
              y: agentCursor.y,
            }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed pointer-events-none z-50"
            style={{ left: 0, top: 0 }}
          >
            <MousePointer2 className="w-6 h-6 text-blue-500 fill-blue-500" />
            <span className="absolute left-4 top-4 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {agentName}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Highlighted Element */}
      <AnimatePresence>
        {highlightedElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none"
          >
            <div 
              className="absolute border-2 border-blue-500 rounded-lg animate-pulse"
              style={getElementPosition(highlightedElement)}
            >
              <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                {agentName} montre ceci
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### 6.6 Why Competitors Don't Have This

| Feature | ChinaLink Express | Competitors |
|---------|-------------------|-------------|
| Live Chat | Real-time with typing indicators | Contact forms, email |
| Co-browsing | Agent sees customer screen | No such feature |
| Agent Cursor | See where agent is pointing | N/A |
| Screen Sharing | Built into chat | External tools only |
| Context-Aware | Agent sees what page you're on | Start from scratch |

---

## 7. Feature 6: Dynamic Testimonials

### 7.1 Overview

A rotating carousel of verified customer reviews with filtering by industry, shipment type, and real-time "verified purchase" indicators.

### 7.2 User Experience

```
┌─────────────────────────────────────────────────────────────────────┐
│  💬 CE QUE NOS CLIENTS DISENT                                       │
│                                                                     │
│  Filtres: [Tous ▼] [Industrie ▼] [Type d'expédition ▼]             │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │    ┌─────┐                                                  │   │
│  │    │ 👤  │  Amadou K.                    ⭐⭐⭐⭐⭐           │   │
│  │    │     │  Bamako, Mali                  ✓ Vérifié        │   │
│  │    └─────┘  Importateur de textiles                        │   │
│  │                                                             │   │
│  │   "ChinaLink a révolutionné mon business. Les délais sont   │   │
│  │    respectés à 98% et le service client est exceptionnel.   │   │
│  │    Je recommande à tous les importateurs maliens!"          │   │
│  │                                                             │   │
│  │    📦 Expédition #CLE-8492 • Fret Aérien • 45kg           │   │
│  │    📅 Il y a 3 jours • Shanghai → Bamako                    │   │
│  │                                                             │   │
│  │    ┌─────────────────────────────────────────────────────┐  │   │
│  │    │ 📹 Voir la vidéo testimonial (2:34)              ▶  │  │   │
│  │    └─────────────────────────────────────────────────────┘  │   │
│  │                                                             │   │
│  │    ←  ● ○ ○ ○ ○  →                                         │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Statistiques en direct:                                            │
│  4.8/5 ⭐ moyenne | 1,247 avis vérifiés | 98% recommandent          │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.3 Implementation

```typescript
// src/features/dynamic-testimonials/types.ts

interface Testimonial {
  id: string;
  customerName: string;
  customerAvatar?: string;
  location: string;
  company?: string;
  industry: string;
  rating: number;
  content: string;
  videoUrl?: string;
  isVerified: boolean;
  shipmentDetails?: {
    trackingNumber: string;
    service: 'air' | 'sea' | 'express';
    weight: number;
    route: string;
    date: string;
  };
  metrics?: {
    shipmentsCount: number;
    memberSince: string;
  };
  helpful: number;
  timestamp: string;
}

interface TestimonialFilter {
  industry?: string;
  service?: 'air' | 'sea' | 'express';
  rating?: number;
  hasVideo?: boolean;
  verifiedOnly?: boolean;
}
```

```typescript
// src/features/dynamic-testimonials/hooks/useTestimonials.ts

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTestimonialsStore } from '../store/useTestimonialsStore';
import type { Testimonial, TestimonialFilter } from '../types';

const ROTATION_INTERVAL = 8000; // 8 seconds

export function useTestimonials(filter?: TestimonialFilter) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
  
  const testimonials = useTestimonialsStore((state) => state.testimonials);
  const addTestimonial = useTestimonialsStore((state) => state.addTestimonial);

  // Filter testimonials
  useEffect(() => {
    let filtered = [...testimonials];
    
    if (filter?.industry) {
      filtered = filtered.filter((t) => t.industry === filter.industry);
    }
    if (filter?.service) {
      filtered = filtered.filter((t) => t.shipmentDetails?.service === filter.service);
    }
    if (filter?.rating) {
      filtered = filtered.filter((t) => t.rating >= filter.rating!);
    }
    if (filter?.hasVideo) {
      filtered = filtered.filter((t) => !!t.videoUrl);
    }
    if (filter?.verifiedOnly) {
      filtered = filtered.filter((t) => t.isVerified);
    }
    
    setFilteredTestimonials(filtered);
  }, [testimonials, filter]);

  // Auto-rotation
  useEffect(() => {
    if (!isAutoPlaying || filteredTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredTestimonials.length]);

  // Subscribe to new testimonials via SSE
  useEffect(() => {
    const es = new EventSource('/api/sse/testimonials');
    
    es.addEventListener('new-testimonial', (event) => {
      const testimonial: Testimonial = JSON.parse(event.data);
      addTestimonial(testimonial);
      
      // Show notification for new 5-star reviews
      if (testimonial.rating === 5) {
        showNewReviewNotification(testimonial);
      }
    });

    return () => es.close();
  }, [addTestimonial]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 30 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 30000);
  }, []);

  const next = useCallback(() => {
    goTo((currentIndex + 1) % filteredTestimonials.length);
  }, [currentIndex, filteredTestimonials.length, goTo]);

  const previous = useCallback(() => {
    goTo((currentIndex - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  }, [currentIndex, filteredTestimonials.length, goTo]);

  return {
    currentTestimonial: filteredTestimonials[currentIndex],
    allTestimonials: filteredTestimonials,
    currentIndex,
    totalCount: filteredTestimonials.length,
    isAutoPlaying,
    goTo,
    next,
    previous,
    pause: () => setIsAutoPlaying(false),
    play: () => setIsAutoPlaying(true),
  };
}
```

### 7.4 Why Competitors Don't Have This

| Feature | ChinaLink Express | Competitors |
|---------|-------------------|-------------|
| Verification | Real tracking numbers linked | Fake/generic reviews |
| Video Testimonials | Customer video reviews | Text only |
| Real-time | New reviews appear live | Static page |
| Filtering | By industry, service type | No filtering |
| Shipment Details | Shows actual shipment info | Anonymous |

---

## 8. Feature 7: Currency Exchange Monitor

### 8.1 Overview

Live exchange rate widget showing FCFA/USD/CNY rates with impact analysis on shipping costs and customizable alerts for favorable rates.

### 8.2 User Experience

```
┌─────────────────────────────────────────────────────────────────────┐
│  💱 TAUX DE CHANGE EN DIRECT                                        │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │  USD/XOF                    CNY/XOF                         │   │
│  │  ═══════                    ═══════                         │   │
│  │  605.50                     83.75                           │   │
│  │  ↑ +0.25 (0.04%)            ↑ +0.12 (0.14%)                 │   │
│  │  ─ 0.15% vs hier            ─ 0.28% vs hier                 │   │
│  │                                                             │   │
│  │  [📈 7j] [📈 30j] [📈 1an]                                  │   │
│  │                                                             │   │
│  │          USD/XOF - 7 jours                                  │   │
│  │     607 ┤                              ╭─╮                  │   │
│  │         │                           ╭──╯ │                  │   │
│  │     606 ┤      ╭─╮               ╭──╯    │                  │   │
│  │         │  ╭──╯  ╰──╮         ╭──╯       │                  │   │
│  │     605 ┤──╯        ╰────╭───╯           │                  │   │
│  │         │                ╰──╮            │                  │   │
│  │     604 ┤                   ╰───╮        │                  │   │
│  │         │                       ╰────────╯                  │   │
│  │         └L  M  M  J  V  S  D                                │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  💡 Impact sur vos expéditions:                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Si vous importez aujourd'hui vs hier:                      │   │
│  │                                                             │   │
│  │  Colis de 10kg (Shanghai → Bamako)                          │   │
│  │  • À l'import: 850,000 XOF (≈ $1,403)                      │   │
│  │  • Hier: 848,500 XOF (≈ $1,401)                            │   │
│  │  • Différence: +1,500 XOF (+0.18%) 📈                      │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  🔔 Alertes:                                                        │
│  [+] Alerte quand USD/XOF < 600                                    │
│  [+] Alerte quand variation > 2%                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.3 Implementation

```typescript
// src/features/currency-monitor/types.ts

interface ExchangeRate {
  pair: string;
  base: string;
  quote: string;
  rate: number;
  inverseRate: number;
  change24h: {
    value: number;
    percentage: number;
  };
  change7d: {
    value: number;
    percentage: number;
  };
  high24h: number;
  low24h: number;
  lastUpdated: string;
  source: string;
}

interface RateAlert {
  id: string;
  pair: string;
  condition: 'above' | 'below' | 'change_above';
  threshold: number;
  isActive: boolean;
  notificationChannels: ('email' | 'sms' | 'push')[];
}

interface ShippingCostImpact {
  scenario: string;
  baseAmount: number;
  baseCurrency: string;
  convertedAmount: number;
  convertedCurrency: string;
  differenceFromYesterday: number;
  recommendation: 'buy_now' | 'wait' | 'neutral';
}
```

```typescript
// src/features/currency-monitor/hooks/useExchangeRates.ts

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useCurrencyStore } from '../store/useCurrencyStore';
import type { ExchangeRate, RateAlert } from '../types';

const PAIRS = ['USD/XOF', 'CNY/XOF', 'EUR/XOF'];
const UPDATE_INTERVAL = 60000; // 1 minute

export function useExchangeRates() {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  
  const rates = useCurrencyStore((state) => state.rates);
  const updateRate = useCurrencyStore((state) => state.updateRate);
  const alerts = useCurrencyStore((state) => state.alerts);

  // Fetch initial rates
  const fetchRates = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/USD?pairs=${PAIRS.join(',')}`
      );
      const data = await response.json();
      
      PAIRS.forEach((pair) => {
        const [base, quote] = pair.split('/');
        const rate = data.rates[quote] / data.rates[base];
        
        updateRate({
          pair,
          base,
          quote,
          rate,
          inverseRate: 1 / rate,
          change24h: { value: 0, percentage: 0 }, // Calculate from history
          change7d: { value: 0, percentage: 0 },
          high24h: rate,
          low24h: rate,
          lastUpdated: new Date().toISOString(),
          source: 'exchangerate-api',
        });
      });
      
      setLastUpdate(new Date());
    } finally {
      setIsLoading(false);
    }
  }, [updateRate]);

  // Subscribe to real-time updates (using polling for now, WebSocket for production)
  useEffect(() => {
    fetchRates();
    
    const interval = setInterval(fetchRates, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchRates]);

  // Check alerts when rates change
  useEffect(() => {
    alerts.forEach((alert) => {
      const rate = rates[alert.pair];
      if (!rate || !alert.isActive) return;

      let triggered = false;
      
      if (alert.condition === 'below' && rate.rate < alert.threshold) {
        triggered = true;
      } else if (alert.condition === 'above' && rate.rate > alert.threshold) {
        triggered = true;
      } else if (
        alert.condition === 'change_above' && 
        Math.abs(rate.change24h.percentage) > alert.threshold
      ) {
        triggered = true;
      }

      if (triggered) {
        sendAlertNotification(alert, rate);
      }
    });
  }, [rates, alerts]);

  const calculateImpact = useCallback((amount: number, fromCurrency: string, toCurrency: string) => {
    const pair = `${fromCurrency}/${toCurrency}`;
    const rate = rates[pair];
    
    if (!rate) return null;

    return {
      converted: amount * rate.rate,
      rate: rate.rate,
      trend: rate.change24h.percentage > 0 ? 'up' : 'down',
    };
  }, [rates]);

  return {
    rates,
    isLoading,
    lastUpdate,
    calculateImpact,
    refresh: fetchRates,
  };
}
```

### 8.4 Why Competitors Don't Have This

| Feature | ChinaLink Express | Competitors |
|---------|-------------------|-------------|
| Live Rates | Real-time updates | Static rates |
| Impact Analysis | Shows shipping cost impact | No analysis |
| Historical Charts | 7d/30d/1y trends | No charts |
| Alerts | Customizable notifications | No alerts |
| Multi-currency | FCFA, USD, CNY | FCFA only |

---

## 9. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- Set up WebSocket infrastructure (PartyKit/Upstash)
- Create shared types and stores
- Implement connection management hooks
- Set up Redis pub/sub

### Phase 2: Core Features (Weeks 3-6)
- Live Shipment Map with clustering
- Live Pricing Ticker with SSE
- Active Shipment Count-Up dashboard

### Phase 3: Advanced Features (Weeks 7-10)
- Interactive Shipping Schedule with booking
- Live Chat + Co-browsing
- Dynamic Testimonials carousel

### Phase 4: Polish & Optimization (Weeks 11-12)
- Currency Exchange Monitor
- Performance optimization
- Offline fallbacks
- Mobile responsiveness

### Dependencies to Add

```json
{
  "dependencies": {
    "partykit": "^0.0.104",
    "@upstash/redis": "^1.28.0",
    "react-map-gl": "^7.1.0",
    "mapbox-gl": "^3.0.0",
    "recharts": "^2.10.0",
    "@tanstack/react-virtual": "^3.0.0",
    "date-fns": "^3.0.0",
    "zod": "^3.22.0"
  }
}
```

---

## Summary

These 7 real-time features create an unparalleled logistics experience:

1. **Live Shipment Map** - Visual transparency of global operations
2. **Live Pricing Ticker** - Stock market-style rate visibility
3. **Active Shipment Count-Up** - Social proof through real metrics
4. **Interactive Shipping Schedule** - Direct booking capability
5. **Live Chat + Co-browsing** - Personalized support experience
6. **Dynamic Testimonials** - Verified, filterable reviews
7. **Currency Exchange Monitor** - Financial transparency

Combined, these features transform ChinaLink Express from a static website into an immersive, app-like platform that provides transparency, builds trust, and drives conversions.
