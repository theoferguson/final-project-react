import { Modal, Button, Form, Dropdown, Segment } from "semantic-ui-react";
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

    const cityOptions = [
        { text: 'Montgomery, AL', value: 'Montgomery', key: 'AL' },
        { text: 'Juneau, AK', value: 'Juneau', key: 'AK' },
        { text: 'Phoenix, AZ', value: 'Phoenix', key: 'AZ' },
        { text: 'Little Rock, AR', value: 'Little Rock', key: 'AR' },
        { text: 'Sacramento, CA', value: 'Sacramento', key: 'CA' },
        { text: 'Denver, CO', value: 'Denver', key: 'CO' },
        { text: 'Hartford, CT', value: 'Hartford', key: 'CT' },
        { text: 'Dover, DE', value: 'Dover', key: 'DE' },
        { text: 'Tallahassee, FL', value: 'Tallahassee', key: 'FL' },
        { text: 'Atlanta, GA', value: 'Atlanta', key: 'GA' },
        { text: 'Honolulu, HI', value: 'Honolulu', key: 'HI' },
        { text: 'Boise, ID', value: 'Boise', key: 'ID' },
        { text: 'Springfield, IL', value: 'Springfield', key: 'IL' },
        { text: 'Indianapolis, IN', value: 'Indianapolis', key: 'IN' },
        { text: 'Des Moines, IA', value: 'Des Moines', key: 'IA' },
        { text: 'Topeka, KS', value: 'Topeka', key: 'KS' },
        { text: 'Frankfort, KY', value: 'Frankfort', key: 'KY' },
        { text: 'Baton Rouge, LA', value: 'Baton Rouge', key: 'LA' },
        { text: 'Augusta, ME', value: 'Augusta', key: 'ME' },
        { text: 'Annapolis, MD', value: 'Annapolis', key: 'MD' },
        { text: 'Boston, MA', value: 'Boston', key: 'MA' },
        { text: 'Lansing, MI', value: 'Lansing', key: 'MI' },
        { text: 'Saint Paul, MN', value: 'Saint Paul', key: 'MN' },
        { text: 'Jackson, MS', value: 'Jackson', key: 'MS' },
        { text: 'Jefferson City, MO', value: 'Jefferson City', key: 'MO' },
        { text: 'Helena, MT', value: 'Helena', key: 'MT' },
        { text: 'Lincoln, NE', value: 'Lincoln', key: 'NE' },
        { text: 'Carson City, NV', value: 'Carson City', key: 'NV' },
        { text: 'Concord, NH', value: 'Concord', key: 'NH' },
        { text: 'Trenton, NJ', value: 'Trenton', key: 'NJ' },
        { text: 'Santa Fe, NM', value: 'Santa Fe', key: 'NM' },
        { text: 'Albany, NY', value: 'Albany', key: 'NY' },
        { text: 'Raleigh, NC', value: 'Raleigh', key: 'NC' },
        { text: 'Bismarck, ND', value: 'Bismarck', key: 'ND' },
        { text: 'Columbus, OH', value: 'Columbus', key: 'OH' },
        { text: 'Oklahoma City, OK', value: 'Oklahoma City', key: 'OK' },
        { text: 'Salem, OR', value: 'Salem', key: 'OR' },
        { text: 'Harrisburg, PA', value: 'Harrisburg', key: 'PA' },
        { text: 'Providence, RI', value: 'Providence', key: 'RI' },
        { text: 'Columbia, SC', value: 'Columbia', key: 'SC' },
        { text: 'Pierre, SD', value: 'Pierre', key: 'SD' },
        { text: 'Nashville, TN', value: 'Nashville', key: 'TN' },
        { text: 'Austin, TX', value: 'Austin', key: 'TX' },
        { text: 'Salt Lake City, UT', value: 'Salt Lake City', key: 'UT' },
        { text: 'Montpelier, VT', value: 'Montpelier', key: 'VT' },
        { text: 'Richmond, VA', value: 'Richmond', key: 'VA' },
        { text: 'Olympia, WA', value: 'Olympia', key: 'WA' },
        { text: 'Charleston, WV', value: 'Charleston', key: 'WV' },
        { text: 'Madison, WI', value: 'Madison', key: 'WI' },
        { text: 'Cheyenne, WY', value: 'Cheyenne', key: 'WY' }
    ];

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
                handleClose()
                setIssueRequest(!issueRequest)
            })
    };

    function handleChange(event) {
        if (event.target.id === "less_than_truckload" || event.target.id === "full_truckload") {
            setOffering({ ...offering, [event.target.name]: event.target.checked })
        } else if (event._reactName === "onClick") {
            setOffering({ ...offering, [event.target.parentElement.parentElement.id]: event.target.innerText })
        } else {
            setOffering({ ...offering, [event.target.name]: event.target.value })
        }
    };

    useEffect(() => {
        console.log(offering);
    }, [offering]);

    return (
        <>
            <Button basic fluid color='teal' onClick={handleShow}>
                Add New Offering
            </Button>

            <Modal
                dimmer={show ? "blurring" : undefined}
                open={show}
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
                                <Form.Input type="text" name="name" value={offering.name ? offering.name : ''} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Asking Price (total $):
                                <Form.Input type="text" name="asking_price" value={offering.asking_price ? offering.asking_price : ''} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor='less_than_truckload' >Less than truckload (LTL)?</label>
                            <input type='checkbox' id="less_than_truckload" name='less_than_truckload' value={offering.less_than_truckload ? offering.less_than_truckload : ''} onChange={handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor='full_truckload' >Full truckload (FTL)?</label>
                            <input type='checkbox' id="full_truckload" name='full_truckload' value={offering.full_truckload ? offering.full_truckload : ''} onChange={handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Origin City:
                            </label>
                            <Dropdown
                                options={cityOptions}
                                placeholder={offering.origin ? offering.origin : 'origin'}
                                search
                                selection
                                onChange={handleChange}
                                id="origin"
                                value={offering.origin ? offering.origin : ''}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Origin date:
                                <Form.Input type="date" name="origin_date" value={offering.origin_date ? offering.origin_date : ''} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Destination City:
                            </label>
                            <Dropdown
                                options={cityOptions}
                                placeholder={offering.destination ? offering.destination : 'destination'}
                                search
                                selection
                                onChange={handleChange}
                                id="destination"
                                value={offering.destination ? offering.destination : ''}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Destination date:
                                <Form.Input type="date" name="destination_date" value={offering.destination_date ? offering.destination_date : ''} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Modal.Actions>
                            <Button type="submit" value="Create new offering" color='teal'>Submit Offering</Button>
                        </Modal.Actions>
                    </Form>
                </Modal.Content>
            </Modal>
            <Segment>
                <h3>Your Offerings</h3>
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
            </Segment>
        </>
    )
};

export default MyOfferings;