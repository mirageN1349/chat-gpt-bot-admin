type Props = {
  title?: string;
};

export function Header({ title }: Props) {
  return (
    <header className="w-full px-10 h-16 bg-white dark:bg-gray-900">
      <div className="h-full flex items-center mx-auto w-[calc(100%-32px)] max-w-[1200px]">
        <div className="font-bold text-2xl text-gray-900 dark:text-white">
          {title}
        </div>
      </div>
    </header>
  );
}
