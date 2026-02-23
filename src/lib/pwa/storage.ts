/**
 * PWA Storage Utilities
 * 
 * IndexedDB wrapper for offline data persistence.
 * Stores calculator data, pricing info, and user preferences.
 */

const DB_NAME = 'ChinaLinkExpressDB';
const DB_VERSION = 1;

// Store names
const STORES = {
  CALCULATOR: 'calculator',
  PRICING: 'pricing',
  USER_PREFS: 'userPreferences',
  CONTACT_FORM: 'contactForm',
  SHIPMENTS: 'shipments',
} as const;

interface CalculatorData {
  id: string;
  type: 'air' | 'sea';
  inputs: Record<string, number | string>;
  result: Record<string, unknown>;
  timestamp: number;
}

interface UserPreferences {
  id: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  lastVisited: string;
}

interface PendingContactForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: number;
  synced: boolean;
}

// Open database connection
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Calculator store
      if (!db.objectStoreNames.contains(STORES.CALCULATOR)) {
        const calcStore = db.createObjectStore(STORES.CALCULATOR, { keyPath: 'id' });
        calcStore.createIndex('timestamp', 'timestamp', { unique: false });
        calcStore.createIndex('type', 'type', { unique: false });
      }

      // Pricing store
      if (!db.objectStoreNames.contains(STORES.PRICING)) {
        const pricingStore = db.createObjectStore(STORES.PRICING, { keyPath: 'id' });
        pricingStore.createIndex('category', 'category', { unique: false });
      }

      // User preferences store
      if (!db.objectStoreNames.contains(STORES.USER_PREFS)) {
        db.createObjectStore(STORES.USER_PREFS, { keyPath: 'id' });
      }

      // Contact form store (for offline submissions)
      if (!db.objectStoreNames.contains(STORES.CONTACT_FORM)) {
        const contactStore = db.createObjectStore(STORES.CONTACT_FORM, { keyPath: 'id' });
        contactStore.createIndex('synced', 'synced', { unique: false });
        contactStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // Shipments store
      if (!db.objectStoreNames.contains(STORES.SHIPMENTS)) {
        const shipmentStore = db.createObjectStore(STORES.SHIPMENTS, { keyPath: 'id' });
        shipmentStore.createIndex('trackingNumber', 'trackingNumber', { unique: true });
        shipmentStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

// Generic get function
async function get<T>(storeName: string, id: string): Promise<T | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

// Generic set function
async function set<T>(storeName: string, data: T): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(data);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Generic get all function
async function getAll<T>(storeName: string): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Generic delete function
async function remove(storeName: string, id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Calculator-specific functions
export const calculatorStorage = {
  async save(calc: CalculatorData): Promise<void> {
    return set(STORES.CALCULATOR, calc);
  },

  async get(id: string): Promise<CalculatorData | null> {
    return get<CalculatorData>(STORES.CALCULATOR, id);
  },

  async getAll(): Promise<CalculatorData[]> {
    return getAll<CalculatorData>(STORES.CALCULATOR);
  },

  async delete(id: string): Promise<void> {
    return remove(STORES.CALCULATOR, id);
  },

  async getRecent(limit: number = 10): Promise<CalculatorData[]> {
    const all = await this.getAll();
    return all
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  },
};

// User preferences functions
export const userPrefsStorage = {
  async save(prefs: UserPreferences): Promise<void> {
    return set(STORES.USER_PREFS, prefs);
  },

  async get(): Promise<UserPreferences | null> {
    return get<UserPreferences>(STORES.USER_PREFS, 'default');
  },

  async update(updates: Partial<UserPreferences>): Promise<void> {
    const current = await this.get() || {
      id: 'default',
      theme: 'system',
      language: 'fr',
      notifications: true,
      lastVisited: new Date().toISOString(),
    };
    return set(STORES.USER_PREFS, { ...current, ...updates });
  },
};

// Contact form offline queue
export const contactFormStorage = {
  async queue(formData: Omit<PendingContactForm, 'id' | 'timestamp' | 'synced'>): Promise<void> {
    const data: PendingContactForm = {
      ...formData,
      id: `contact_${Date.now()}`,
      timestamp: Date.now(),
      synced: false,
    };
    return set(STORES.CONTACT_FORM, data);
  },

  async getPending(): Promise<PendingContactForm[]> {
    const all = await getAll<PendingContactForm>(STORES.CONTACT_FORM);
    return all.filter(item => !item.synced);
  },

  async markAsSynced(id: string): Promise<void> {
    const item = await get<PendingContactForm>(STORES.CONTACT_FORM, id);
    if (item) {
      await set(STORES.CONTACT_FORM, { ...item, synced: true });
    }
  },

  async delete(id: string): Promise<void> {
    return remove(STORES.CONTACT_FORM, id);
  },
};

// Pricing cache
export const pricingStorage = {
  async cacheRates(rates: Record<string, unknown>): Promise<void> {
    return set(STORES.PRICING, {
      id: 'current',
      rates,
      timestamp: Date.now(),
    });
  },

  async getRates(): Promise<Record<string, unknown> | null> {
    const data = await get<{ rates: Record<string, unknown>; timestamp: number }>(
      STORES.PRICING,
      'current'
    );
    return data?.rates || null;
  },

  // Check if cached rates are stale (older than 24 hours)
  async isStale(): Promise<boolean> {
    const data = await get<{ timestamp: number }>(STORES.PRICING, 'current');
    if (!data) return true;
    const ONE_DAY = 24 * 60 * 60 * 1000;
    return Date.now() - data.timestamp > ONE_DAY;
  },
};

// Shipment tracking cache
export const shipmentStorage = {
  async cacheShipment(shipment: Record<string, unknown>): Promise<void> {
    return set(STORES.SHIPMENTS, {
      ...shipment,
      id: shipment.trackingNumber || `shipment_${Date.now()}`,
      timestamp: Date.now(),
    });
  },

  async getShipment(trackingNumber: string): Promise<Record<string, unknown> | null> {
    const all = await getAll<Record<string, unknown> & { trackingNumber: string }>(
      STORES.SHIPMENTS
    );
    return all.find(s => s.trackingNumber === trackingNumber) || null;
  },

  async getAllShipments(): Promise<Record<string, unknown>[]> {
    return getAll(STORES.SHIPMENTS);
  },
};

// Check if IndexedDB is supported
export function isStorageSupported(): boolean {
  return typeof window !== 'undefined' && 'indexedDB' in window;
}

// Clear all data (for logout/reset)
export async function clearAllStorage(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(Object.values(STORES), 'readwrite');
    
    Object.values(STORES).forEach(storeName => {
      const store = transaction.objectStore(storeName);
      store.clear();
    });

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}
