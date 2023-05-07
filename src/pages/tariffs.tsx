import Button from '../components/Button';
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
    <>
      <header className="mb-10 flex items-center justify-between">
        <div className="text-2xl font-medium">Тарифы: {tariffs.length}</div>
        <Button type="button" className="flex items-center">
          <BsPlus className="w-6 h-6" />
          Создать
        </Button>
      </header>

      <div className="mt-4 grid gap-4 grid-cols-3">
        {tariffs.map((tariff, index) => (
          <TariffCard
            key={index}
            title={tariff.title}
            description={tariff.description}
            price={tariff.price}
          />
        ))}
      </div>
    </>
  );
}
