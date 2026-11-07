export type ItemStatus = 'allowed' | 'restricted' | 'prohibited' | 'permit-required';

export interface DangerousGoodsItem {
  id: string;
  name: string;
  nameFr: string;
  nameZh: string;
  nameAr: string;
  category: string;
  categoryFr: string;
  categoryZh: string;
  categoryAr: string;
  status: ItemStatus;
  description: string;
  descriptionFr: string;
  descriptionZh: string;
  descriptionAr: string;
  notes?: string;
  notesFr?: string;
  notesZh?: string;
  notesAr?: string;
  icon: string;
}

export interface StatusConfig {
  status: ItemStatus;
  label: string;
  labelFr: string;
  labelZh: string;
  labelAr: string;
  color: string;
  bgColor: string;
  icon: string;
  description: string;
  descriptionFr: string;
  descriptionZh: string;
  descriptionAr: string;
}
