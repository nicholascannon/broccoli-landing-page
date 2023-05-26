import styles from './footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>Made with &hearts; in Melbourne</p>
            <p>&copy; 2023 Broccoli &amp; Co. All rights reserved.</p>
        </footer>
    );
};
