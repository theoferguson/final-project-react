import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import OfferingCard from './OfferingCard';

function MyOfferings({ user, marketplace }) {
    const [show, setShow] = useState(false);
    const [offering, setOffering] = useState({});
    const [allOfferings, setAllOfferings] = useState(user.offerings);

    useEffect(() => {
        fetch("/me/offerings").then((response) => {
          if (response.ok) {
            response.json().then((offerings) => setAllOfferings(offerings));
          }
        });
      }, []);

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
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" >New offering:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Offering name:
                                <input type="text" name="name" value={offering.name} onChange={handleChange} />
                            </label>
                            <label>
                                Less than truckload (LTL)?:
                                <input type="checkbox" name="less_than_truckload" onChange={handleChange} />
                            </label>
                            <label>
                                Full truckload (FTL)?:
                                <input type="checkbox" name="full_truckload" onChange={handleChange} />
                            </label>
                            <label>
                                Origin region:
                                <input type="text" name="origin" value={offering.origin} onChange={handleChange} />
                            </label>
                            <label>
                                Origin date:
                                <input type="text" name="origin_date" value={offering.origin_date} onChange={handleChange} />
                            </label>
                            <label>
                                Destination region:
                                <input type="text" name="destination" value={offering.destination} onChange={handleChange} />
                            </label>
                            <label>
                                Destination date:
                                <input type="text" name="destination_date" value={offering.destination_date} onChange={handleChange} />
                            </label>

                            <input type="submit" value="Create new offering" />
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>Your offerings
                {allOfferings.map((offering) => {
                    return (
                        <OfferingCard key={offering.id} offering={offering} marketplace={marketplace} />
                    )
                })}
            </div>
        </>
    )
};

export default MyOfferings;