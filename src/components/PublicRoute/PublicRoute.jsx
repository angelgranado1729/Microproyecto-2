import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { HOME_URL } from "../../constants/urls";
import { Loading } from "../Loading/Loading";

export function PublicRoute({ children }) {
    const { user, isLoadingUser } = useUserContext();


    if (isLoadingUser) {
        return (
            <Loading />
        );
    }

    if (!isLoadingUser && user) {
        return <Navigate to={HOME_URL} />;
    }

    return children;
}
