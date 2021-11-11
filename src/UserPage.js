import MyOfferings from './MyOfferings';
import Settings from './Settings';
import MyData from './MyData';
import { Grid, Segment } from 'semantic-ui-react'

function UserPage({ user, setUser, marketplace, setIssueRequest, issueRequest }) {

    return (
        <Grid divided>
            <Grid.Column width={8}>
                <Segment>
                    <Settings user={user} setUser={setUser} />
                </Segment>
                <Segment>
                    <MyData />
                </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
                <MyOfferings user={user} marketplace={marketplace} setUser={setUser} issueRequest={issueRequest} setIssueRequest={setIssueRequest} />
            </Grid.Column>
        </Grid>
    )
};

export default UserPage;