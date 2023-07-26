import React, { FC } from 'react';
import styles from './MyButton.module.css';

interface MyButtonProps {
  children: string,
  onMouseDown?: () => void,
  onMouseUp?: () => void,
  onClick?: () => void,
  style?: {
    [key: string]: string;
  },
}
const MyButton: FC<MyButtonProps> = ({children, ...props}) => {
  return (
    <button {...props} className={styles.myBtn}>
      {children}
    </button>
  );
};

export default MyButton;
