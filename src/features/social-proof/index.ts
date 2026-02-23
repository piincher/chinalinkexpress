/**
 * Social Proof Feature
 * 
 * Social proof banners, trust badges, activity ticker, and toast notifications.
 * Displays real-time activity and trust signals to build credibility.
 */

// Store
export { 
  useSocialProofStore,
  useSocialProofEvents,
  useSocialProofMetrics,
  useSocialProofLoading,
  useBannerVisibility,
  generateRandomEvent,
  simulateMetricsUpdate,
} from './store/useSocialProofStore';

// Hooks
export { useSocialProof } from './hooks/useSocialProof';

// Components
export { 
  SocialProofBanner,
  InlineSocialProof,
} from './components/SocialProofBanner';

export { 
  TrustBadges,
  TrustBadgeStrip,
} from './components/TrustBadges';

export { ActivityTicker } from './components/ActivityTicker';

export { 
  RecentActivityToast,
  useActivityToast,
} from './components/RecentActivityToast';
