import { Graph } from '../../components/Graph';

export function UsersStatistics() {
  return (
    <div className="w-full">
      <h3 className="text-xl my-5 font-medium">Всего пользователей</h3>
      <Graph
        config={{
          type: 'line',
          data: {
            labels: [
              '01.05.2023',
              '02.05.2023',
              '03.05.2023',
              '04.05.2023',
              '05.05.2023',
              '06.05.2023',
              '07.05.2023',
            ],
            datasets: [
              {
                label: 'Количество пользователей',
                data: [1563, 1576, 1586, 1598, 1620, 1635, 1644],
                fill: true,
                borderColor: '#4f46e544',
                backgroundColor: '#4f46e544',
                tension: 0.3,
              },
            ],
          },
        }}
      />
    </div>
  );
}
