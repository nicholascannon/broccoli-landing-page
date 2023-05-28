import styles from './header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <span className={styles.title}>BROCCOLI & CO.</span>
        </header>
    );
};
