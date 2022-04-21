import React, { useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";

import {
  Arrow,
  Container,
  Image,
  ImageContainer,
  Slide,
  Wrapper,
  ImageWrapper,
} from "./style";

const Slider = ({ imageList, slideIndex, setSlideIndex }) => {
  
  const handleLeftClick = () => {
    if (slideIndex > 0) setSlideIndex(slideIndex - 1);
    else setSlideIndex(imageList.length - 1);
  };

  const handleRightClick = () => {
    if (slideIndex < imageList.length - 1) setSlideIndex(slideIndex + 1);
    else setSlideIndex(0);
  };

  return (
    <Container>
      <Arrow direction="left" onClick={handleLeftClick}>
        <ArrowLeftOutlined />
      </Arrow>
      {imageList?.map((x) => (
        <Wrapper slideIndex={slideIndex}>
          <Slide>
            <ImageContainer>
              <ImageWrapper>
                <Image src={x} />
              </ImageWrapper>
            </ImageContainer>
          </Slide>
        </Wrapper>
      ))}
      <Arrow direction="right" onClick={handleRightClick}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
