# ChinaLink Express - Gamification & Engagement System Design

## Executive Summary

This document outlines a comprehensive gamification system designed to transform ChinaLink Express from a traditional logistics website into an engaging, memorable experience that drives customer loyalty, referrals, and repeat business in the Mali/West African market.

---

## Table of Contents

1. [Market Context & Psychology](#1-market-context--psychology)
2. [Feature 1: Shipment Progress Gamification](#2-feature-1-shipment-progress-gamification)
3. [Feature 2: Referral Program Game](#3-feature-2-referral-program-game)
4. [Feature 3: Loyalty Program Dashboard](#4-feature-3-loyalty-program-dashboard)
5. [Feature 4: Import Calculator Challenge](#5-feature-4-import-calculator-challenge)
6. [Feature 5: Educational Quests](#6-feature-5-educational-quests)
7. [Feature 6: Live Social Proof](#7-feature-6-live-social-proof)
8. [Technical Architecture](#8-technical-architecture)
9. [Implementation Roadmap](#9-implementation-roadmap)
10. [Success Metrics & KPIs](#10-success-metrics--kpis)

---

## 1. Market Context & Psychology

### 1.1 Cultural Context for Mali/West Africa

| Factor | Consideration | Design Response |
|--------|---------------|-----------------|
| **Community Orientation** | Decisions made collectively; referrals highly valued | Heavy emphasis on referral rewards, family sharing |
| **Mobile-First** | 85%+ access via mobile; limited data plans | Lightweight animations, offline-first design |
| **Relationship Trust** | Business built on personal relationships | Human photos, real names, WhatsApp integration |
| **Visual Storytelling** | Strong oral/visual culture | Rich animations, progress narratives |
| **Price Sensitivity** | Cost comparison is critical | Calculator tool, savings visualization |
| **Status Recognition** | Public recognition valued | Leaderboards, shareable badges, tier display |
| **Religious Observance** | Friday prayers, Ramadan considerations | Respectful notification timing, holiday bonuses |
| **Language Diversity** | French official, Bambara widely spoken | French primary, simple language, visual cues |

### 1.2 Engagement Psychology Principles

```
┌─────────────────────────────────────────────────────────────────┐
│              PSYCHOLOGY FRAMEWORK                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   DOPAMINE  │  │   STATUS    │  │   SCARCITY  │             │
│  │   LOOPS     │  │   SIGNALING │  │   PRINCIPLE │             │
│  │             │  │             │  │             │             │
│  │ • Progress  │  │ • Badges    │  │ • Limited   │             │
│  │ • Rewards   │  │ • Tiers     │  │   slots     │             │
│  │ • Surprises │  │ • Leaderbd  │  │ • FOMO      │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   RECIPRO-  │  │   SOCIAL    │  │   COMPLETE- │             │
│  │   OCITY     │  │   PROOF     │  │   TION      │             │
│  │             │  │             │  │   BIAS      │             │
│  │ • Free pts  │  │ • Activity  │  │ • Quests    │             │
│  │ • Bonuses   │  │   feed      │  │ • Checklists│             │
│  │ • Gifts     │  │ • Notif     │  │ • % done    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3 Anti-Gaming Measures (Universal)

| Threat | Prevention Strategy |
|--------|---------------------|
| **Fake Referrals** | Phone verification, unique device fingerprinting, cooldown periods |
| **Point Farming** | Daily caps, human verification for large redemptions, pattern detection |
| **Multiple Accounts** | Phone number uniqueness, device limiting, behavioral analysis |
| **Bot Activity** | Rate limiting, CAPTCHA for high-frequency actions, honeypot fields |
| **Self-Referral** | IP tracking, device fingerprinting, address matching |

---

## 2. Feature 1: Shipment Progress Gamification

### 2.1 Concept Overview

Transform the mundane tracking experience into an engaging journey narrative that celebrates each milestone and creates emotional investment in the shipment's progress.

### 2.2 User Experience Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  TRACKING PAGE JOURNEY                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Animated Map]  ←  Package travels real route                  │
│       ↓                                                         │
│  [Milestone Card] ← "Votre colis a parcouru 8,432 km!"          │
│       ↓                                                         │
│  [Achievement Unlock] ← Badge animation + confetti              │
│       ↓                                                         │
│  [Share Button] ← "Partager ma progression"                     │
│       ↓                                                         │
│  [WhatsApp/FB Story] ← Auto-generated image with stats          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Key Components

#### A. Interactive Journey Map

```typescript
// Component: ShipmentJourneyMap.tsx
interface JourneyMapProps {
  shipment: Shipment;
  milestones: Milestone[];
  currentProgress: number; // 0-100
}

interface Milestone {
  id: string;
  location: string;
  coordinates: [number, number];
  distance: number;
  description: string;
  icon: string;
  unlockedAt?: Date;
}
```

**Visual Design:**
- Stylized SVG world map (China → West Africa focus)
- Animated dotted route line that fills as package travels
- Pulsing "current location" marker
- City markers that light up when reached
- Distance counter that increments smoothly

#### B. Milestone Celebration System

| Milestone | Trigger | Reward | Visual |
|-----------|---------|--------|--------|
| **Départ** | Package picked up | 50 CLINK Points | Launch animation |
| **Halfe Way** | 50% distance | Badge: "Halfway Hero" | Map zoom effect |
| **International** | Crossed border | 100 CLINK Points | Passport stamp visual |
| **Arrivée** | Reached destination | Badge: "Livré!" + 200 pts | Celebration confetti |
| **Speed Demon** | Early delivery | Badge + 300 pts | Trophy animation |

#### C. Achievement Badges (Shipment-Related)

```typescript
const SHIPMENT_BADGES = [
  {
    id: 'first_shipment',
    name: 'Premier Pas',
    description: 'Votre premier envoi avec ChinaLink',
    icon: '🚀',
    rarity: 'common',
    points: 100,
  },
  {
    id: 'voyager_10',
    name: 'Voyageur Confirmé',
    description: '10 colis livrés avec succès',
    icon: '🌍',
    rarity: 'uncommon',
    points: 500,
  },
  {
    id: 'globetrotter',
    name: 'Globe-Trotter',
    description: '100 colis livrés - vous êtes un pro!',
    icon: '👑',
    rarity: 'legendary',
    points: 5000,
  },
  {
    id: 'ocean_master',
    name: 'Maître des Océans',
    description: '10 envois maritimes complétés',
    icon: '⚓',
    rarity: 'rare',
    points: 1000,
  },
  {
    id: 'air_pioneer',
    name: 'Pionnier de l\'Air',
    description: '10 envois aériens complétés',
    icon: '✈️',
    rarity: 'rare',
    points: 1000,
  },
] as const;
```

### 2.4 Technical Implementation

```typescript
// hooks/useShipmentGamification.ts
'use client';

import { useEffect, useState } from 'react';
import { useAnimationStore } from '@/store/useAnimationStore';

export function useShipmentGamification(trackingNumber: string) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const triggerCelebration = useAnimationStore((state) => state.triggerConfetti);

  useEffect(() => {
    // Poll shipment status every 30 seconds
    const pollInterval = setInterval(async () => {
      const status = await fetchShipmentStatus(trackingNumber);
      checkForNewMilestones(status);
    }, 30000);

    return () => clearInterval(pollInterval);
  }, [trackingNumber]);

  const checkForNewMilestones = (status: ShipmentStatus) => {
    const newMilestone = calculateMilestone(status);
    if (newMilestone && !milestones.find(m => m.id === newMilestone.id)) {
      setMilestones(prev => [...prev, newMilestone]);
      setCurrentMilestone(newMilestone);
      setShowCelebration(true);
      triggerCelebration();
      
      // Award points
      awardPoints(newMilestone.points);
    }
  };

  return { milestones, currentMilestone, showCelebration, dismissCelebration };
}
```

### 2.5 Shareable Milestone Cards

```typescript
// components/MilestoneShareCard.tsx
// Generates an image for social sharing

interface ShareCardData {
  milestoneName: string;
  distanceTraveled: number;
  origin: string;
  destination: string;
  daysInTransit: number;
  userName: string;
}

// Auto-generates WhatsApp/Instagram story images
// Uses html-to-image or canvas API
```

### 2.6 Cultural Adaptations

| Element | Adaptation |
|---------|------------|
| **Distance Display** | Show in km (metric) with local landmarks for scale |
| **Time References** | Use "jours" not "heures" for cultural time perception |
| **Celebration Style** | Drum/calabash sounds instead of generic "ding" |
| **Share Platforms** | WhatsApp primary, Facebook secondary (no Twitter focus) |
| **Language** | Use "Nous" (we) not "Je" (I) for community feel |

### 2.7 Anti-Gaming Measures

| Threat | Prevention |
|--------|------------|
| Fake tracking numbers | Validate against shipment database |
| Multiple views for points | Rate-limit milestone triggers per user |
| Screenshot spoofing | Watermark with user ID, timestamp |

### 2.8 Expected Impact

| Metric | Expected Change |
|--------|-----------------|
| Tracking page visits | +150% (more frequent check-ins) |
| Social shares | 20-30% of milestone achievements |
| Customer satisfaction | +25% (emotional connection) |
| Repeat shipments | +35% within 90 days |

---

## 3. Feature 2: Referral Program Game

### 3.1 Concept Overview

Transform referrals into a visual "family tree" game where users can see their growing network, compete with friends, and unlock increasingly valuable rewards as their referral tree expands.

### 3.2 The Referral Tree Visual

```
┌─────────────────────────────────────────────────────────────────┐
│  MON RÉSEAU CHINALINK                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌─────────────┐                              │
│                    │   👤 VOUS   │                              │
│                    │  1,250 pts  │                              │
│                    │  Éclaireur  │                              │
│                    └──────┬──────┘                              │
│           ┌───────────────┼───────────────┐                     │
│     ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐              │
│     │ 👤 Amadou │   │ 👤 Fatima │   │ 👤 Issa   │              │
│     │  500 pts  │   │  750 pts  │   │  300 pts  │              │
│     │   🟢      │   │   🟢      │   │   🟡      │              │
│     └─────┬─────┘   └───────────┘   └───────────┘              │
│     ┌─────┴─────┐                                               │
│     │ 👤 Moussa │  ← 2nd level referrals!                       │
│     │  200 pts  │                                               │
│     └───────────┘                                               │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🎯 PROCHAIN OBJECTIF: 3 referrals = Réduction 10%      │   │
│  │  ██████████████░░░░░░ 2/3                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [📤 Inviter par WhatsApp]  [📋 Copier mon lien]               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Reward Structure

#### A. Direct Referral Rewards

| Action | Reward | Conditions |
|--------|--------|------------|
| Friend signs up | 100 CLINK Points | + verified phone |
| Friend's first shipment | 500 CLINK Points | + friend gets 10% off |
| Friend reaches 5 shipments | 1000 CLINK Points | Bonus loyalty |
| Friend refers someone | 250 CLINK Points | 2nd level bonus |

#### B. Tier System (Network Size)

| Tier | Name | Referrals Needed | Benefits |
|------|------|------------------|----------|
| 1 | **Ambassadeur** | 1-2 referrals | 5% discount on next shipment |
| 2 | **Pionnier** | 3-5 referrals | 10% discount, priority support |
| 3 | **Leader** | 6-10 referrals | 15% discount, free insurance |
| 4 | **Légende** | 11-20 referrals | 20% discount, dedicated agent |
| 5 | **Maître du Réseau** | 20+ referrals | 25% discount, profit sharing |

### 3.4 Technical Implementation

```typescript
// types/referral.ts

interface ReferralTree {
  root: ReferralNode;
  totalReferrals: number;
  totalPoints: number;
  currentTier: ReferralTier;
  nextTierProgress: number;
}

interface ReferralNode {
  userId: string;
  name: string;
  avatar?: string;
  joinedAt: Date;
  shipmentCount: number;
  pointsGenerated: number;
  status: 'pending' | 'active' | 'inactive';
  children: ReferralNode[];
  level: number; // 1 = direct, 2 = referred by referral, etc.
}

type ReferralTier = 'ambassador' | 'pioneer' | 'leader' | 'legend' | 'master';

// store/useReferralStore.ts
interface ReferralState {
  tree: ReferralTree | null;
  referralCode: string;
  shareUrl: string;
  
  // Actions
  fetchTree: () => Promise<void>;
  generateReferralCode: () => string;
  shareViaWhatsApp: () => void;
  shareViaSMS: () => void;
  copyLink: () => void;
}

export const useReferralStore = create<ReferralState>()(
  persist(
    (set, get) => ({
      tree: null,
      referralCode: '',
      shareUrl: '',
      
      fetchTree: async () => {
        const response = await fetch('/api/referrals/tree');
        const data = await response.json();
        set({ tree: data });
      },
      
      shareViaWhatsApp: () => {
        const { shareUrl } = get();
        const message = encodeURIComponent(
          `🚀 J'ai découvert ChinaLink Express pour importer de Chine! ` +
          `Utilise mon lien et obtiens 10% de réduction sur ton premier envoi: ${shareUrl}`
        );
        window.open(`https://wa.me/?text=${message}`, '_blank');
      },
    }),
    { name: 'referral-storage' }
  )
);
```

### 3.5 Visual Tree Component

```typescript
// components/ReferralTreeVisualizer.tsx
// Uses D3.js or React Flow for interactive tree visualization

'use client';

import { useCallback } from 'react';
import ReactFlow, { 
  Controls, 
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

interface TreeVisualizerProps {
  tree: ReferralTree;
  onNodeClick: (node: ReferralNode) => void;
}

// Nodes styled as:
// - Root: Large, gold ring, "VOUS" label
// - Active: Green glow, animated pulse
// - Pending: Grey, "En attente du premier envoi"
// - Inactive: Dimmed, last active date
```

### 3.6 Cultural Adaptations

| Element | Adaptation |
|---------|------------|
| **Tree Metaphor** | Use "Famille" or "Communauté" instead of corporate terms |
| **Sharing** | WhatsApp broadcast lists, community groups |
| **Recognition** | Public thanks in company social posts for top referrers |
| **Reward Types** | Mix of discounts + tangible (airtime credit popular) |
| **Progress Updates** | Weekly WhatsApp summary of network growth |

### 3.7 Anti-Gaming Measures

| Threat | Prevention |
|--------|------------|
| Self-referral | Phone verification, device fingerprinting, address matching |
| Fake accounts | Require first shipment before referral bonus, minimum order value |
| Code sharing abuse | Unique codes per user, rate limiting |
| Account farming | Behavioral analysis, minimum engagement time |

### 3.8 Difficulty to Copy

**HIGH** - Requires:
- Multi-level tracking database
- Fraud detection systems
- WhatsApp Business API integration
- Cultural understanding of West African referral patterns

### 3.9 Expected Impact

| Metric | Expected Change |
|--------|-----------------|
| Customer acquisition cost | -40% (organic referrals) |
| New customer conversion | +60% (referred customers) |
| Viral coefficient | Target: 0.3 (each user brings 0.3 new users) |
| Brand awareness | +200% via social sharing |

---

## 4. Feature 3: Loyalty Program Dashboard

### 4.1 Concept Overview

A "CLINK Points" loyalty system with tier-based benefits that creates long-term engagement and rewards customer loyalty with tangible, valuable perks.

### 4.2 Dashboard Design

```
┌─────────────────────────────────────────────────────────────────┐
│  MON COMPTE CLINK                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │    ✨ 12,450  CLINK POINTS                              │   │
│  │       ≈ 124,500 FCFA de réductions disponibles          │   │
│  │                                                         │   │
│  │    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │   │
│  │    Niveau: OR  🥇  (12,450 / 15,000 pour PLATINE)      │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  MES AVANTAGES OR:                                              │
│  ✓ Livraison prioritaire (+10% de points)                      │
│  ✓ Assurance gratuite sur tous les envois                      │
│  ✓ Agent dédié WhatsApp                                        │
│  ✓ Réduction 15% permanente                                    │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ 🎁 Utiliser│ │ 📊 Historique│ │ 🎯 Missions │ │ 🏆 Badges │          │
│  │   Points  │ │    Points   │ │   du Jour  │ │           │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Tier System

| Tier | Points Required | Badge | Key Benefits |
|------|-----------------|-------|--------------|
| **Bronze** | 0-2,499 | 🥉 | 5% discount, basic support |
| **Silver** | 2,500-7,499 | 🥈 | 10% discount, priority queue |
| **Gold** | 7,500-14,999 | 🥇 | 15% discount, free insurance, agent |
| **Platinum** | 15,000-29,999 | 💎 | 20% discount, express processing |
| **Diamond** | 30,000+ | 👑 | 25% discount, profit sharing, VIP events |

### 4.4 Points Earning Structure

| Action | Points | Frequency Limit |
|--------|--------|-----------------|
| Shipment (per 1000 FCFA spent) | 10 pts | Unlimited |
| Complete profile | 200 pts | Once |
| First shipment bonus | 500 pts | Once |
| Write review | 100 pts | Per shipment |
| Refer friend (signup) | 100 pts | Unlimited |
| Refer friend (first shipment) | 500 pts | Unlimited |
| Share milestone | 50 pts | Per milestone |
| Complete educational quest | 100-300 pts | Per quest |
| Birthday bonus | 1000 pts | Annual |
| Anniversary with ChinaLink | 2000 pts | Annual |
| Weekend shipment | 20% bonus | Unlimited |
| Peak season (Nov-Jan) | 15% bonus | Seasonal |

### 4.5 Points Redemption

| Reward | Points Cost | Value |
|--------|-------------|-------|
| 1000 FCFA discount | 100 pts | 10:1 ratio |
| Free insurance | 200 pts | ~5000 FCFA value |
| Priority processing | 300 pts | 24h faster |
| WhatsApp consultation | 150 pts | Expert advice |
| China sourcing assistance | 500 pts | Personal shopper |
| Branded merchandise | 1000-5000 pts | T-shirt, bag, etc. |
| Airport lounge access | 10000 pts | Bamako/Addis Ababa |

### 4.6 Technical Implementation

```typescript
// types/loyalty.ts

interface LoyaltyAccount {
  userId: string;
  currentPoints: number;
  lifetimePoints: number;
  tier: LoyaltyTier;
  tierProgress: TierProgress;
  benefits: Benefit[];
  transactions: PointTransaction[];
  nextBirthdayBonus?: Date;
  joinedAt: Date;
}

interface PointTransaction {
  id: string;
  type: 'earned' | 'redeemed' | 'expired' | 'bonus';
  amount: number;
  description: string;
  reference?: string; // shipment ID, referral ID, etc.
  timestamp: Date;
  expiresAt?: Date;
}

interface TierProgress {
  current: number;
  nextTier: LoyaltyTier;
  nextThreshold: number;
  percentage: number;
}

type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

// store/useLoyaltyStore.ts
export const useLoyaltyStore = create<LoyaltyState>()(
  persist(
    (set, get) => ({
      account: null,
      
      fetchAccount: async () => {
        const response = await fetch('/api/loyalty/account');
        const account = await response.json();
        set({ account });
      },
      
      redeemPoints: async (rewardId: string) => {
        const response = await fetch('/api/loyalty/redeem', {
          method: 'POST',
          body: JSON.stringify({ rewardId }),
        });
        
        if (response.ok) {
          // Update local state
          get().fetchAccount();
          return { success: true };
        }
        return { success: false, error: await response.text() };
      },
      
      // Automatic tier upgrade animation trigger
      checkTierUpgrade: () => {
        const { account } = get();
        if (account?.tierProgress.percentage >= 100) {
          useAnimationStore.getState().triggerTierUpgrade();
        }
      },
    }),
    { name: 'loyalty-storage' }
  )
);

// components/TierProgressBar.tsx
// Animated progress bar with tier icons
// Shows: Current tier | Progress bar | Next tier
// Animation: Fill on load, sparkle at milestone
```

### 4.7 Birthday & Anniversary Rewards

```typescript
// services/loyaltyService.ts

export function checkSpecialOccasions(user: User): SpecialReward[] {
  const rewards: SpecialReward[] = [];
  const today = new Date();
  
  // Birthday check
  if (isSameDay(today, user.birthday)) {
    rewards.push({
      type: 'birthday',
      title: '🎉 Joyeux Anniversaire!',
      description: 'Voici 1000 CLINK Points pour votre journée spéciale!',
      points: 1000,
      expiresInDays: 30,
    });
  }
  
  // Anniversary check
  const yearsWithCompany = differenceInYears(today, user.joinedAt);
  if (isSameDay(today, user.joinedAt)) {
    rewards.push({
      type: 'anniversary',
      title: `🎊 ${yearsWithCompany} Ans Ensemble!`,
      description: `Merci de votre fidélité depuis ${yearsWithCompany} ans!`,
      points: 2000 * yearsWithCompany,
      expiresInDays: 60,
    });
  }
  
  return rewards;
}
```

### 4.8 Cultural Adaptations

| Element | Adaptation |
|---------|------------|
| **Points Name** | "CLINK Points" - simple, memorable, brand-aligned |
| **Value Display** | Always show FCFA equivalent (local currency) |
| **Tier Names** | Use universal symbols (bronze/silver/gold) + French names |
| **Rewards** | Airtime credit, market vouchers highly valued |
| **Communication** | SMS/WhatsApp for points updates (not email) |
| **Group Benefits** | Family account pooling (spouse, children can combine) |

### 4.9 Anti-Gaming Measures

| Threat | Prevention |
|--------|------------|
| Points arbitrage | Fixed 10:1 redemption ratio, no trading |
| Account sharing | Device/IP tracking, behavioral patterns |
| Fake birthdays | ID verification for high-value rewards |
| Points expiration gaming | Rolling 12-month expiration, transparent rules |

### 4.10 Expected Impact

| Metric | Expected Change |
|--------|-----------------|
| Customer lifetime value | +45% |
| Repeat purchase rate | +60% |
| Average order value | +25% (to reach next tier) |
| Churn rate | -35% |

---

## 5. Feature 4: Import Calculator Challenge

### 5.1 Concept Overview

An interactive tool that lets customers calculate their potential savings vs. competitors, with gamified elements that encourage sharing and unlock better rates.

### 5.2 Calculator Interface

```
┌─────────────────────────────────────────────────────────────────┐
│  💰 CALCULATEZ VOS ÉCONOMIES                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ÉTAPE 1: Votre envoi                                   │   │
│  │                                                         │   │
│  │  Type: [Air ✈️] [Mer 🚢] [Express 🚀]                  │   │
│  │                                                         │   │
│  │  Poids: [___] kg                                        │   │
│  │  Valeur: [___] FCFA                                     │   │
│  │  Destination: [Bamako ▼]                                │   │
│  │                                                         │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      │   │
│  │  ESTIMATION CHINALINK: 145,000 FCFA                    │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🎯 DÉFI: Comparez avec vos anciens prix!              │   │
│  │                                                         │   │
│  │  Prix concurrent: [___] FCFA                           │   │
│  │                                                         │   │
│  │  💡 VOUS ÉCONOMISEZ: 45,000 FCFA (31%)                 │   │
│  │                                                         │   │
│  │  [📤 Partager mes économies] → Débloque -5% supp.      │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  📊 Classement des Économies (cette semaine):                  │
│  1. 🥇 Amadou T. - 1,245,000 FCFA économisés                   │
│  2. 🥈 Fatima K. - 890,000 FCFA économisés                     │
│  3. 🥉 Issa M.   - 756,000 FCFA économisés                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Gamification Elements

#### A. Savings Leaderboard

| Rank | Requirement | Reward |
|------|-------------|--------|
| Weekly Top 3 | Highest savings calculated | 500 CLINK Points + featured |
| Monthly Champion | Most savings + referrals | 2000 CLINK Points + free shipment |
| Savings Milestones | 100K, 500K, 1M FCFA saved | Badges + bonus points |

#### B. Share-to-Unlock Mechanism

```
Share Results → Unlock Better Rates
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Share on WhatsApp     →  -2% discount
Share on Facebook     →  -2% discount  
Share in Group        →  -3% discount
Tag 3 Friends         →  -5% discount
[Stackable up to -10%]
```

### 5.4 Technical Implementation

```typescript
// components/ImportCalculator.tsx
'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoyaltyStore } from '@/store/useLoyaltyStore';

interface CalculatorState {
  weight: number;
  value: number;
  destination: string;
  shippingType: 'air' | 'sea' | 'express';
  competitorPrice?: number;
}

interface CalculationResult {
  chinaLinkPrice: number;
  breakdown: PriceBreakdown;
  estimatedDelivery: string;
  savings?: number;
  savingsPercent?: number;
}

export function ImportCalculator() {
  const [state, setState] = useState<CalculatorState>({
    weight: 0,
    value: 0,
    destination: 'bamako',
    shippingType: 'air',
  });
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showChallenge, setShowChallenge] = useState(false);
  const [unlockedDiscount, setUnlockedDiscount] = useState(0);
  
  const calculatePrice = useCallback(() => {
    // Price calculation logic based on ChinaLink's rates
    const baseRate = SHIPPING_RATES[state.shippingType][state.destination];
    const weightCost = state.weight * baseRate.perKg;
    const valueCost = state.value * baseRate.valueRate;
    const total = weightCost + valueCost + baseRate.baseFee;
    
    setResult({
      chinaLinkPrice: Math.round(total),
      breakdown: { weightCost, valueCost, baseFee: baseRate.baseFee },
      estimatedDelivery: baseRate.estimatedDays,
    });
    
    setShowChallenge(true);
  }, [state]);
  
  const handleShare = async (platform: 'whatsapp' | 'facebook') => {
    const shareData = generateShareImage(result!);
    
    if (platform === 'whatsapp') {
      shareToWhatsApp(shareData);
    }
    
    // Unlock discount
    setUnlockedDiscount(prev => Math.min(prev + 2, 10));
    
    // Award points
    useLoyaltyStore.getState().addPoints(50, 'share_calculator');
  };
  
  return (
    <div className="calculator-container">
      {/* Input Form */}
      <CalculatorForm state={state} onChange={setState} />
      
      {/* Calculate Button */}
      <motion.button
        onClick={calculatePrice}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="calculate-btn"
      >
        Calculer Mon Prix
      </motion.button>
      
      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="results-panel"
          >
            <PriceDisplay result={result} />
            <SavingsChallenge 
              onShare={handleShare}
              unlockedDiscount={unlockedDiscount}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### 5.5 Auto-Generated Share Image

```typescript
// utils/shareImageGenerator.ts

import { toPng } from 'html-to-image';

export async function generateShareImage(result: CalculationResult): Promise<string> {
  const element = document.getElementById('savings-card');
  
  const dataUrl = await toPng(element!, {
    quality: 0.95,
    backgroundColor: '#ffffff',
  });
  
  return dataUrl;
}

// Generated image includes:
// - ChinaLink branding
// - "J'ai économisé X FCFA avec ChinaLink Express!"
// - Comparison bar chart
// - QR code to calculator
// - "Calculez vos économies" CTA
```

### 5.6 Cultural Adaptations

| Element | Adaptation |
|---------|------------|
| **Currency** | FCFA primary, USD secondary for context |
| **Destinations** | Bamako, Abidjan, Dakar, Lomé, Ouagadougou |
| **Product Examples** | Phones, fabrics, auto parts, construction materials |
| **Trust Elements** | "Prix sans frais cachés" - hidden fees are a major concern |
| **Comparison** | Allow comparison with "my previous shipper" not just generic |

### 5.7 Anti-Gaming Measures

| Threat | Prevention |
|--------|------------|
| Fake competitor prices | Require screenshot upload for high-value claims |
| Discount exploitation | Discounts expire in 7 days, max 3 uses per month |
| Bot calculations | Rate limiting, CAPTCHA after 5 calculations |

### 5.8 Expected Impact

| Metric | Expected Change |
|--------|-----------------|
| Quote requests | +80% |
| Conversion rate | +25% (social proof from sharing) |
| Cost per acquisition | -30% (organic reach) |
| Brand trust | +40% (transparency) |

---

## 6. Feature 5: Educational Quests

### 6.1 Concept Overview

Gamified learning system that teaches customers about importing, customs, and logistics while rewarding engagement with points and badges.

### 6.2 Quest System Design

```
┌─────────────────────────────────────────────────────────────────┐
│  🎯 MISSIONS & QUÊTES                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PROGRESSION: 7/12 complétées  ━━━━━━━━━━━━░░░░░░ 58%          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  📚 QUÊTES DÉBUTANT (Complétez pour débloquer Expert)  │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  ✅ Compléter mon profil                    +200 pts   │   │
│  │  ✅ Lire "Guide du Premier Import"          +100 pts   │   │
│  │  ⏳ Regarder "Comment suivre mon colis"     +150 pts   │   │
│  │     [▶️ Regarder la vidéo - 3 min]                     │   │
│  │  ⏳ Calculer mon premier devis              +100 pts   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🏆 QUÊTES EXPERT (Niveau débloqué!)                   │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  ⏳ Lire "Douanes et Taxes Déchiffrées"     +200 pts   │   │
│  │  ⏳ Passer le quiz Import/Export            +300 pts   │   │
│  │  ⏳ Partager un article                     +100 pts   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  💎 QUÊTES MAÎTRE (Niveau débloqué!)                   │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  🔒 Inviter 3 amis                          +500 pts   │   │
│  │  🔒 Écrire un témoignage                    +300 pts   │   │
│  │  🔒 Atteindre 5 envois                      +1000 pts  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  RÉCOMPENSE NIVEAU: Badge "Expert en Import" + 500 pts        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Quest Categories

#### A. Onboarding Quests (Beginner)

| Quest | Action | Points | Purpose |
|-------|--------|--------|---------|
| Complete Profile | Fill all profile fields | 200 | Data collection |
| First Calculator Use | Get a quote | 100 | Feature adoption |
| Read Shipping Guide | View guide page | 100 | Education |
| Watch Tracking Video | 3-min tutorial | 150 | Self-service |
| Save Contact | Add WhatsApp | 100 | Retention |

#### B. Education Quests (Expert)

| Quest | Action | Points | Purpose |
|-------|--------|--------|---------|
| Customs Guide | Read customs article | 200 | Reduce support |
| Import Quiz | Pass 5/5 questions | 300 | Knowledge verify |
| Compare Rates | Use calculator 3x | 150 | Feature habit |
| Read FAQ | View 5 FAQ items | 100 | Self-service |

#### C. Engagement Quests (Master)

| Quest | Action | Points | Purpose |
|-------|--------|--------|---------|
| Referral Champion | 3 successful referrals | 500 | Growth |
| Review Writer | Write testimonial | 300 | Social proof |
| Regular Shipper | 5+ shipments | 1000 | Retention |
| Community Helper | Answer forum question | 200 | Community |

### 6.4 Quiz System

```typescript
// data/importQuiz.ts

export const IMPORT_QUIZ = [
  {
    id: 1,
    question: "Quel document est obligatoire pour importer au Mali?",
    options: [
      "Passeport",
      "Facture commerciale",
      "Certificat de mariage",
      "Permis de conduire"
    ],
    correctAnswer: 1,
    explanation: "La facture commerciale est requise par la douane malienne.",
    difficulty: 'easy',
  },
  {
    id: 2,
    question: "Quel est le délai moyen d'expédition maritime Chine-Mali?",
    options: ["3-5 jours", "15-20 jours", "45-60 jours", "6 mois"],
    correctAnswer: 2,
    explanation: "Le fret maritime prend généralement 45-60 jours port à port.",
    difficulty: 'medium',
  },
  // ... more questions
] as const;

// components/QuestQuiz.tsx
// Interactive quiz with:
// - Progress indicator
// - Immediate feedback
// - Explanation on wrong answers
// - Retry option
// - Points awarded on completion
```

### 6.5 Technical Implementation

```typescript
// types/quests.ts

interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'beginner' | 'expert' | 'master';
  points: number;
  actionType: QuestActionType;
  requirements?: QuestRequirements;
  isRepeatable: boolean;
  cooldownDays?: number;
}

type QuestActionType = 
  | 'profile_complete'
  | 'content_view'
  | 'video_watch'
  | 'calculator_use'
  | 'quiz_complete'
  | 'referral_complete'
  | 'review_write'
  | 'shipment_complete';

interface UserQuestProgress {
  questId: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  progress: number; // 0-100
  completedAt?: Date;
  timesCompleted: number;
}

// store/useQuestStore.ts
export const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      quests: [],
      progress: {},
      currentCategory: 'beginner',
      
      trackAction: async (actionType: QuestActionType, metadata?: any) => {
        // Find quests that match this action
        const matchingQuests = get().quests.filter(
          q => q.actionType === actionType && 
               (q.isRepeatable || get().progress[q.id]?.status !== 'completed')
        );
        
        for (const quest of matchingQuests) {
          await get().updateQuestProgress(quest.id, metadata);
        }
      },
      
      updateQuestProgress: async (questId: string, metadata?: any) => {
        // API call to update progress
        const response = await fetch('/api/quests/progress', {
          method: 'POST',
          body: JSON.stringify({ questId, metadata }),
        });
        
        const result = await response.json();
        
        if (result.completed) {
          // Trigger celebration
          useAnimationStore.getState().triggerConfetti();
          
          // Check for category unlock
          get().checkCategoryUnlock();
        }
        
        set(state => ({
          progress: { ...state.progress, [questId]: result.progress }
        }));
      },
      
      checkCategoryUnlock: () => {
        const { progress, quests } = get();
        
        // Check if all beginner quests completed
        const beginnerQuests = quests.filter(q => q.category === 'beginner');
        const allBeginnerDone = beginnerQuests.every(
          q => progress[q.id]?.status === 'completed'
        );
        
        if (allBeginnerDone) {
          set({ currentCategory: 'expert' });
          // Show unlock notification
        }
      },
    }),
    { name: 'quest-storage' }
  )
);
```

### 6.6 Cultural Adaptations

| Element | Adaptation |
|---------|------------|
| **Content Language** | Simple French, avoid jargon, use visuals |
| **Examples** | Phones, fabrics, spare parts (common imports) |
| **Video Length** | Max 3 minutes (data/bandwidth consideration) |
| **Quiz Difficulty** | Start very easy, gradually increase |
| **Rewards** | Immediate points + badges, not delayed |

### 6.7 Anti-Gaming Measures

| Threat | Prevention |
|--------|------------|
| Skipping videos | Require min watch time (tracked) |
| Quiz retakes | Limit to 3 attempts, 24h cooldown |
| Bot completion | Human verification for large point batches |

### 6.8 Expected Impact

| Metric | Expected Change |
|--------|-----------------|
| Customer knowledge | +70% (reduces support tickets) |
| Feature adoption | +50% (guided discovery) |
| Support ticket volume | -30% (self-service education) |
| Customer confidence | +40% (knowledge = trust) |

---

## 7. Feature 6: Live Social Proof

### 7.1 Concept Overview

Real-time activity notifications and social proof elements that create FOMO (fear of missing out) and establish trust through visibility of other customers' actions.

### 7.2 Notification Types

```
┌─────────────────────────────────────────────────────────────────┐
│  TOAST NOTIFICATIONS (Bottom-Left)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────────────────┐  ← Slides in       │
│  │  📦 Ousmane de Bamako vient de        │     from left      │
│  │     réserver un envoi maritime!        │                    │
│  │     Il y a 2 minutes                   │                    │
│  └────────────────────────────────────────┘                    │
│                                                                 │
│  ┌────────────────────────────────────────┐                    │
│  │  ⭐ Fatima a reçu 5★ pour son envoi    │                    │
│  │     "Service impeccable, colis arrivé  │                    │
│  │      en avance!"                       │                    │
│  │     Il y a 5 minutes                   │                    │
│  └────────────────────────────────────────┘                    │
│                                                                 │
│  ┌────────────────────────────────────────┐                    │
│  │  🚨 Places limitées: Route Shanghai   │                    │
│  │     → Bamako - Plus que 3 places ce   │                    │
│  │     mois-ci!                           │                    │
│  └────────────────────────────────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 Activity Feed (Sidebar/Widget)

