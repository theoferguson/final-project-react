import { Button, Card } from "semantic-ui-react";

function Listings({ marketplace, user, category }) {

    function cardDisplay(post) {
        return (
            <Card >
                <Card.Content>
                    <Card.Header>{post.offering.name}</Card.Header>
                    <Card.Meta >{post.offering.user.username}</Card.Meta>
                    <Card.Description>
                        <div>{post.offering.asking_price}</div>
                        <div>{post.offering.origin}</div>
                        <div>{post.offering.origin_date}</div>
                        <div>{post.offering.destination}</div>
                        <div>{post.offering.destination_date}</div>
                        {post.offering.full_truckload ? <div>Full Truckload Available</div> : null}
                        {post.offering.less_than_truckload ? <div>Partial Truckload Available</div> : null}
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    };

    function marketDisplay() {
        if (Object.keys(category).length !== 0) {
            return (
                <Card.Group>
                    {marketplace.map((post) => {
                        const key = Object.keys(category)[0]
                        const value = Object.values(category)[0]
                        if (post.offering[key] === value) {
                            return (
                                cardDisplay(post)
                            )
                        }
                    })}
                </Card.Group>
            )
        } else {
            return (
                <Card.Group>
                    {marketplace.map((post) => cardDisplay(post))}
                </Card.Group>
            )
        }
    };

    return (
        <>
            <h3>Market Listings</h3>
            {marketDisplay()}
        </>
    )
};

export default Listings;