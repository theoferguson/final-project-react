import Categories from "./Categories";
import Filter from "./Filter";
import Listings from "./Listings";
import NewsScroll from "./NewsScroll";

function Marketplace({marketplace, user }) {

    return (
        <>
            <div>
                <NewsScroll />
            </div>
            <div>
                <Categories />
                <Filter />
                <Listings marketplace={marketplace} user={user} />
            </div>
        </>
    )
};

export default Marketplace;