```
┌─────────────────────────────────┐
│  🔥 ACTIVITÉ EN DIRECT          │
├─────────────────────────────────┤
│                                 │
│  👥 23 personnes consultent     │
│     cette page maintenant       │
│                                 │
│  ─────────────────────────────  │
│                                 │
│  Derniers envois:               │
│  • 📦 Bamako → Shanghai         │
│     12kg électronique           │
│     Il y a 3 min                │
│                                 │
│  • 📦 Dakar → Shenzhen          │
│     45kg textiles               │
│     Il y a 7 min                │
│                                 │
│  • 📦 Abidjan → Guangzhou       │
│     8kg pièces auto             │
│     Il y a 12 min               │
│                                 │
│  ─────────────────────────────  │
│                                 │
│  🎉 Nouveaux clients aujourd'hui│
│  +47 inscriptions!              │
│                                 │
└─────────────────────────────────┘
```

### 7.4 FOMO Elements

| Element | Trigger | Message |
|---------|---------|---------|
| **Limited Capacity** | Route nearing full | "Plus que X places ce mois!" |
| **Price Increase** | Seasonal rate change | "Tarifs augmentent dans X jours" |
| **Recent Booking** | Similar route booked | "Quelqu'un vient de réserver la même route" |
| **Popular Route** | High demand | "Route très demandée - Réservez vite" |
| **Last Shipment** | Customer inactive | "Votre dernier envoi date de X mois" |

