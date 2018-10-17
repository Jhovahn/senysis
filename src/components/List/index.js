import React from 'react';
import { ListItem } from '../ListItem';

export const List = props => {
  return props.list.map(el => <ListItem item={el.text} key={el.id} />);
};
