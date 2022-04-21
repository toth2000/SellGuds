import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 280px;
  height: 350px;
  background-color: white;
  border-radius: 3px;
  flex-direction: column;
  cursor: pointer;w
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  padding: 20px 0;
  justify-content: center;
`;

export const Image = styled.img`
  height: 100%;
  width: 80%;
  object-fit: contain;
`;

export const PriceText = styled.h1`
  margin: 0;
  font-size: 24px;
  padding: 0 20px;
`;

export const ProductTitleText = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 20px;
`;

export const SmallText = styled.p`
  font-size: 12px;
  margin: 0;
  padding: 0 20px 2px 20px;
`;