### 7.5 Technical Implementation

```typescript
// services/socialProofService.ts

interface SocialProofEvent {
  id: string;
  type: 'booking' | 'delivery' | 'review' | 'signup' | 'view';
  user: {
    name: string; // First name + initial
    city: string;
    avatar?: string;
  };
  details: {
    route?: string;
    weight?: number;
    category?: string;
    rating?: number;
  };
  timestamp: Date;
}

// Mock data generator for demo/initial phase
// In production, this connects to real-time events
const MOCK_EVENTS: SocialProofEvent[] = [
  {
    id: '1',
    type: 'booking',
    user: { name: 'Amadou T.', city: 'Bamako' },
    details: { route: 'Shanghai → Bamako', weight: 25, category: 'électronique' },
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  // ... more events
];

// hooks/useSocialProof.ts
export function useSocialProof() {
  const [events, setEvents] = useState<SocialProofEvent[]>([]);
  const [viewerCount, setViewerCount] = useState(0);
  
  useEffect(() => {
    // Connect to WebSocket or polling for real-time updates
    const socket = new WebSocket('wss://api.chinalinkexpress.com/social-proof');
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'event') {
        setEvents(prev => [data.payload, ...prev].slice(0, 10));
        showToast(data.payload);
      }
      
      if (data.type === 'viewers') {
        setViewerCount(data.count);
      }
    };
    
    return () => socket.close();
  }, []);
  
  // Fallback: Generate realistic mock events if no real data
  useEffect(() => {
    const interval = setInterval(() => {
      if (events.length < 5) {
        const mockEvent = generateMockEvent();
        setEvents(prev => [mockEvent, ...prev].slice(0, 10));
        showToast(mockEvent);
      }
    }, 30000 + Math.random() * 60000); // Random 30-90s interval
    
    return () => clearInterval(interval);
  }, []);
  
  return { events, viewerCount };
}

// components/SocialProofToast.tsx
export function SocialProofToast({ event }: { event: SocialProofEvent }) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="social-proof-toast"
    >
      {event.type === 'booking' && (
        <>
          <span className="icon">📦</span>
          <div>
            <strong>{event.user.name}</strong> de {event.user.city}
            <br />
            <span>vient de réserver un envoi {event.details.category}</span>
            <br />
            <small>{formatRelativeTime(event.timestamp)}</small>
          </div>
        </>
      )}
      {/* ... other event types */}
    </motion.div>
  );
}

// components/ViewerCounter.tsx
export function ViewerCounter() {
  const { viewerCount } = useSocialProof();
  
  return (
    <div className="viewer-counter">
      <span className="pulse-dot" />
      <span>{viewerCount} personnes consultent cette page</span>
    </div>
  );
}
```

