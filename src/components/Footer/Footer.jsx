import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.logoContainer}>
                        <Link to="/" className={styles.logo}>
                            Orange Cinema
                        </Link>
                    </div>
                    <nav className={styles.nav}>
                        <ul className={styles.navLinks}>
                            <li>
                                <a href="/">Inicio</a>
                            </li>
                            <li>
                                <a href="/about">Acerca de</a>
                            </li>
                            <li>
                                <a href="/contact">Contacto</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.copyRight}>
                    <p className={styles.text}>&copy; 2023 Orange. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}