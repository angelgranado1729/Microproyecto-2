import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { HOME_URL } from "../../constants/urls";
import styles from "./PublicRoute.module.css";

export function PublicRoute({ children }) {
    const { user, isLoadingUser } = useUserContext();

    if (isLoadingUser) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
            </div>
        );
    }

    if (!isLoadingUser && user) {
        return <Navigate to={HOME_URL} />;
    }

    return children;
}
