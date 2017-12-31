/** Created by ge on 12/30/17. */
import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from "react-apollo";
import {Flex, FlexItem} from "layout-components";
import TreeListView from "./TreeListView";
import TextView from "./TextView";

const RepoList = graphql(gql`
query ($number_of:Int!){
  viewer {
    name
    repositories(last: $number_of) {
      nodes {
        name
        id
        owner {
          id
        }
        nameWithOwner
        labels(first:100) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
   }
}
`)(function List({data: {viewer}}) {
    if (!viewer) return <h1>placeholder</h1>;
    const {name, repositories} = viewer;
    console.log(repositories.nodes);
    return <Flex row className="App">
        <Flex column component={FlexItem} fixed width="30em">
            <FlexItem component={"h1"}>{name}</FlexItem>
            <FlexItem className="repos">
                {repositories.nodes.map(r => <div key={r.nameWithOwner}>
                    <a href={r.nameWithOwner}>{r.nameWithOwner}</a>
                </div>)}
            </FlexItem>
        </Flex>
        <FlexItem fixed width="15em" component={TreeListView} owner="episodeyang" name="escherpad-test-user-repo"
                  path="master:"/>
        <FlexItem fluid>
            <TextView owner="episodeyang" name="escherpad-test-user-repo" path="master:README.md"/>
        </FlexItem>
    </Flex>
});

const ListEntry = (props) => {
    return (<div {...props}/>);
};

export default RepoList;
