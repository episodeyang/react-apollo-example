/** Created by ge on 12/30/17. */
import React, {Component} from "react";
import gql from 'graphql-tag';
import {graphql} from "react-apollo";
import {Flex, FlexItem} from "layout-components";

// const updateText = gql`
//     mutation Read() {
//         name
//     }
// `;

const TextView = graphql(gql`
    query ($owner:String!, $name:String!, $path:String!) {
      repository(name: $name, owner: $owner) {
        object(expression: $path) {
          ... on Blob {
            text
          }
        }
      }
    }
`)(function TextView({data}) {
    const {repository} = data;
    console.log(data);
    if (!repository) return <div>tree view placeholder</div>;
    return <pre contentEditable={true} onInput={() => true} height="200px"
    >{repository.object.text}</pre>;
});

export default TextView;
