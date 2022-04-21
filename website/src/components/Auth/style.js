import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const Wrapper = styled.div`
  background-color: white;
  width: 400px;
  height: 600px;
  border-radius: 3px;
`;

export const CancelContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CompanyTitle = styled.h1`
  text-align: center;
  color: #002f34;
`;

export const LoginText = styled.p`
  color: #002f34;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

export const InputFieldContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const InputField = styled.input`
  width: 80%;
  height: 48px;
  padding: 0 12px;
`;

export const LoginButton = styled.button`
  width: 80%;
  padding: 0 12px;
  color: #fff;
  background-color: #002f34;
  height: 48px;
  border-color: #002f34;
  box-shadow: none;
  font-size: 16px;
  font-weight: 600;
  box-sizing: content-box;
  border-radius: 3px;
  cursor: pointer;
`;

export const AuthText = styled.p`
  font-size: 12px;
  cursor: pointer;
`;
