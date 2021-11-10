import MyOfferings from './MyOfferings';
import Settings from './Settings';
import MyData from './MyData';

function UserPage({ user, setUser, marketplace, setMarketplace }) {

    return (
        <div>
            <Settings user={user} setUser={setUser} />
            <MyData />
            <MyOfferings user={user} marketplace={marketplace} setMarketplace={setMarketplace} />
        </div>
    )
};

export default UserPage;