### 7.6 Cultural Adaptations

| Element | Adaptation |
|---------|------------|
| **Names** | Mix of common Malian names (Amadou, Fatima, Moussa, etc.) |
| **Cities** | Bamako, Abidjan, Dakar, Ouagadougou, Lomé, Conakry |
| **Products** | Phones, fabrics, auto parts, construction materials |
| **Timing** | Respect prayer times, avoid notifications during Jumu'a |
| **Language** | Use "quelqu'un" not "un client" for community feel |

### 7.7 Privacy & Ethics

| Principle | Implementation |
|-----------|----------------|
| **Anonymization** | Only first name + initial, no full names |
| **City only** | No specific addresses or neighborhoods |
| **Opt-out** | Users can disable their activity from showing |
| **Truthfulness** | Never fabricate events - use real or nothing |
| **Frequency** | Max 1 toast per minute to avoid annoyance |

### 7.8 Expected Impact

| Metric | Expected Change |
|--------|-----------------|
| Conversion rate | +15-20% (social proof effect) |
| Time on site | +40% (watching notifications) |
| Trust score | +30% (activity = legitimacy) |
| Urgency response | +25% (FOMO on limited capacity) |

---

## 8. Technical Architecture

### 8.1 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 15)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   React     │  │   Zustand   │  │   Framer    │             │
│  │ Components  │  │   Stores    │  │   Motion    │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         └────────────────┼────────────────┘                     │
│                          │                                      │
│              ┌───────────┴───────────┐                         │
│              │   Gamification SDK    │                         │
│              │  (Unified interface)  │                         │
│              └───────────┬───────────┘                         │
│                          │                                      │
└──────────────────────────┼──────────────────────────────────────┘
                           │ API / WebSocket
