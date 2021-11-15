import { Modal, Button, Form, Dropdown, Checkbox } from "semantic-ui-react";
import { useEffect, useState } from 'react';
import OfferingCard from './OfferingCard';
import { City } from 'country-state-city';

function MyOfferings({ user, marketplace, setUser, issueRequest, setIssueRequest }) {
    const [show, setShow] = useState(false);
    const [offering, setOffering] = useState({});
    const [allOfferings, setAllOfferings] = useState(user.offerings);
    const [cities, setCities] = useState(City.getCitiesOfCountry('US'))

    useEffect(() => {
        fetch("/me/offerings").then((response) => {
            if (response.ok) {
                response.json().then((offerings) => setAllOfferings(offerings));
            }
        });
    }, [issueRequest]);

    const cityOptions =
        cities.map((city) => {
            return (
                { key: `${city.name}${city.stateCode}`, value: `${city.name}`, text: `${city.name}, ${city.stateCode}` }
            )
        });

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
        // console.log(event.target.parentElement)
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
                            <label>
                                Asking Price (total $):
                                <Form.Input type="text" name="asking_price" value={offering.asking_price} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Form.Field>
                            <label for='less_than_truckload' >Less than truckload (LTL)?</label>
                            <input type='checkbox' id="less_than_truckload" name='less_than_truckload' value={offering.less_than_truckload} onChange={handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label for='full_truckload' >Full truckload (FTL)?</label>
                            <input type='checkbox' id="full_truckload" name='full_truckload' value={offering.full_truckload} onChange={handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Origin City:
                            </label>
                            <Dropdown
                                options={cityOptions}
                                placeholder={offering.origin ? offering.origin : 'origin' }
                                search
                                selection
                                onChange={handleChange}
                                id="origin"
                                value={offering.origin}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Origin date:
                                <Form.Input type="text" name="origin_date" value={offering.origin_date} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Destination City:
                            </label>
                            <Dropdown
                                options={cityOptions}
                                placeholder={offering.destination ? offering.destination : 'destination' }
                                search
                                selection
                                onChange={handleChange}
                                id="destination"
                                value={offering.destination}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Destination date:
                                <Form.Input type="text" name="destination_date" value={offering.destination_date} onChange={handleChange} />
                            </label>
                        </Form.Field>
                        <Modal.Actions>
                            <Button type="submit" value="Create new offering" color='teal'>Submit Offering</Button>
                        </Modal.Actions>
                    </Form>
                </Modal.Content>
            </Modal>
            <div>
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
            </div>
        </>
    )
};

export default MyOfferings;