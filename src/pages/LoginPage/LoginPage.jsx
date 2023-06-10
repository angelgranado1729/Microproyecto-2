import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { HOME_URL, REGISTER_URL } from "../../constants/urls";
import {
    loginWithEmailAndPassword,
    signInWithGoogle,
} from "../../firebase/auth";

export function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const [loginError, setLoginError] = useState(false);

    const onSuccess = () => {
        navigate(HOME_URL);
    };


    const onFail = (_error) => {
        setLoginError(true);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        setLoginError(false);
        await loginWithEmailAndPassword({ userData: formData, onSuccess, onFail });
    };

    const onChange = (event) => {
        const { name, value } = event.target;

        setFormData((oldData) => ({ ...oldData, [name]: value }));
    };

    const handleGoogleClick = async () => {
        await signInWithGoogle({
            onSuccess: () => navigate(HOME_URL),
        });
    };

    const handleEmailClick = () => {
        if (!formData.email) {
            setErrors((prevErrors) => ({ ...prevErrors, email: true }));
        }
    };

    const handlePasswordClick = () => {
        if (!formData.password) {
            setErrors((prevErrors) => ({ ...prevErrors, password: true }));
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.title}>Iniciar sesión</h1>
                <p className={styles.welcomeTxt}>Descubre tus películas favoritas en los auditorios de la Universidad Metropolitana</p>

                {/* EMAIL FIELD */}
                <div
                    className={`${styles.inputContainer} ${errors.email ? styles.errorInput : ""
                        }`}
                >
                    <label htmlFor="email">
                        <span>Ingresa tu email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Correo electrónico"
                        onChange={onChange}
                        onClick={handleEmailClick}
                    />
                    {errors.email && (
                        <span className={styles.errorMsg}>Por favor ingresa un correo electrónico.</span>
                    )}
                </div>

                {/* PASSWORD FIELD */}
                <div
                    className={`${styles.inputContainer} ${errors.password ? styles.errorInput : ""
                        }`}
                >
                    <label htmlFor="password">
                        <span>Ingresa tu contraseña</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        onChange={onChange}
                        onClick={handlePasswordClick}
                    />
                    {errors.password && (
                        <span className={styles.errorMsg}>Por favor ingresa una contraseña.</span>
                    )}
                </div>

                <button type="submit" className={styles.submitBtn}>
                    Entrar
                </button>

                {loginError && (
                    <div className={styles.errorMessage}>
                        Lo sentimos, no encontramos una cuenta con esta dirección de correo electrónico.
                        Por favor, inténtalo de nuevo o crea una
                        <Link to={REGISTER_URL} >
                            nueva cuenta
                        </Link>.
                    </div>
                )}

                <button
                    type="button"
                    className={styles.googleBtn}
                    onClick={handleGoogleClick}
                >
                    Iniciar sesión con Google
                </button>

                <Link to={REGISTER_URL} className={styles.loginRedirect}>
                    ¿Aún no tienes una cuenta?{" "}
                    <span className={styles.redirectLink}>Regístrate aquí</span>
                </Link>
            </form>
        </div>
    );
}
