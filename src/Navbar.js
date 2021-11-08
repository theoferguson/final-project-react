function Navbar({ onLogout }) {
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => onLogout());
    }

    return (
        <header>
            <div>user page</div>
            <div>marketplace</div>
            <div>about us</div>
            <button onClick={handleLogout}>Logout</button>
        </header>
    );
}

export default Navbar;