import { useRef } from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

export type OnClick = () => void;

type ArrowButtonProps = {
  onClick: () => void;
  isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
  const arrowRef = useRef<HTMLDivElement>(null);

  return (
    <div
      role='button'
      aria-label='Toggle sidebar visibility'
      tabIndex={0}
      className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
      onClick={onClick}
    >
      <img
        src={arrow}
        alt='arrow icon'
        className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
      />
    </div>
  );
};