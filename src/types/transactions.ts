export interface TransactionProps {
  id: string;
  date: string;
  role: string;
  buyer: string;
  seller: string;
  broker?: string;
  amount: number;
  currency: string;
  status: string;
  notes: string;
}
export interface TransactionItemProps {
  id: string;
  title: string;
  description: string;
  category: string;
  quantity: number;
  date: string;
  unitPrice: number;
  amount: number;
  currency: string;
  status: string;
  brokerFee?: number;
  role: string;
}

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

export interface RoleTransactionProps {
  id: string;
  date: string;
  role: "buyer" | "seller" | "broker";
  buyer: UserDetails;
  seller: UserDetails;
  broker?: UserDetails;
  amount: number;
  currency: string;
  status: string;
  notes: string;
}

export interface EditTransactionProps {
  id: string;
  transactionName?: string;
  escrowFee?: string;
  brokerFee?: string;
  sellerName?: string;
  sellerEmail?: string;
  type: "seller" | "broker";
  items?: [];
}
