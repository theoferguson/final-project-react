import { useEffect, useState } from 'react';
import { Card, Button, Segment } from 'semantic-ui-react'

function Messages() {
    const [myInbox, setMyInbox] = useState([])
    const [myOutbox, setMyOutbox] = useState([])

    useEffect(() => {
        fetch("/me/inbox")
            .then((r) => r.json())
            .then((messages) => {
                setMyInbox(messages)
            });
    }, []);


    useEffect(() => {
        fetch("/me/outbox")
            .then((r) => r.json())
            .then((messages) => {
                setMyOutbox(messages)
            })
    }, []);

    function removeMessage(message) {
        setMyOutbox(myOutbox.filter((item) => item !== message) )
        fetch(`/messages/${message.id}`, {
            method: 'DELETE'
        })
    };


    return (
        <>
            <Segment>
                <Card.Group>Inbox:
                    {myInbox.map((message) => {
                        console.log(message)
                        return (
                            <Card key={message.id}>
                                <Card.Content>
                                    <Card.Header content={`From: ${message.sender.username}`} />
                                    <Card.Header content={`re: ${message.post.offering.name}`} />
                                    <Card.Meta content={message.sender.name} />
                                    <Card.Description content={message.message} />
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Card.Group>
            </Segment>
            <Segment>
                <Card.Group>Outbox:
                    {myOutbox.map((message) => {
                        console.log(message)
                        return (
                            <Card key={message.id}>
                                <Card.Content>
                                    <Card.Header content={`To: ${message.user.name} (${message.user.username})`} />
                                    <Card.Header content={`re: ${message.post.offering.name}`} />
                                    <Card.Meta content={message.sender.name} />
                                    <Segment>
                                        <Card.Description content={message.message} />
                                    </Segment>
                                    <Card.Content extra>
                                        <Button basic compact color='red' onClick={() => removeMessage(message)} >
                                            Delete
                                        </Button>
                                    </Card.Content>
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Card.Group>
            </Segment>
        </>
    )
};

export default Messages;