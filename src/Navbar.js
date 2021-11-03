function Navbar({ onLogout }) {
    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => onLogout());
    }

    return (
        <header>
            <button onClick={handleLogout}>Logout</button>
            <div className="App">
                <h1>Page Count: {count}</h1>
            </div>
        </header>
    );
}