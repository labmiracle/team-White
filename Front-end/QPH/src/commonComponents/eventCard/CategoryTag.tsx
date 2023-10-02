import styles from "./styles/CategoryTag.module.css";

export interface CategoryTagInterface {
    text: string;
    filled?: boolean;
}

export function CategoryTag({ text, filled }: CategoryTagInterface) {

    const filledClass = filled ? styles.filled : "";

    return (
        <small className={`${styles.categoryTag} ${filledClass}`}>{text}</small>
    );
}