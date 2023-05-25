import { FunctionComponent, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal-engine.module.css';
import { useOutsideClickObserver } from '../hooks/use-outside-click-observer';

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
        <ModalEngineContext.Provider value={{ showModal, replaceAndShowModal, closeCurrentModal }}>
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
    closeCurrentModal: () => void;
};

export const useShowModal = () => useContext(ModalEngineContext).showModal;
export const useReplaceAndShowModal = () => useContext(ModalEngineContext).replaceAndShowModal;
export const useCloseCurrentModal = () => useContext(ModalEngineContext).closeCurrentModal;

/**
 * Includes standard UX to allow a user to close the modal if they hit ESCAPE
 * or click outside the modal.
 *
 * @param modalRef modal to apply the UX to.
 */
export const useModalExitUX = (modalRef: React.RefObject<Element>) => {
    const closeCurrentModal = useCloseCurrentModal();
    useOutsideClickObserver(modalRef, closeCurrentModal);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeCurrentModal();
            }
        };

        document.addEventListener('keydown', handleKeyDown, false);
        return () => document.removeEventListener('keydown', handleKeyDown, false);
    }, [closeCurrentModal]);
};

export const MODAL_PORTAL_ID = 'modals';
