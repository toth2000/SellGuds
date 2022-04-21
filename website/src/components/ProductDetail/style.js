import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 20px;
  gap: 15px;
  justify-content: center;
`;

export const LeftContainer = styled.div`
  gap: 10px;
  display: flex;

  flex-direction: column;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  padding: 0 0 10px 0;
  border-radius: 3px;
`;

export const ImagePreviewContainer = styled.div``;

export const DescriptionContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 3px;
`;

export const StyledTitle = styled.h1`
  font-size: 24px;
  white-space: pre-line;
  margin: ${(props) => (props.defaultVal === "none" ? 0 : null)};
  font-weight: ${(props) => (props.wt ? props.wt : null)};
`;

export const StyledText = styled.p`
  white-space: pre-line;
  margin: ${(props) => (props.defaultVal === "none" ? 0 : null)};
`;

export const StyledSmallText = styled.p`
  font-size: 12px;
  white-space: pre-line;
  margin: ${(props) => (props.defaultVal === "none" ? 0 : null)};
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PriceContainer = styled.div`
  background-color: white;
  border-radius: 3px;
  padding: 20px;
`;

export const EditContainer = styled.div`
  background-color: white;
  border-radius: 3px;
  padding: 20px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const EditButton = styled.div`
  padding: 20px;
  font-size: 16px;
  color: white;
  background-color: ${(props) => (props.color === "delete" ? "red" : "green")};
  border-radius: 3px;
  width: 100%;
  flex: 1;
  cursor: pointer;
  text-align: center;
`;

export const AvailabilityContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const AvailabilityStatusText = styled.p`
  font-size: 24px;
  margin: 0;
  font-weight: 600;
  color: ${(props) => (props.sold === "true" ? "red" : "green")};
`;

export const BuyNowButton = styled.button`
  padding: 20px;
  font-size: 16px;
  color: white;
  background-color: #002f34;
  border-radius: 3px;
  cursor: pointer;
`;

export const SellerContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 3px;
`;

export const SellerInfoContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;

export const SellerImage = styled.img`
  height: 68px;
  width: 68px;
  border-radius: 50%;
`;

export const SellerInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
