import styles from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";
import { HOME_URL } from "../../constants/urls";

export function NotFoundPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 NOT FOUND!</h1>
            <p className={styles.description}>
                Lo sentimos, la página que estás buscando no existe.
            </p>
            <p className={styles.redirectText}>
                ¿Deseas volver a la página de inicio?
            </p>
            <Link to={HOME_URL} className={styles.redirectLink}>
                Volver a la página de inicio
            </Link>
        </div>
    );
}
