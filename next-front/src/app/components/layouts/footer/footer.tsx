import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <a href="#">トップ</a>
          <a href="#">PHPアプリ</a>
          <a href="#">Javaアプリ</a>
          <a href="#">Next.jsアプリ</a>
        </div>
      </div>
      <div className={styles.copyRight}>
        &copy; {new Date().getFullYear()} Chiku Portfolio. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
