/**
 * Share Shipment Page Types
 *
 * TypeScript interfaces matching the backend ShareController response.
 */

export interface SharedShipmentTimelineItem {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

export interface SharedShipmentGoods {
  goodsId: string;
  description?: string;
  category?: string;
  dimensions?: { length: number; width: number; height: number };
  weightKg?: number;
  cbm?: number;
  quantity?: number;
  status: string;
  shippingMode: string;
  receivedAt?: string;
  warehouseLocation?: string;
  container?: {
    virtualContainerNumber?: string;
    shippingLine?: string;
    status?: string;
  } | null;
  airwayBill?: {
    awbNumber?: string;
    airline?: string;
    status?: string;
  } | null;
}

export interface SharedShipmentContainer {
  containerNumber: string;
  shippingLine?: string;
  status: string;
  shippingMode: string;
  origin?: string;
  destination?: string;
  timeline?: Record<string, string>;
  goodsCount: number;
  goods: Array<{
    goodsId: string;
    description?: string;
    status: string;
  }>;
}

export interface SharedShipmentOrder {
  orderId: string;
  status: string;
  shippingMode: string;
  destinationCountry?: string;
  shipmentLine?: string;
  createdAt: string;
  currentStatus?: string;
  packageWeight?: string;
  quantity?: string;
  goodsCount: number;
  goods: Array<{
    goodsId: string;
    description?: string;
    status: string;
  }>;
}

export type SharedShipmentData = SharedShipmentGoods | SharedShipmentContainer | SharedShipmentOrder;

export interface SharedShipmentResult {
  type: 'goods' | 'container' | 'order';
  data: SharedShipmentData;
  currentStatus: string;
  timeline: SharedShipmentTimelineItem[];
  estimatedDelivery?: string;
  sharedAt: string;
}

export interface PlatformInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isDesktop: boolean;
}

export const TYPE_LABELS: Record<string, string> = {
  goods: 'Marchandise',
  container: 'Container',
  order: 'Commande',
};

export const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  RECEIVED_AT_WAREHOUSE: { color: '#6366F1', bg: '#EEF2FF', label: 'Reçu à l\'entrepôt' },
  PACKED: { color: '#3B82F6', bg: '#EFF6FF', label: 'Emballé' },
  ASSIGNED_TO_CONTAINER: { color: '#3B82F6', bg: '#EFF6FF', label: 'Assigné au container' },
  LOADED_IN_CONTAINER: { color: '#0EA5E9', bg: '#F0F9FF', label: 'Chargé' },
  IN_TRANSIT: { color: '#F59E0B', bg: '#FFFBEB', label: 'En Transit' },
  ARRIVED_DESTINATION: { color: '#10B981', bg: '#ECFDF5', label: 'Arrivé' },
  READY_FOR_PICKUP: { color: '#059669', bg: '#ECFDF5', label: 'Prêt pour retrait' },
  DELIVERED: { color: '#059669', bg: '#ECFDF5', label: 'Livré' },
  BOOKED: { color: '#6366F1', bg: '#EEF2FF', label: 'Réservé' },
  LOADING: { color: '#3B82F6', bg: '#EFF6FF', label: 'Chargement' },
  LOADED: { color: '#0EA5E9', bg: '#F0F9FF', label: 'Chargé' },
  ARRIVED: { color: '#10B981', bg: '#ECFDF5', label: 'Arrivé' },
  DISCHARGED: { color: '#10B981', bg: '#ECFDF5', label: 'Déchargé' },
  Pending: { color: '#6B7280', bg: '#F3F4F6', label: 'En Attente' },
  Active: { color: '#F59E0B', bg: '#FFFBEB', label: 'Actif' },
  Delivered: { color: '#059669', bg: '#ECFDF5', label: 'Livré' },
  Cancelled: { color: '#EF4444', bg: '#FEF2F2', label: 'Annulé' },
};

export function getStatusConfig(status: string) {
  return STATUS_CONFIG[status] || { color: '#6B7280', bg: '#F3F4F6', label: status };
}