┌──────────────────────────┼──────────────────────────────────────┐
│                          ▼                                      │
│                    BACKEND (API Layer)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Points    │  │   Quest     │  │   Referral  │             │
│  │   Engine    │  │   System    │  │   Tracker   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Anti-Fraud │  │   Social    │  │   Analytics │             │
│  │   Service   │  │   Proof     │  │   Pipeline  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────┐
│                          ▼                                      │
│                    DATA LAYER                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  PostgreSQL │  │    Redis    │  │   Queue     │             │
│  │  (Primary)  │  │   (Cache)   │  │  (BullMQ)   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Database Schema

```sql
-- Core gamification tables

CREATE TABLE loyalty_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  current_points INTEGER DEFAULT 0,
  lifetime_points INTEGER DEFAULT 0,
  tier VARCHAR(20) DEFAULT 'bronze',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES loyalty_accounts(id),
  type VARCHAR(20) CHECK (type IN ('earned', 'redeemed', 'expired', 'bonus')),
  amount INTEGER NOT NULL,
  description TEXT,
  reference_id VARCHAR(100),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE referral_trees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id),
  referred_id UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending',
  points_awarded INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  converted_at TIMESTAMP
);

CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  category VARCHAR(20) NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  points INTEGER NOT NULL,
  is_repeatable BOOLEAN DEFAULT false,
  cooldown_days INTEGER
);

CREATE TABLE user_quest_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  quest_id UUID REFERENCES quests(id),
  status VARCHAR(20) DEFAULT 'available',
  progress INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  times_completed INTEGER DEFAULT 0
);

CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  badge_id VARCHAR(50) NOT NULL,
  earned_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE shipments (
  -- Existing fields...
  gamification_enabled BOOLEAN DEFAULT true,
  milestone_data JSONB
);
```

