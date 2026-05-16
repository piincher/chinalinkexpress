export type ItemStatus = 'allowed' | 'restricted' | 'prohibited' | 'permit-required';

export interface DangerousGoodsItem {
  id: string;
  name: string;
  nameFr: string;
  category: string;
  categoryFr: string;
  status: ItemStatus;
  description: string;
  descriptionFr: string;
  notes?: string;
  notesFr?: string;
  icon: string;
}

export interface StatusConfig {
  status: ItemStatus;
  label: string;
  labelFr: string;
  color: string;
  bgColor: string;
  icon: string;
  description: string;
  descriptionFr: string;
}
