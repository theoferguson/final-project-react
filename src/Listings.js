

function Listings({ marketplace, user }) {

    return (
        <>
            <h3>Market Listings</h3>
            {marketplace.map((post) => {
                return (
                    <div className="marketplace_card">
                        <h5>{post.offering.name}</h5>
                        <h6>{post.offering.user.username}</h6>
                        <div>
                            <div>{post.offering.destination}</div>
                            <div>{post.offering.origin}</div>
                            <div>{post.offering.destination_date}</div>
                            <div>{post.offering.origin_date}</div>
                            {post.offering.full_truckload ? <div>Full Truckload Available</div> : null}
                            {post.offering.less_than_truckload ? <div>Partial Truckload Available</div> : null}
                        </div>
                    </div>
                )
            })}
        </>
    )
};

export default Listings;