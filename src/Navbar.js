import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import AboutUs from "./AboutUs";
import Marketplace from "./Marketplace";
import UserPage from "./UserPage";
import { Menu, Segment } from "semantic-ui-react";
import { useState } from "react";

function Navbar({ onLogout, user, setUser, marketplace, setIssueRequest, issueRequest }) {
    const [activeItem, setActiveItem] = useState({ activeItem: 'userpage' })

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => onLogout());
    }

    function handleItemClick(e, { name }) {
        setActiveItem({ activeItem: name })
    }

    return (
        <div>
            <Menu pointing secondary>
                <Link className="navigation" to="/userpage">
                    <Menu.Item
                        name="User Page"
                        active={activeItem === 'userpage'}
                        onClick={handleItemClick}
                    />
                </Link>
                <Link className="navigation" to="/marketplace">
                    <Menu.Item name="Marketplace"
                        active={activeItem === 'marketplace'}
                        onClick={handleItemClick}
                    />
                </Link>
                <Link className="navigation" to="/about">
                    <Menu.Item name="About Us"
                        active={activeItem === 'about'}
                        onClick={handleItemClick}
                    />
                </Link>
                <Menu.Menu position='right'>
                    <Menu.Item className="navigation" onClick={handleLogout} name='Logout' />
                </Menu.Menu>
            </Menu>
            <Segment>
                <Routes>
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/marketplace" element={<Marketplace marketplace={marketplace} user={user} />} />
                    <Route path="/userpage" element={<UserPage user={user} setUser={setUser} marketplace={marketplace} issueRequest={issueRequest} setIssueRequest={setIssueRequest} />} />
                    <Route path="/" element={<UserPage user={user} setUser={setUser} marketplace={marketplace} />} />
                </Routes>
            </Segment>
        </div>
    );
}

export default Navbar;