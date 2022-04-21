import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LogoutContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
`;

export const ProfileContainer = styled.div`
  background-color: white;
  border-radius: 3px;
  width: 70%;
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 25px;
`;

export const ProfileImage = styled.img`
  width: 106px;
  height: 106px;
  border-radius: 50%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const UserNameText = styled.h1`
  font-size: 34px;
  font-weight: 300;
  margin: 0;
`;

export const StyledSmallText = styled.p`
  font-size: 12px;
  margin: 0;
`;

export const ChoiceContainer = styled.div`
  display: flex;
  padding-top: 20px;
  gap: 25px;
`;

export const ChoiceText = styled.h1`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => (props.active === true ? "#5CAC6D" : "#002f34")};
`;

export const Hr = styled.hr`
  background-color: black;
  width: 70%;
`;

export const ItemContainer = styled.div`
  width: 70%;
`;