### 8.3 State Management Architecture

```typescript
// Unified gamification store
// src/store/useGamificationStore.ts

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

interface GamificationState {
  // Loyalty
  points: number;
  tier: LoyaltyTier;
  tierProgress: number;
  
  // Quests
  quests: Quest[];
  questProgress: Record<string, QuestProgress>;
  
  // Referrals
  referralCode: string;
  referralCount: number;
  referralPoints: number;
  
  // Badges
  badges: Badge[];
  
  // Actions
  addPoints: (amount: number, source: string) => void;
  redeemPoints: (amount: number, reward: string) => Promise<boolean>;
  completeQuest: (questId: string) => void;
  trackEvent: (event: GamificationEvent) => void;
}

export const useGamificationStore = create<GamificationState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // ... state
        
        trackEvent: (event) => {
          // Central event tracking that triggers:
          // 1. Quest progress updates
          // 2. Point calculations
          // 3. Milestone checks
          // 4. Badge evaluations
          
          const { questProgress } = get();
          
          // Check quests
          Object.values(questProgress).forEach(progress => {
            if (progress.quest.actionType === event.type) {
              get().updateQuestProgress(progress.quest.id, event);
            }
          });
          
          // Sync with server
          syncEvent(event);
        },
      }),
      {
        name: 'gamification-storage',
        partialize: (state) => ({
          points: state.points,
          tier: state.tier,
          badges: state.badges,
        }),
      }
    )
  )
);

// Cross-store synchronization
useGamificationStore.subscribe(
  (state) => state.points,
  (points) => {
    // Notify other stores
    useUIStore.getState().showPointsUpdate(points);
  }
);
```

