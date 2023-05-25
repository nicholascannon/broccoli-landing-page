import styles from './modal-overlay.module.css';

export const ModalOverlay = (props: Props) => {
    return <div className={styles.overlay}>{props.children}</div>;
};

type Props = {
    children: React.ReactNode;
};
