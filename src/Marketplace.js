import Categories from "./Categories";
import Filter from "./Filter";
import Listings from "./Listings";
import NewsScroll from "./NewsScroll";
import { Grid } from "semantic-ui-react";


function Marketplace({ marketplace, user }) {

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
                    <Categories marketplace={marketplace} />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Listings marketplace={marketplace} user={user} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Marketplace;