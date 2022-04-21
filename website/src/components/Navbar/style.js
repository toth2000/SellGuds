import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: 68px;
  background-color: rgba(0, 47, 52, 0.03);
  box-shadow: 0px 1px 1px grey;
`;

export const Wrapper = styled.div`
  padding: 0 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

export const CompanyTitle = styled.h1`
  flex: 1;
  color: #002f34;
  font-size: 24px;
  font-weigth: 600;
`;

export const LocationContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LocationText = styled.p``;

export const CenterContainer = styled.div`
  flex: 2;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

export const SearchField = styled.input`
  padding: 8px;
  width: 80%;
  border-radius: 5px 0 0 5px;
`;

export const SearchButton = styled.div`
  background-color: #002f34;
  border-radius: 0 5px 5px 0;
  padding: 5px;
  cursor: pointer;
`;

export const RightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  align-items: center;
`;

export const LoginTextButton = styled.h2`
  font-size: 18px;
  margin: 0;
  cursor: pointer;
`;

export const SellButton = styled.button`
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  padding: 8px 15px;
  border-radius: 20px;
  background-color: white;
  border-top: 5px solid #23e5db;
  border-left: 5px solid #ffce32;
  border-right: 5px solid #ffce32;
  border-bottom: 5px solid #3a77ff;
  cursor: pointer;
`;

export const SellText = styled.h2`
  font-weight: 600;
  font-size: 18px;
  padding: 0;
  margin: 0;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
