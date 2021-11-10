import MyOfferings from './MyOfferings';
import Settings from './Settings';
import MyData from './MyData';

function UserPage({ user, setUser, marketplace, setIssueRequest, issueRequest }) {

    return (
        <div>
            <Settings user={user} setUser={setUser} />
            <MyData />
            <MyOfferings user={user} marketplace={marketplace} setUser={setUser} issueRequest={issueRequest} setIssueRequest={setIssueRequest} />
        </div>
    )
};

export default UserPage;