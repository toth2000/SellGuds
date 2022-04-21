import React, { useEffect, useState } from "react";

import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deletePost,
  fetchPostById,
  markItemSold,
  purchasePost,
} from "../../api/serverAPI/post";
import { setProgress } from "../../redux/action/progress";
import { getUserById } from "../../api/serverAPI/auth";

import PreviewSlider from "../Slider/PreviewSlider/PreviewSlider";
import Slider from "../Slider/Slider";

import defaultAvatar from "../../default-user-avatar.png";

import {
  Container,
  DescriptionContainer,
  LeftContainer,
  PriceContainer,
  RightContainer,
  StyledText,
  ImageContainer,
  StyledTitle,
  StyledSmallText,
  SellerContainer,
  SellerInfoContainer,
  SellerImage,
  SellerInfoTextContainer,
  AvailabilityContainer,
  AvailabilityStatusText,
  BuyNowButton,
  EditContainer,
  EditButton,
} from "./style";

const ProductDetail = () => {
  const [item, setItem] = useState(null);
  const [seller, setSeller] = useState(null);

  const [slideIndex, setSlideIndex] = useState(0);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const getItemById = async (id) => {
    try {
      dispatch(setProgress(true));
      const { data } = await fetchPostById(id);
      setItem(data);
      getSellerInformation(data?.sellerUserId);
    } catch (error) {
      console.log("Error occured in getItemById, ProductDetail.js", error);
      console.log("Error occured in getItemById, API", error?.response);
    }
  };

  const getSellerInformation = async (id) => {
    try {
      const { data } = await getUserById(id);
      setSeller(data);
      console.log("Seller Data", data);
    } catch (error) {
      console.log("Error occurred in getSellerInformation\n", error);
      console.log(
        "Error occurred in getSellerInformation API\n",
        error?.response
      );
    } finally {
      dispatch(setProgress(false));
    }
  };

  const markItemAsSold = async () => {
    if (!item) return;

    try {
      dispatch(setProgress(true));
      const { data } = await markItemSold(item._id);
      setItem(data);
    } catch (error) {
      console.log("Error occurred in markItemAsSold", error);
      console.log("Error occurred in markItemAsSold API", error?.response);
    } finally {
      dispatch(setProgress(false));
    }
  };

  const deleteItem = async () => {
    if (!item) return;

    try {
      dispatch(setProgress(true));
      await deletePost(item._id);
      navigate("/");
    } catch (error) {
      console.log("Error occurred in delteItem", error);
      console.log("Error occurred in deleteItem API", error?.response);
    } finally {
      dispatch(setProgress(false));
    }
  };

  const buyItem = async () => {
    if (!item) return;

    try {
      dispatch(setProgress(true));
      const { data } = await purchasePost(item._id);
      setItem(data);
    } catch (error) {
      console.log("Error occurred in delteItem", error);
      console.log("Error occurred in deleteItem API", error?.response);
    } finally {
      dispatch(setProgress(false));
    }
  };

  const handleSellerClick = () => {
    navigate(`/user/${item?.sellerUserId}`);
  };

  useEffect(() => {
    const path = location.pathname.split("/");
    const id = path[2];

    getItemById(id);
  }, []);

  return (
    <Container>
      <LeftContainer>
        <ImageContainer>
          <Slider
            slideIndex={slideIndex}
            setSlideIndex={setSlideIndex}
            imageList={item?.images}
          />
          <PreviewSlider
            setSlideIndex={setSlideIndex}
            imageList={item?.images}
          />
        </ImageContainer>

        <DescriptionContainer>
          <StyledTitle>Description</StyledTitle>
          <StyledText>{item?.description}</StyledText>
        </DescriptionContainer>
      </LeftContainer>

      <RightContainer>
        {user?._id === item?.sellerUserId && item?.sold === false ? (
          <EditContainer>
            <EditButton onClick={markItemAsSold}>Mark as Sold</EditButton>
            <EditButton onClick={deleteItem} color="delete">
              Delete Ad
            </EditButton>
          </EditContainer>
        ) : null}

        <PriceContainer>
          <StyledTitle>{`₹ ${item?.price}`}</StyledTitle>
          <StyledText>{item?.title}</StyledText>
          <StyledSmallText>{`${item?.location?.state}, ${item?.location?.country}`}</StyledSmallText>
          <StyledSmallText>{moment(item?.createdAt).fromNow()}</StyledSmallText>
        </PriceContainer>

        <AvailabilityContainer>
          <StyledTitle defaultVal="none" wt="400">
            Item Status:
          </StyledTitle>
          {item?.sold ? (
            <AvailabilityStatusText sold="true">Sold</AvailabilityStatusText>
          ) : (
            <AvailabilityStatusText sold="false">
              Available
            </AvailabilityStatusText>
          )}
        </AvailabilityContainer>

        {user?._id !== item?.sellerUserId && item?.sold === false ? (
          <BuyNowButton onClick={buyItem}>Buy Now</BuyNowButton>
        ) : null}

        <SellerContainer>
          <StyledTitle>Seller Information</StyledTitle>
          <SellerInfoContainer onClick={handleSellerClick}>
            <SellerImage src={defaultAvatar} />

            <SellerInfoTextContainer>
              <StyledText defaultVal="none">{seller?.fullName}</StyledText>
              <StyledSmallText defaultVal="none">
                {`Joined ${moment(seller?.createdAt).fromNow()}`}
              </StyledSmallText>
            </SellerInfoTextContainer>
          </SellerInfoContainer>
        </SellerContainer>
      </RightContainer>
    </Container>
  );
};

export default ProductDetail;
