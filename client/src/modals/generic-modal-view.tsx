import React, { useRef } from 'react';
import { useModalExitUX } from './modal-engine';
import styles from './generic-modal.module.css';

export const GenericModalView = ({ children }: Props) => {
    const modalRef = useRef(null);
    useModalExitUX(modalRef);

    return (
        <div className={styles.modal} ref={modalRef}>
            {children}
        </div>
    );
};

type Props = {
    children: React.ReactNode;
};
