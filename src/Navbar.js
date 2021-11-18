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
import Messages from "./Messages";

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
                    <Menu.Item as={Link} className="navigation" to="/userpage"
                        name="User Page"
                        active={activeItem === 'userpage'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item as={Link} name="Marketplace" className="navigation" to="/marketplace"
                        active={activeItem === 'marketplace'}
                        onClick={handleItemClick}
                    />
                    <Menu.Item as={Link} name="About Us" className="navigation" to="/about"
                        active={activeItem === 'about'}
                        onClick={handleItemClick}
                    />
                <Menu.Menu position='right'>
                    <Menu.Item as={Link} name="Messages" className="navigation" to="/messages"
                        active={activeItem === 'messages'}
                        onClick={handleItemClick}>
                        {user.messages.length !== 0 ? <i aria-hidden="true" className="red envelope square icon" ></i> : null}
                        Messages
                    </Menu.Item>
                    <Menu.Item className="navigation" onClick={handleLogout} name='Logout' />
                </Menu.Menu>
            </Menu>
            <Segment>
                <Routes>
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/marketplace" element={<Marketplace marketplace={marketplace} user={user} issueRequest={issueRequest} setIssueRequest={setIssueRequest} />} />
                    <Route path="/userpage" element={<UserPage user={user} setUser={setUser} marketplace={marketplace} issueRequest={issueRequest} setIssueRequest={setIssueRequest} />} />
                    <Route path="/" element={<UserPage user={user} setUser={setUser} marketplace={marketplace} issueRequest={issueRequest} setIssueRequest={setIssueRequest} />} />
                </Routes>
            </Segment>
        </div >
    );
}

export default Navbar;