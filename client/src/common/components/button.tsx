import { ButtonHTMLAttributes } from 'react';

import styles from './button.module.css';

export const Button = (props: Props) => {
    const { fullWidth, children, className, ...buttonProps } = props;
    return (
        <button {...buttonProps} className={`${styles.button} ${fullWidth && styles.fullWidth} ${className || ''}`}>
            {children}
        </button>
    );
};

type Props = { fullWidth?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>;
