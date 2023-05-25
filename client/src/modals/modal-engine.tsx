import { FunctionComponent, ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal-engine.module.css';

export const ModalEngine = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalComponent[]>([]);

    const closeCurrentModal = useCallback(() => {
        setModals((modals) => modals.slice(1));
    }, []);

    const showModal: QueueModalFunction = useCallback((modal) => {
        setModals((modals) => [modal, ...modals]);
    }, []);

    const replaceAndShowModal: QueueModalFunction = useCallback((modal) => {
        setModals((modals) => [modal, ...modals.slice(1)]);
    }, []);

    const CurrentModal = modals.length ? modals[0] : undefined;

    return (
        <ModalEngineContext.Provider value={{ showModal, replaceAndShowModal }}>
            {children}

            {CurrentModal &&
                createPortal(
                    <div className={styles.overlay}>
                        <CurrentModal closeModal={closeCurrentModal} />
                    </div>,
                    document.getElementById(MODAL_PORTAL_ID) as HTMLElement
                )}
        </ModalEngineContext.Provider>
    );
};

export type ModalComponent = FunctionComponent<{ closeModal: () => void }>;

export type QueueModalFunction = (modal: ModalComponent) => void;

const ModalEngineContext = createContext<ModalEngineState>({} as ModalEngineState);

type ModalEngineState = {
    showModal: QueueModalFunction;
    replaceAndShowModal: QueueModalFunction;
};

export const useShowModal = () => useContext(ModalEngineContext).showModal;
export const useReplaceAndShowModal = () => useContext(ModalEngineContext).replaceAndShowModal;

export const MODAL_PORTAL_ID = 'modals';
