export interface PaymentMethodProps {
  id: string;
  account_number: string;
  account_name: string;
  cbn_code: string;
  bank_name: string;
  is_prefered: boolean;
  created_at: string;
  updated_at: string;
  partner_id: string;
}

export interface PaymentMethodHistoryProps {
  total_count: number;
  data: PaymentMethodProps[];
}

export interface PayoutRequestProps {
  id: string;
  amount: number;
  partner_id: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  status: string;
  cbn_code: string;
  created_at: string;
  updated_at: string;
  partner: {
    id: string;
    name: string;
  };
}

export interface PayoutRequestHistoryProps {
  data: PayoutRequestProps[];
  total_count: number;
}
export interface TransactionProps {
  id: string;
  amount: number;
  commission: number;
  available_amount: number;
  balance: number;
  payout_balance: number;
  type: number;
  status: string;
  account_number: string;
  account_name: string;
  cbn_code: string;
  bank_name: string;
  partner_id: string;
  client_id: string;
  created_at: string;
  updated_at: string;
  partner: {
    id: string;
    name: string;
  };
}

export interface TransactionHistoryProps {
  data: TransactionProps[];
  total_count: number;
}
