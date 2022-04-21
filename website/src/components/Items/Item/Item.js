import React from "react";
import moment from "moment";

import { useNavigate } from "react-router-dom";

import {
  Container,
  Image,
  ImageContainer,
  PriceText,
  ProductTitleText,
  SmallText,
} from "./style";

const Item = ({ item }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/item/${item._id}`);
  };

  return (
    <Container onClick={handleOnClick}>
      <ImageContainer>
        <Image src={item.images[0]} />
      </ImageContainer>

      <PriceText>{`₹ ${item.price}`}</PriceText>

      <ProductTitleText>{item.title}</ProductTitleText>

      <SmallText>{`${item.location.state}, ${item.location.country}`}</SmallText>
      <SmallText>{moment(item.createdAt).fromNow()}</SmallText>
    </Container>
  );
};

export default Item;
