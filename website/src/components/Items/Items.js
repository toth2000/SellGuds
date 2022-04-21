import React from "react";
import Item from "./Item/Item";

import { Container } from "./style";

const Items = ({items}) => {
  return (
    <Container>
      { items?.map((item) => <Item key={item._id} item={item} />)}
    </Container>
  );
};

export default Items;
