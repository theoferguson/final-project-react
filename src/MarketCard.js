import { Card, Button, Modal, Form } from "semantic-ui-react";
import { useState } from "react";

function MarketCard({ post, user, issueRequest, setIssueRequest }) {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState({})

    const postUserId = post.offering.user.id

    function handleChange(e) {
        setMessage({ user_id: postUserId, post_id: post.id, message: e.target.value })
    };

    function handleSubmit(e) {
        console.log(message)
        e.preventDefault();
        fetch(`/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                message
            ),
        })
            .then((r) => r.json())
            .then((json) => {
                console.log(json)
                setOpen(false)
                setMessage({})
                setIssueRequest(!issueRequest)
            })
    }

    return (
        <Card>
            <Card.Content>
                <Card.Header>{post.offering.name}</Card.Header>
                <Card.Meta >{post.offering.user.username}</Card.Meta>
                <Card.Description>
                    <div><strong>Destination:</strong> {post.offering.destination}</div>
                    <div><strong>Origin:</strong> {post.offering.origin}</div>
                    <div><strong>Delivery Date:</strong> {post.offering.destination_date.slice(0, 10)}</div>
                    <div><strong>Departure Date:</strong> {post.offering.origin_date.slice(0, 10)}</div>
                    {post.offering.full_truckload ? <div><strong>Full Truckload Available</strong></div> : null}
                    {post.offering.less_than_truckload ? <div><strong>Partial Truckload Available</strong></div> : null}
                </Card.Description>
                {postUserId === user.id ? null :
                    <Card.Content extra>
                        <Modal
                            centered={false}
                            open={open}
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            trigger={<Button basic fluid><i className="user icon"></i>Contact User</Button>}
                        >
                            <Modal.Header>Write a message to this provider, include your contact details.</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <label>
                                            <Form.Input type="text" name="message" value={message.message} onChange={handleChange} />
                                        </label>
                                    </Form.Field>
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button.Group>
                                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                                    <Button.Or />
                                    <Button positive onClick={handleSubmit}>Send</Button>
                                </Button.Group>
                            </Modal.Actions>
                        </Modal>
                    </Card.Content>}
            </Card.Content>
        </Card>
    )
};

export default MarketCard;