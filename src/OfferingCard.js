import { Segment, Button, Card } from "semantic-ui-react";


function OfferingCard({ offering, marketplace, issueRequest, setIssueRequest }) {


    function handlePost() {
        console.log(offering)
        fetch("/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                offering
            )
        })
            .then((r) => r.json())
            .then((json) => {
                console.log(json)
                setIssueRequest(!issueRequest)
            })
    };

    function handleRemovePost() {
        const removePost = marketplace.find((post) => post.offering.id === offering.id)
        console.log(removePost.id)
        fetch(`/posts/${removePost.id}`, {
            method: 'DELETE'
        }).then(setIssueRequest(!issueRequest))
    };


    function posted() {
        if (marketplace.some((post) => post.offering.id === offering.id)) {
            return (
                <>
                    <Card.Content>Posted to marketplace</Card.Content><Button className="post_button" onClick={handleRemovePost} basic fluid color='red'>Remove from Marketplace</Button>
                </>
            )
        } else if (offering.user.email) {
            return (
                <Button basic fluid color='teal' className="post_button" onClick={handlePost} >Post offering</Button>
            )
        } else {
            return (
                <Card.Content>Update valid email to post to marketplace</Card.Content>
            )
        }
    }

    function removeOffering() {
        if (marketplace.some((post) => post.offering.id === offering.id)) {
            handleRemovePost()
            fetch(`/offerings/${offering.id}`, {
                method: 'DELETE'
            }).then(setIssueRequest(!issueRequest))
        } else {
            fetch(`/offerings/${offering.id}`, {
                method: 'DELETE'
            }).then(setIssueRequest(!issueRequest))
        }
    }


    return (
        <Card >
            <Card.Content>
                <Card.Header>{offering.name}</Card.Header>
                <Card.Meta>{offering.user.username}</Card.Meta>
                <Card.Description>
                    <div>{offering.destination}</div>
                    <div>{offering.origin}</div>
                    <div>{offering.destination_date}</div>
                    <div>{offering.origin_date}</div>
                    {offering.full_truckload ? <div>Full Truckload Available</div> : null}
                    {offering.less_than_truckload ? <div>Partial Truckload Available</div> : null}
                </Card.Description>
            </Card.Content>
            <Card.Content>
                {posted()}
                <Button onClick={() => removeOffering()} basic fluid color='red'>Delete Offering</Button>
            </Card.Content>
        </Card>
    )
};

export default OfferingCard;