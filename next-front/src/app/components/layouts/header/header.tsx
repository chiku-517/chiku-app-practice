"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./header.module.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* ロゴ */}
        <Link href="/" className={styles.logo}>
          MyApp
        </Link>

        {/* ナビゲーション (PC) */}
        <nav className={styles.nav}>
          <NavItem href="/" label="トップ" />
          <NavItem href="/php" label="PHPアプリ" />
          <NavItem href="/java" label="Javaアプリ" />
          <NavItem href="/python" label="Pythonアプリ" />
          <NavItem href="/next" label="Next.jsアプリ" />
        </nav>

        {/* ハンバーガーメニュー (モバイル) */}
        <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* モバイルメニュー */}
      {isOpen && (
        <nav className={styles.mobileNav}>
          <ul>
            <NavItemMobile href="/" label="トップ" />
            <NavItemMobile href="/php" label="PHPアプリ" />
            <NavItemMobile href="/java" label="Javaアプリ" />
            <NavItemMobile href="/python" label="Pythonアプリ" />
            <NavItemMobile href="/next" label="Next.jsアプリ" />
          </ul>
        </nav>
      )}
    </header>
  );
};

// ナビゲーション項目 (PC用)
const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className={styles.navItem}>
    {label}
  </Link>
);

// ナビゲーション項目 (モバイル用)
const NavItemMobile = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link href={href} className={styles.mobileNavItem}>
      {label}
    </Link>
  </li>
);

export default Header;
