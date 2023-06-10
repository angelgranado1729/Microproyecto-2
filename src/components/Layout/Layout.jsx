import { Navbar } from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { UserContextProvider } from "../../contexts/UserContext";
import { Footer } from "../Footer/Footer";

export function Layout() {
    return (
        <UserContextProvider>
            <main>
                <Navbar />

                <section className="body">
                    <Outlet />
                </section>

                <Footer />
            </main>
        </UserContextProvider>
    );
}