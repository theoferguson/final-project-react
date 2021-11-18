import { useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react'

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((r) => r.json())
            .then((user) => onLogin(user));
    }

    return (
        <>
            <Header as='h1' color='teal' textAlign='center'>
                TRUCKING EXCHANGE NETWORK
            </Header>
            <Header as='h2' color='teal' textAlign='center'>
                Log-in to an account
            </Header>
            <Form onSubmit={handleSubmit}>
                <Segment stacked>
                    <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Username'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button color='teal' fluid type="submit">Login</Button>
                </Segment>
            </Form>
        </>
    );
}

export default Login;