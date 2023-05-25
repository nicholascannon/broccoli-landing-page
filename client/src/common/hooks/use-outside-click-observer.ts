import { useEffect } from 'react';

export const useOutsideClickObserver = (ref: React.RefObject<Element>, onOutsideClick: OutsideClickHandler) => {
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const { current } = ref;
            const target = event.target;

            if (!(target instanceof Element)) {
                return;
            }

            if (current && current.contains(target) === false) {
                onOutsideClick(event);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick, false);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [ref, onOutsideClick]);
};

type OutsideClickHandler = (event: MouseEvent) => void;