### 8.4 API Endpoints

```typescript
// API Route structure

// /api/gamification/points
//   GET  - Get current points balance
//   POST - { action: 'earn' | 'redeem', amount, source }

// /api/gamification/quests
//   GET  - List all quests with progress
//   POST - { questId, action: 'start' | 'progress' | 'complete' }

// /api/gamification/referrals
//   GET    - Get referral tree
//   POST   - Generate referral code
//   DELETE - Deactivate referral

// /api/gamification/badges
//   GET - List earned badges

// /api/gamification/shipments/:id/milestones
//   GET - Get milestone status for shipment

// /api/social-proof/events
//   WebSocket - Real-time event stream
//   GET       - Recent events (polling fallback)
```

### 8.5 Performance Optimizations

| Strategy | Implementation |
|----------|----------------|
| **Optimistic Updates** | Update UI immediately, sync in background |
| **Debouncing** | Batch rapid events (e.g., scroll tracking) |
| **Lazy Loading** | Load gamification UI only when visible |
| **CDN Caching** | Static quest data, badge images cached |
| **WebSocket** | Real-time features use efficient WebSocket |
| **Offline Support** | Queue actions when offline, sync on reconnect |

---

## 9. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)

| Task | Priority | Complexity |
|------|----------|------------|
| Database schema setup | High | Medium |
| Points engine API | High | Medium |
| Basic loyalty dashboard | High | Medium |
| User authentication | High | Low |
| Anti-fraud baseline | High | High |

