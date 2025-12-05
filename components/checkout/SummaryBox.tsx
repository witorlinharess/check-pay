'use client';

import React from 'react';

interface SummaryBoxProps {
  label: string;
  value: string;
}

export const SummaryBox: React.FC<SummaryBoxProps> = ({ label, value }) => {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
        {label}
      </h3>
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-3">
          Todos os preços e condições comerciais estão sujeitos a alteração sem aviso prévio.
        </p>
        <p className="text-sm text-gray-600">
          Se precisar de ajuda com o produto,{' '}
          <a href="#" className="text-blue-600 underline hover:text-blue-700">
            entre em contato com o produtor
          </a>
          .
        </p>
      </div>
      
      <div className="text-center mt-8 pb-4">
        <p className="text-gray-400 text-sm font-medium mb-1">clickmax</p>
        <p className="text-gray-500 text-xs">Protegido por Clickmax</p>
        <p className="text-gray-500 text-xs">© 2025 - Todos os direitos reservados</p>
      </div>
    </div>
  );
};
