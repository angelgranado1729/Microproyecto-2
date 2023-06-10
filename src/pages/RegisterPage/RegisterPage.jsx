import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { HOME_URL, LOGIN_URL } from "../../constants/urls";
import {
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../../firebase/auth";
import { useState } from "react";

export function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const onSuccess = () => {
        navigate(HOME_URL);
    };

    const onFail = (error) => {
        console.log("REGISTER FAILED, Try Again");
        setErrorMessage("No se pudo crear su cuenta. Por favor, revise los datos suministrados.");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            await registerWithEmailAndPassword({
                userData: formData,
                onSuccess,
                onFail,
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = true;
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = true;
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = true;
            valid = false;
        }

        if (!formData.age || formData.age <= 0 || formData.age >= 100) {
            newErrors.age = true;
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleGoogleClick = async () => {
        await signInWithGoogle({
            onSuccess: () => navigate(HOME_URL),
        });
    };

    const onChange = (event) => {
        setData((oldData) => ({
            ...oldData,
            [event.target.name]: event.target.value,
        }));
    };

    const handleBlur = (event) => {
        const fieldName = event.target.name;

        if (!formData[fieldName]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: true,
            }));
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <h1 className={styles.title}>Crear una cuenta</h1>
                <p className={styles.welcomeTxt}>
                    Bienvenido! Te invitamos a ser parte de nuestra plataforma.
                </p>

                {/* NAME FIELD */}
                <div
                    className={`${styles.inputContainer} ${errors.name ? styles.errorInput : ""
                        }`}
                >
                    <label htmlFor="name">
                        <span>Ingresa tu nombre completo</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ex. Zac Gallen"
                        onChange={onChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && (
                        <span className={styles.errorMsg}>
                            Por favor ingresa tu nombre completo.
                        </span>
                    )}
                </div>

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
                        onBlur={handleBlur}
                    />
                    {errors.email && (
                        <span className={styles.errorMsg}>
                            Por favor ingresa un correo electrónico válido.
                        </span>
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
                        onBlur={handleBlur}
                    />
                    {errors.password && (
                        <span className={styles.errorMsg}>
                            Por favor ingresa una contraseña.
                        </span>
                    )}
                </div>

                {/* AGE FIELD */}
                <div
                    className={`${styles.inputContainer} ${errors.age ? styles.errorInput : ""
                        }`}
                >
                    <label htmlFor="age">
                        <span>Ingresa tu edad</span>
                    </label>
                    <input
                        type="text"
                        name="age"
                        id="age"
                        onChange={onChange}
                        onBlur={handleBlur}
                        inputMode="numeric"
                        pattern="\d*"
                        placeholder="Ex. 25"
                    />
                    {errors.age && (
                        <span className={styles.errorMsg}>
                            Por favor ingresa una edad válida.
                        </span>
                    )}
                    {errorMessage && (
                        <div className={styles.errorMessage}>
                            {errorMessage}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                >
                    Entrar
                </button>

                <button
                    type="button"
                    className={styles.googleBtn}
                    onClick={handleGoogleClick}
                >
                    Ingresa con Google
                </button>

                <Link to={LOGIN_URL} className={styles.loginRedirect}>
                    ¿Ya tienes una cuenta?{" "}
                    <span className={styles.redirectLink}>Inicia sesión aquí</span>
                </Link>
            </form>
        </div>
    );
}
