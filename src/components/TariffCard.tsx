import React from 'react';
import { ActionsMenu } from './ActionsMenu';

type Props = {
  title: string;
  description?: string;
  price: number;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function TariffCard({
  title,
  description,
  price,
  onEdit,
  onDelete,
}: Props) {
  const formattedPrice = Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);

  const actions = [
    {
      title: 'Редактировать',
      onClick: onEdit,
    },
    {
      title: 'Удалить',
      onClick: onDelete,
      className: 'text-red-500',
    },
  ];

  return (
    <div className="p-6 transition-all flex flex-col border border-[#ECECEE] rounded-lg justify-between">
      <h5 className="flex w-full items-center justify-between mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {title}
        <ActionsMenu
          className="h-full flex items-center text-gray-500"
          actions={actions}
        />
      </h5>

      {description && (
        <p className="mb-3 font-normal text-[#57595B]">{description}</p>
      )}
      <div className="w-fit px-3 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg">
        {formattedPrice}
      </div>
    </div>
  );
}
