import MyOfferings from './MyOfferings';
import Settings from './Settings';
import MyData from './MyData';

function UserPage() {

    return (
        <p>
            <Settings />
            <MyData />
            <MyOfferings />
        </p>
    )
};

export default UserPage;