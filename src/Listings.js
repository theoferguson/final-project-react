import { Card } from "semantic-ui-react";
import MarketCard from "./MarketCard";

function Listings({ marketplace, user, category, issueRequest, setIssueRequest }) {

    function cardDisplay(post) {
        return (
            <MarketCard
                post={post}
                user={user}
                issueRequest={issueRequest}
                setIssueRequest={setIssueRequest}
            />
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