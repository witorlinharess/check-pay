'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  products: Product[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  subtotal,
  shipping,
  tax,
  total,
}) => {
  return (
    <Card>
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-3xl">🛒</span>
          Resumo do Pedido
        </h2>
      </div>
      
      <div className="space-y-4 mb-6">
        {products.map((product) => (
          <div key={product.id} className="flex gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center overflow-hidden shadow-md">
              <span className="text-3xl">📦</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600">Quantidade: <span className="font-medium">{product.quantity}</span></p>
              <p className="text-blue-600 font-bold mt-1 text-lg">
                R$ {product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span className="font-medium">Frete</span>
          <span className="font-semibold">R$ {shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span className="font-medium">Impostos</span>
          <span className="font-semibold">R$ {tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold">
          <span className="text-gray-800">Total</span>
          <span className="text-blue-600 text-2xl">R$ {total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
        <p className="text-sm text-green-800 flex items-center gap-2">
          <span className="text-xl">✅</span>
          <span>Frete grátis em compras acima de R$ 200</span>
        </p>
      </div>
    </Card>
  );
};
