import { useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react'

function SignUp({ onSignUp }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
            }),
        })
            .then((r) => r.json())
            .then((user) => onSignUp(user));
    }

    return (
        <>
            <Header as='h2' color='teal' textAlign='center'>
                Sign-up for an account
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
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type="password"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <Button color='teal' fluid type="submit">Submit</Button>
                </Segment>
            </Form>
        </>
    );

}

export default SignUp;