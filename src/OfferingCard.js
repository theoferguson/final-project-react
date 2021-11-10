

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
                    <div>Posted to marketplace</div><button className="post_button" onClick={handleRemovePost} >Remove from marketplace</button>
                </>
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