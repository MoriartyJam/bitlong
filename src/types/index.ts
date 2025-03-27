
export interface Establishment {
  id: string;
  name: string;
  address: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  establishmentId: string;
  employeeId: string;
  productId?: string;
  quantity?: number;
  type: 'delivery' | 'payment';
  amount: number;
  date: string;
  paymentStatus: 'paid' | 'credit';
  notes?: string;
  createdAt: string;
}

export type EstablishmentWithTransactions = Establishment & {
  transactions: Transaction[];
  balance: number;
};

export interface Employee {
  id: string;
  employeeNumber: string;
  name: string;
  email: string;
  mobile: string;
  phone?: string;
  address: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  productId: string;
  title: string;
  description?: string;
  category: string;
  quantity: number;
  lowStockLimit: number;
  sellingUnitPrice: number;
  buyingUnitPrice: number;
  createdAt: string;
  updatedAt: string;
}
