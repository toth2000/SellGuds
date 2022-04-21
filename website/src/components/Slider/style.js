import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 60vw;
  position relative;
  overflow: hidden;
  z-index: 1;
`;

export const Arrow = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.5;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => (props.direction === "left" ? "10px" : null)};
  right: ${(props) => (props.direction === "right" ? "10px" : null)};
  z-index: 2;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}%);
  transition: all 0.5s ease;
`;

export const Slide = styled.div`
  width: 60vw;
  display: flex;
  align-items: center;
  background-color: black;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  width: 700px;
  height: 500px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
