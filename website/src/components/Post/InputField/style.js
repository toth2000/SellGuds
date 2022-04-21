import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  gap: 3px;
  padding: 0 10px;
`;

export const Title = styled.p`
  margin: 0;
`;

export const TextArea = styled.textarea`
  height: 96px;
  width: 70%;
  resize: none;
  font-size: 16px;
`;

export const Input = styled.input`
  height: 48px;
  width: 70%;
  font-size: 16px;
`;