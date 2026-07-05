import styles from "./Loader.module.css";

interface LoaderProps {
  title?: string;
  subtitle?: string;
  overlay?: boolean;
}

export default function Loader({
  title = "Loading campers...",
  subtitle = "Please wait while we fetch the best travel trucks for you",
  overlay = false,
}: LoaderProps) {
  const content = (
    <div className={styles.card}>
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );

  if (overlay) {
    return <div className={styles.overlay}>{content}</div>;
  }

  return content;
}
