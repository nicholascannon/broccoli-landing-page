import React, { useRef } from 'react';
import styles from './generic-modal-view.module.css';
import { useModalExitUX } from '../modal-engine';

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
