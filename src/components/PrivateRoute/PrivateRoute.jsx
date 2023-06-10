import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { LOGIN_URL } from "../../constants/urls";
import styles from "./PrivateRoute.module.css";

export function PrivateRoute({ children }) {
    const { user, isLoadingUser } = useUserContext();

    if (isLoadingUser) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
            </div>
        );
    }

    if (!isLoadingUser && !user) {
        return <Navigate to={LOGIN_URL} />;
    }

    return children;
}