### Phase 2: Core Features (Weeks 3-6)

| Task | Priority | Complexity |
|------|----------|------------|
| Shipment progress gamification | High | High |
| CLINK Points system | High | Medium |
| Tier system | High | Medium |
| Basic quest system | Medium | Medium |
| Badge system | Medium | Low |

### Phase 3: Growth Features (Weeks 7-10)

| Task | Priority | Complexity |
|------|----------|------------|
| Referral program | High | High |
| Referral tree visualization | Medium | High |
| Import calculator | High | Medium |
| Share-to-unlock | Medium | Medium |

### Phase 4: Engagement (Weeks 11-14)

| Task | Priority | Complexity |
|------|----------|------------|
| Educational quests | Medium | Medium |
| Quiz system | Low | Medium |
| Social proof notifications | Medium | Medium |
| Live activity feed | Low | High |

### Phase 5: Optimization (Weeks 15-16)

| Task | Priority | Complexity |
|------|----------|------------|
| Performance optimization | High | Medium |
| A/B testing setup | Medium | Medium |
| Analytics dashboard | Medium | High |
| Anti-gaming refinement | High | High |

---

## 10. Success Metrics & KPIs

### 10.1 Primary Metrics

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| **Customer Acquisition Cost** | Current | -40% | Marketing spend / new customers |
| **Customer Lifetime Value** | Current | +45% | Total revenue / customers |
| **Repeat Purchase Rate** | Current | +60% | % customers with 2+ shipments |
| **Referral Rate** | 0% | 15% | % customers who refer |
| **NPS Score** | Current | +20 points | Survey |

### 10.2 Feature-Specific Metrics

| Feature | KPI | Target |
|---------|-----|--------|
| Shipment Gamification | Tracking page visits/shipment | 5x |
| Loyalty Program | Points redemption rate | 70% |
| Referral Program | Viral coefficient | 0.3 |
| Calculator | Quote requests | +80% |
| Quests | Quest completion rate | 60% |
| Social Proof | Conversion lift | +15% |

### 10.3 Engagement Metrics

| Metric | Target |
|--------|--------|
| Daily Active Users | +50% |
| Session Duration | +40% |
| Pages per Session | +30% |
| Return Visit Rate | +45% |
| Feature Adoption (gamification) | 70% |

### 10.4 Tracking Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  GAMIFICATION ANALYTICS DASHBOARD                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  POINTS ECONOMY                                                 │
│  Points Issued: 1,245,000  |  Points Redeemed: 890,000 (71%)   │
│  Points Expired: 45,000    |  Avg Balance: 1,250 pts           │
│                                                                 │
│  REFERRAL FUNNEL                                                │
│  Invites Sent: 3,450 → Signups: 890 (25.8%) → Active: 445 (50%)│
│  Top Referrer: Amadou T. (45 referrals, 12 active)             │
│                                                                 │
│  QUEST COMPLETION                                               │
│  Onboarding: 78% | Expert: 45% | Master: 23%                   │
│  Most Popular: "First Shipment" | Least: "Write Review"         │
│                                                                 │
│  ANTI-FRAUD ALERTS                                              │
│  Suspicious accounts flagged: 23 | Confirmed fraud: 3           │
│  Blocked points: 12,500 | Chargeback prevented: 890,000 FCFA   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 11. Conclusion

This gamification system transforms ChinaLink Express into a memorable, engaging platform that leverages psychological principles tailored to the West African market. By combining:

- **Progress visualization** (shipment journey)
- **Social connection** (referral tree)
- **Status achievement** (loyalty tiers)
- **Educational engagement** (quests)
- **Social proof** (live notifications)
- **Value demonstration** (savings calculator)

ChinaLink Express will differentiate from competitors and build lasting customer relationships based on trust, engagement, and mutual value.

---

*Document Version: 1.0*
*Last Updated: 2026-02-26*
*Author: ChinaLink Express Product Team*
