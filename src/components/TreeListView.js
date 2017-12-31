/** Created by ge on 12/30/17. */
import React, {Component} from "react";
import gql from 'graphql-tag';
import {graphql} from "react-apollo";
import {Flex, FlexItem} from "layout-components";

const TreeView = graphql(gql`
    query ($owner:String!, $name:String!, $path:String!) {
      repository(name: $name, owner: $owner) {
          object(expression: $path) {
              ... on Tree {
                entries {
                  name
                  type
                  mode
                }
              }
          }
      }
    }
`)(function TreeView({data, ..._props}) {
    const {repository} = data;
    console.log(data);
    if (!repository) return <div>tree view placeholder</div>;
    return <div {..._props}>{repository.object.entries.map(entry =>
        <div>{entry.name}</div>
    )}</div>;
});

export default TreeView;
