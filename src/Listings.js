import { useEffect, useState } from 'react';

function Listings({ marketplace, setMarketplace}) {
    

    useEffect(() => {
        fetch("/posts")
            .then((r) => r.json())
            .then((json) => {
                setMarketplace(json)
            })
    });


    return (
        <div>listings</div>
    )
};

export default Listings;