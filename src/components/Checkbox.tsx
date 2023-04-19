type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
};

export function Checkbox({ className = '', id, checked, ...props }: Props) {
  return (
    <div
      className={`${className} active:scale-[0.93] transition-all cursor-pointer overflow-hidden bg-white rounded-sm flex items-center justify-center w-4 h-4`}
    >
      <input id={id} className="hidden" type="checkbox" {...props} />
      <label
        htmlFor={id}
        className={`${
          !!checked ? 'bg-blue-500' : 'bg-white'
        } rounded-sm block w-3 h-3 cursor-pointer`}
      />
    </div>
  );
}
