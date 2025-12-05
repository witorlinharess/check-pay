export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  installments: number;
  pricePerInstallment: number;
  features: string[];
  highlight?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface PersonalData {
  fullName: string;
  email: string;
  emailConfirmation: string;
  phone: string;
  cpf: string;
}

export interface CardInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  installments: string;
}

export interface CheckoutState {
  subscription: Subscription | null;
  personalData: PersonalData;
  cardInfo: CardInfo;
  selectedPaymentMethod: string;
  total: number;
}
