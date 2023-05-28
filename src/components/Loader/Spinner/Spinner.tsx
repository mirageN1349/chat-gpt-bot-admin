import styles from './Spinner.module.css';

type Props = {
  className?: string;
  size?: number;
};

export default function Spinner({ className, size = 50 }: Props) {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={`${className ?? ''} ${styles.spinnerLoader}`}
    />
  );
}
