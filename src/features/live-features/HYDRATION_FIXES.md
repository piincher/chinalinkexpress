# Hydration Mismatch Fixes

## Summary

Fixed hydration mismatches caused by using `new Date()`, `Date.now()`, and `Math.random()` during server-side rendering (SSR).

## Root Causes

Next.js renders pages on the server first, then hydrates on the client. When components use:
- `new Date()` - Server and client have different timestamps
- `Date.now()` - Same issue
- `Math.random()` - Server and client generate different random values

This causes the HTML generated on the server to differ from what the client expects, resulting in hydration warnings.

## Files Fixed

### 1. `src/features/live-feed/store/useLiveFeedStore.ts`
**Issue**: `initialStats` used `new Date().toISOString()` at module level
**Fix**: Changed `lastUpdated` to empty string initially

```typescript
// Before
const initialStats: ShipmentFeedStats = {
  lastUpdated: new Date().toISOString(), // ❌ Hydration mismatch
};

// After
const initialStats: ShipmentFeedStats = {
  lastUpdated: '', // ✅ Set on client only
};
```

### 2. `src/features/social-proof/store/useSocialProofStore.ts`
**Issue**: `mockEvents` array used `Date.now()` for timestamps
**Fix**: Used fixed ISO timestamps that are consistent between server and client

```typescript
// Before
const mockEvents = [
  { timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() }, // ❌
];

// After
const mockEvents = [
  { timestamp: '2026-02-23T06:25:00.000Z' }, // ✅ Fixed timestamp
];
```

### 3. `src/features/routes-map/hooks/useTrendingRoutes.ts`
**Issue**: `generateVolumeHistory()` uses `Math.random()` in `useMemo`
**Fix**: Added `isMounted` state to only generate random data on client

```typescript
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true); // ✅ Only true on client
}, []);

const volumeHistory = useMemo(() => {
  if (!selectedRoute || !isMounted) return []; // ✅ Return empty until mounted
  return generateVolumeHistory(selectedRoute.popularity);
}, [selectedRoute, isMounted]);
```

### 4. `src/features/live-feed/components/ShipmentCard.tsx`
**Issue**: `getRelativeTime()` used `new Date()` during render
**Fix**: Moved to `useEffect` with state

```typescript
const [relativeTime, setRelativeTime] = useState<string>('');
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
  setRelativeTime(getRelativeTime(shipment.timestamp));
  // ...
}, [shipment.timestamp]);

// In render:
<span>{isMounted ? relativeTime : '...'}</span> // ✅ Fallback during SSR
```

### 5. `src/features/social-proof/components/ActivityTicker.tsx`
**Issue**: `getTimeAgo()` used `new Date()` during render
**Fix**: Similar pattern - moved to `useEffect` with state

### 6. `src/features/countdown/hooks/useDeliveryCountdown.ts`
**Issue**: `mockDeliveryData` constant used `Date.now()` at module level
**Fix**: Converted to function `generateMockDeliveryData()` called inside `useEffect`

```typescript
// Before
const mockDeliveryData = {
  'CLE-001': { estimatedDelivery: new Date(Date.now() + ...).toISOString() } // ❌
};

// After
function generateMockDeliveryData() {
  return {
    'CLE-001': { estimatedDelivery: new Date(Date.now() + ...).toISOString() } // ✅
  };
}
// Called inside useEffect
```

## Pattern for Client-Only Data

When you need dates or random values that differ between server and client:

### Option 1: Use Empty/Default Initial Values
```typescript
const [value, setValue] = useState(''); // or 0, null, etc.

useEffect(() => {
  setValue(generateValue()); // Set real value on client
}, []);
```

### Option 2: Use Fixed Values for SSR
```typescript
// Use deterministic values that match between server and client
const mockData = {
  timestamp: '2026-02-23T06:00:00.000Z', // Fixed ISO string
};
```

### Option 3: Conditional Rendering
```typescript
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

// Render placeholder during SSR
return <span>{isMounted ? dynamicValue : '...'}</span>;
```

## Best Practices

1. **Never use `Date.now()` or `Math.random()` at module level** (outside components/hooks)
2. **Never use `new Date()` during render** (in component body, outside useEffect)
3. **Use `useEffect` + `useState`** for client-only data
4. **Provide fallback UI** during SSR (`isMounted ? realValue : placeholder`)
5. **Use fixed mock data** for deterministic SSR output

## Testing

To verify hydration issues are fixed:
1. Disable JavaScript temporarily - page should render without errors
2. Check browser console for hydration warnings
3. Run `next build` - should complete without errors

---

*Fixed: 2026-02-23*
