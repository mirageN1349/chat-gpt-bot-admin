import TariffCard from '../components/TariffCard';
import { BsPlus } from 'react-icons/bs';

const tariffs = [
  {
    title: 'Тариф Тестовый',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, perferendis?',
    price: 500,
  },
  {
    title: 'Тариф Все включено',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, perferendis?',
    price: 1500,
  },
];

export function TariffsPage() {
  return (
    <div className="w-full">
      <header className="mb-10 flex items-center justify-between">
        <div className="text-2xl font-medium">Тарифы: {tariffs.length}</div>
        <button className="flex px-4 py-2 active:scale-95 transition-all  gap-2 hover:bg-indigo-500 rounded-lg bg-indigo-600 text-white items-center">
          <BsPlus className="w-6 h-6" /> Создать
        </button>
      </header>

      <div className="mt-4 grid gap-4 grid-cols-3">
        {tariffs.map((tariff, id) => (
          <TariffCard
            title={tariff.title}
            description={tariff.description}
            price={tariff.price}
          />
        ))}
      </div>
    </div>
  );
}
