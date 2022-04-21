import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 20;
`;

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Loader = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Text = styled.p`
  position: absolute;
  width: 100%;
  bottom: 15px;
  font-weight: 600;
  font-size: 18px;
  color: gray;
  text-align: center;
`;
