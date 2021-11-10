import Categories from "./Categories";
import Filter from "./Filter";
import Listings from "./Listings";
import NewsScroll from "./NewsScroll";

function Marketplace({marketplace, setMarketplace}) {

    return (
        <>
            <div>
                <NewsScroll />
            </div>
            <div>
                <Categories />
                <Filter />
                <Listings marketplace={marketplace} setMarketplace={setMarketplace} />
            </div>
        </>
    )
};

export default Marketplace;