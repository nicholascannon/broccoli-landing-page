import styles from './ruler.module.css';

export const Ruler = ({ className }: Props) => {
    return <hr className={`${styles.ruler} ${className}`} />;
};

type Props = {
    className?: string;
};
