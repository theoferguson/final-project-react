import Categories from "./Categories";
import Filter from "./Filter";
import Listings from "./Listings";
import NewsScroll from "./NewsScroll";
import { Grid } from "semantic-ui-react";
import { useEffect, useState } from "react";

function Marketplace({ marketplace, user }) {
    const [category, setCategory] = useState({})

    function handleFilter(e, {content}='' ) {
        if (e === 'clear') {
            setCategory({})
        } else if (content === 'LTL' || content === 'FTL') {
            setCategory({[e.target.id]: true})
        } else {
            setCategory({[e.target.id]: content})
        }
    };

    // useEffect(() => {
    //     console.log(category)
    // }, [category]);

    return (
        <Grid celled>
            <Grid.Row>
                <Grid.Column>
                    <NewsScroll />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={6}>
                    <Filter />
                    <Categories marketplace={marketplace} handleFilter={handleFilter} />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Listings marketplace={marketplace} user={user} category={category} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Marketplace;