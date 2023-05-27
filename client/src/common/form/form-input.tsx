import { InputHTMLAttributes } from 'react';

import styles from './form-input.module.css';

export const FormInput = (props: Props) => {
    const { error, className, ...inputProps } = props;

    return (
        <div className={className}>
            <input {...inputProps} className={styles.input} />
            <div className={error ? styles.errorVisible : styles.errorHidden}>
                <span className={styles.errorMessage}>{error}</span>
            </div>
        </div>
    );
};

type Props = InputHTMLAttributes<HTMLInputElement> & { error?: string };
