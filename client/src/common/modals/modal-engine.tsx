import { Dispatch, FunctionComponent, ReactNode, createContext, useContext, useEffect, useReducer } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClickObserver } from '../hooks/use-outside-click-observer';
import { ModalOverlay } from './components/modal-overlay';

export const ModalEngine = ({ children }: { children: ReactNode }) => {
    const [modals, dispatch] = useReducer(modalReducer, []);
    const CurrentModal = modals.length ? modals[0] : undefined;

    return (
        <ModalEngineContext.Provider value={dispatch}>
            {children}

            {CurrentModal &&
                createPortal(
                    <ModalOverlay>
                        <CurrentModal closeModal={() => dispatch({ type: 'CLOSE' })} />
                    </ModalOverlay>,
                    document.getElementById(MODAL_PORTAL_ID) as HTMLElement
                )}
        </ModalEngineContext.Provider>
    );
};

const modalReducer = (state: State, action: ModalAction): State => {
    switch (action.type) {
        case 'CLOSE':
            return state.slice(1);
        case 'REPLACE':
            return [action.modal, ...state.slice(1)];
        case 'SHOW':
            return [action.modal, ...state];
        default:
            return state;
    }
};

type State = ModalComponent[];

export type ModalComponent = FunctionComponent<{ closeModal: () => void }>;

type ModalAction =
    | { type: 'SHOW'; modal: ModalComponent }
    | { type: 'REPLACE'; modal: ModalComponent }
    | { type: 'CLOSE' };

const ModalEngineContext = createContext<Dispatch<ModalAction>>(() => {
    // empty
});

export const useShowModal = (): QueueModalFunction => {
    const dispatch = useContext(ModalEngineContext);
    return (modal) => dispatch({ type: 'SHOW', modal });
};

export const useReplaceAndShowModal = (): QueueModalFunction => {
    const dispatch = useContext(ModalEngineContext);
    return (modal) => dispatch({ type: 'REPLACE', modal });
};

export type QueueModalFunction = (modal: ModalComponent) => void;

export const useCloseCurrentModal = () => {
    const dispatch = useContext(ModalEngineContext);
    return () => dispatch({ type: 'CLOSE' });
};

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
