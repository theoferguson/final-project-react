import { Modal, Button, Form, Grid, Header, Message, Segmant, Checkbox } from "semantic-ui-react";
import { useEffect, useState } from 'react';
import OfferingCard from './OfferingCard';

function MyOfferings({ user, marketplace, setUser, issueRequest, setIssueRequest }) {
    const [show, setShow] = useState(false);
    const [offering, setOffering] = useState({});
    const [allOfferings, setAllOfferings] = useState(user.offerings);

    useEffect(() => {
        fetch("/me/offerings").then((response) => {
            if (response.ok) {
                response.json().then((offerings) => setAllOfferings(offerings));
            }
        });
    }, [issueRequest]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/offerings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                offering
            ),
        })
            .then((r) => r.json())
            .then((json) => {
                console.log(json)
                setOffering({})
                setShow(false)
                setIssueRequest(!issueRequest)
            })
    };

    function handleChange(event) {
        if (event.target.name === "less_than_truckload" || event.target.name === "full_truckload") {
            setOffering({ ...offering, [event.target.name]: event.target.checked })
        } else {
            setOffering({ ...offering, [event.target.name]: event.target.value })
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add New Offering
            </Button>

            <Modal
                dimmer={show ? "blurring" : undefined}
                open={show ? "OPEN_MODAL" : false}
                onClose={() => setShow(false)}
                centered
            >
                <Modal.Header>
                    New offering:
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <label>
                                Offering name:
                                <Form.Input type="text" name="name" value={offering.name} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Form.Field>
                            Less than truckload (LTL)?:
                            <Checkbox type="checkbox" name="less_than_truckload" onChange={handleChange} />
                        </Form.Field>
                        <Form.Field>
                            Full truckload (FTL)?:
                            <Checkbox type="checkbox" name="full_truckload" onChange={handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Origin region:
                                <Form.Input type="text" name="origin" value={offering.origin} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Origin date:
                                <Form.Input type="text" name="origin_date" value={offering.origin_date} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Destination region:
                                <Form.Input type="text" name="destination" value={offering.destination} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Destination date:
                                <Form.Input type="text" name="destination_date" value={offering.destination_date} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Form.Input type="submit" value="Create new offering" />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                <Button type="submit" value="Create new offering" color='teal' >Submit Offering</Button>
                </Modal.Actions>
            </Modal>
            <div>
                <h3>Your offerings</h3>
                {allOfferings.map((offering) => {
                    return (
                        <OfferingCard
                            key={offering.id}
                            offering={offering}
                            marketplace={marketplace}
                            user={user}
                            setUser={setUser}
                            issueRequest={issueRequest}
                            setIssueRequest={setIssueRequest}
                        />
                    )
                })}
            </div>
        </>
    )
};

export default MyOfferings;