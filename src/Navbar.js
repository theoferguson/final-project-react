import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import AboutUs from "./AboutUs";
import Marketplace from "./Marketplace";
import UserPage from "./UserPage";

function Navbar({ onLogout, user, setUser, marketplace, setMarketplace }) {
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => onLogout());
    }

    return (
        <>
            <header>
                <nav>
                    <Link className="navigation" to="/userpage">user page</Link>
                    <Link className="navigation" to="/marketplace">marketplace</Link>
                    <Link className="navigation" to="/about">about us</Link>
                    <button className="navigation" onClick={handleLogout}>Logout</button>
                </nav>
            </header>
            <Routes>
                <Route path="/about" element={<AboutUs />} />
                <Route path="/marketplace" element={<Marketplace marketplace={marketplace} setMarketplace={setMarketplace} />} />
                <Route path="/userpage" element={<UserPage user={user} setUser={setUser} marketplace={marketplace} />} />
                <Route path="/" element={<UserPage user={user} setUser={setUser} marketplace={marketplace} />} />
            </Routes>
        </>
    );
}

export default Navbar;