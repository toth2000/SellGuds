import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`;

export const StyledHeading = styled.h1``;

export const StyledTitle = styled.h2``;

export const InfoContainer = styled.div`
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  width: 60%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const Hr = styled.hr`
  width: 100%;
  height: 0.5px;
  background-color: black;
  margin: 30px 0 0 0;
`;

export const FileInput = styled.input`
  margin: 0 20px;
`;

export const Button = styled.button`
  padding: 15px;
  background-color: #002f34;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  margin: 20px;
  cursor: pointer;
`;
