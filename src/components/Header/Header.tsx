"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          Travel<span className={styles.logoAccent}>Trucks</span>
        </Link>
        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.navLink} ${
              isActive("/") ? styles.navLinkActive : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${styles.navLink} ${
              isActive("/catalog") ? styles.navLinkActive : ""
            }`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
