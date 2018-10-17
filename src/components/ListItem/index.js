import React from 'react';

export const ListItem = props => {
  console.log(`item`, props);
  return <p>{props.item}</p>;
};
