export interface AggregatePayment {
  routing_number: string;      // 9 digit routing number, as a string because of leading zeroes
  bank_account_number: string; // bank account number, as a string
  name: string;                // payee's name
  amount: number;              // aggregate amount of all payments to payee, in cents
}
export interface ParsedPIF {
  amount: number;             // sum of all payment amounts in the PIF, in cents
  count: number;              // number of aggregate payments in the PIF
  date: string;               // YYYYMMDD format, from the PIF
  payments: AggregatePayment[];
}