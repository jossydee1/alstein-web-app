export interface PaymentMethodsHistoryProps {
  total_count: number;
  data: unknown[];
}

export interface BankDetailsProps {
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

export interface BankDetailsHistoryProps {
  total_count: number;
  data: BankDetailsProps[];
}
