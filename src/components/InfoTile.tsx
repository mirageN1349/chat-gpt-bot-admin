import { ReactNode } from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { ActionsMenu } from './ActionsMenu';

type Props = {
  title: string;
  value: ReactNode;
  percentage?: number;
};

export function InfoTile({ title, value, percentage }: Props) {
  return (
    <div className="p-6 flex border border-[#ECECEE] rounded-lg justify-between">
      <div>
        <div className="text-gray-600 font-medium text-sm">{title}</div>
        <div className="mt-3 text-4xl font-medium">{value}</div>
      </div>
      <div className="h-full flex flex-col justify-between items-end">
        <ActionsMenu
          className="w-6 h-6 flex items-center text-gray-500"
          actions={[
            {
              title: 'Подробнее',
              className: 'hover:text-indigo-600 hover:bg-indigo-600/10',
            },
          ]}
        />
        {percentage && (
          <div
            className={`flex ${
              percentage > 0
                ? 'text-green-700 bg-green-200/50'
                : 'text-red-400 bg-red-200/50'
            } text-xs gap-1 py-1 px-2 items-center rounded-full`}
          >
            <BsArrowUp
              className={`${percentage > 0 ? '' : 'rotate-180'} w-4 h-4`}
            />
            {percentage}%
          </div>
        )}
      </div>
    </div>
  );
}
