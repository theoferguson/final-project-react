import Categories from "./Categories";
// import Search from "./Search";
import Listings from "./Listings";
// import NewsScroll from "./NewsScroll";
import { Grid } from "semantic-ui-react";
import { useState } from "react";

function Marketplace({ marketplace, user, issueRequest, setIssueRequest }) {
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

    return (
        <Grid celled>
            <Grid.Row>
                {/* <Grid.Column>
                    <NewsScroll />
                </Grid.Column> */}
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={5}>
                    {/* <Search /> */}
                    <Categories marketplace={marketplace} handleFilter={handleFilter} />
                </Grid.Column>
                <Grid.Column width={8}>
                    <Listings marketplace={marketplace} user={user} category={category} issueRequest={issueRequest} setIssueRequest={setIssueRequest}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Marketplace;