import React from "react";

import { Container, Image } from "./style";

const PreviewSlider = ({ imageList, setSlideIndex }) => {
  const handleOnClick = (img) => {
    console.log("ID: ", img);

    const index = imageList.findIndex((x) => x === img);

    console.log("index:", index);

    if (index === -1) return;

    setSlideIndex(index);
  };

  return (
    <Container>
      {imageList?.map((x) => (
        <Image onClick={() => handleOnClick(x)} src={x} />
      ))}
    </Container>
  );
};

export default PreviewSlider;
