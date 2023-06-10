import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import styles from './Navbar.module.css';
import { logout } from '../../firebase/auth';
import {
    HOME_URL,
    LOGIN_URL,
    NOW_PLAYING_MOVIES_URL,
    PROFILE_URL,
    REGISTER_URL,
    UPCOMING_MOVIES_URL
} from '../../constants/urls';

export function Navbar() {
    const { user } = useUserContext();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleCloseMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
            // Código adicional después de cerrar sesión
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav className={`${styles.navbar} ${isMobileMenuOpen ? styles.open : ''}`}>
            <div className={styles.logoContainer}>
                <Link to="/" className={styles.logo}>
                    Orange Cinema
                </Link>
            </div>

            {/* Mobile Menu */}
            <div className={styles.mobileMenu}>
                <button
                    className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.open : ''}`}
                    onClick={handleMobileMenuToggle}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>
                {isMobileMenuOpen && (
                    <div className={styles.mobileMenuContent}>
                        <ul className={styles.mobileMenuLinks}>
                            <li>
                                <Link to={HOME_URL} className={styles.navLink} onClick={handleCloseMobileMenu}>
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to={UPCOMING_MOVIES_URL} className={styles.navLink} onClick={handleCloseMobileMenu}>
                                    Próximamente
                                </Link>
                            </li>
                            <li>
                                <Link to={NOW_PLAYING_MOVIES_URL} className={styles.navLink} onClick={handleCloseMobileMenu}>
                                    Cartelera
                                </Link>
                            </li>
                            {!user ? (
                                <>
                                    <li>
                                        <Link to={LOGIN_URL} className={styles.navLink} onClick={handleCloseMobileMenu}>
                                            Iniciar Sesión
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={REGISTER_URL} className={styles.navLink} onClick={handleCloseMobileMenu}>
                                            Registrarse
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to={PROFILE_URL} className={styles.navLink} onClick={handleCloseMobileMenu}>
                                            Perfil
                                        </Link>
                                    </li>
                                    <li>
                                        <button className={styles.logoutBt} onClick={handleLogout}>
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                        <button className={styles.mobileMenuClose} onClick={handleCloseMobileMenu}>
                            <span className={styles.closeIcon}>&times;</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Desktop Menu */}
            <ul className={styles.navLinks}>
                <li>
                    <Link to={HOME_URL} className={styles.navLink}>
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link to={UPCOMING_MOVIES_URL} className={styles.navLink}>
                        Próximamente
                    </Link>
                </li>
                <li>
                    <Link to={NOW_PLAYING_MOVIES_URL} className={styles.navLink}>
                        Cartelera
                    </Link>
                </li>
                {!user ? (
                    <>
                        <li>
                            <Link to={LOGIN_URL} className={styles.navLink}>
                                Iniciar Sesión
                            </Link>
                        </li>
                        <li>
                            <Link to={REGISTER_URL} className={styles.navLink}>
                                Registrarse
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to={PROFILE_URL} className={styles.navLink}>
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <button className={styles.logoutBtDesktop} onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
