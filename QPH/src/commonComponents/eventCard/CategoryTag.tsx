import { CategoryTagInterface } from '../../types';
import styles from "./styles/CategoryTag.module.css";

export function CategoryTag ({ text, filled }: CategoryTagInterface) {

    const filledClass = filled ? styles.filled : "";

    return (
        <small className={`${styles.categoryTag} ${filledClass}`}>{text}</small>
    );
}