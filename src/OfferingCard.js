import { useEffect } from "react"

function OfferingCard({ offering, marketplace, user }) {


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
            })
    };


    function posted() {
        if (user.id === offering.user.id) {
            return (
                <div>Posted to marketplace</div>
            )
        } else if (offering.user.email) {
            return (
                <button className="post_button" onClick={handlePost} >Post offering</button>
            )
        } else {
            return (
                <div>Update valid email to post to marketplace</div>
            )
        }
    }


    return (
        <div className="offering_card" >
            <h5>{offering.name}</h5>
            <h6>{offering.user.username}</h6>
            <div>
                <div>{offering.destination}</div>
                <div>{offering.origin}</div>
                <div>{offering.destination_date}</div>
                <div>{offering.origin_date}</div>
                {offering.full_truckload ? <div>Full Truckload Available</div> : null}
                {offering.less_than_truckload ? <div>Partial Truckload Available</div> : null}
                {posted()}
            </div>
        </div>
    )
};

export default OfferingCard;