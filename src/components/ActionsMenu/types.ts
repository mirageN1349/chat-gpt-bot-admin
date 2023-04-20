export type Action = {
  title: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};
