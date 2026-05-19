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

export interface StatusConfig {
  color: string;
  bg: string;
  label: string;
  icon: string;
}

export const STATUS_CONFIG: Record<string, StatusConfig> = {
  RECEIVED_AT_WAREHOUSE: { color: '#D97706', bg: '#FEF3C7', label: 'Reçu à l\'entrepôt', icon: 'Warehouse' },
  PACKED:               { color: '#2563EB', bg: '#DBEAFE', label: 'Emballé', icon: 'Package' },
  ASSIGNED_TO_CONTAINER:{ color: '#2563EB', bg: '#DBEAFE', label: 'Assigné au container', icon: 'Package' },
  LOADED_IN_CONTAINER:  { color: '#4F46E5', bg: '#E0E7FF', label: 'Chargé', icon: 'Ship' },
  IN_TRANSIT:           { color: '#2563EB', bg: '#DBEAFE', label: 'En transit', icon: 'Ship' },
  ARRIVED_DESTINATION:  { color: '#0D9488', bg: '#CCFBF1', label: 'Arrivé à destination', icon: 'MapPin' },
  READY_FOR_PICKUP:     { color: '#9333EA', bg: '#F3E8FF', label: 'Prêt pour retrait', icon: 'PackageCheck' },
  DELIVERED:            { color: '#059669', bg: '#D1FAE5', label: 'Livré', icon: 'CheckCircle2' },
  BOOKED:               { color: '#D97706', bg: '#FEF3C7', label: 'Réservé', icon: 'Warehouse' },
  LOADING:              { color: '#2563EB', bg: '#DBEAFE', label: 'Chargement', icon: 'Ship' },
  LOADED:               { color: '#4F46E5', bg: '#E0E7FF', label: 'Chargé', icon: 'Ship' },
  ARRIVED:              { color: '#0D9488', bg: '#CCFBF1', label: 'Arrivé', icon: 'MapPin' },
  DISCHARGED:           { color: '#0D9488', bg: '#CCFBF1', label: 'Déchargé', icon: 'MapPin' },
  Pending:              { color: '#6B7280', bg: '#F3F4F6', label: 'En attente', icon: 'Clock' },
  Active:               { color: '#2563EB', bg: '#DBEAFE', label: 'Actif', icon: 'Ship' },
  Delivered:            { color: '#059669', bg: '#D1FAE5', label: 'Livré', icon: 'CheckCircle2' },
  Cancelled:            { color: '#EF4444', bg: '#FEF2F2', label: 'Annulé', icon: 'AlertTriangle' },
};

export function getStatusConfig(status: string): StatusConfig {
  return STATUS_CONFIG[status] || { color: '#6B7280', bg: '#F3F4F6', label: status, icon: 'HelpCircle' };
}
