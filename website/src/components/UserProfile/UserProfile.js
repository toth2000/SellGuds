import React, { useEffect, useState } from "react";

import moment from "moment";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import {
  ChoiceContainer,
  ChoiceText,
  Container,
  Hr,
  InfoContainer,
  ItemContainer,
  LogoutContainer,
  ProfileContainer,
  ProfileImage,
  StyledSmallText,
  UserNameText,
} from "./style";

import defaultUserImg from "../../default-user-avatar.png";
import Items from "../Items/Items";
import { logoutUser } from "../../redux/action/auth";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserPost, fetchUserPurchase } from "../../api/serverAPI/post";
import { getUserById } from "../../api/serverAPI/auth";
import { setProgress } from "../../redux/action/progress";

const UserProfile = () => {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState(null);

  const currentUser = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getUserInformation = async (id) => {
    try {
      const { data } = await getUserById(id);
      setUser(data);
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

  const getAllPost = async (id) => {
    try {
      dispatch(setProgress(true));
      const { data } = await fetchUserPost(id);
      setPost(data);
    } catch (error) {
      console.log("Error occured in getUserPost", error);
      console.log("Error occured in getUserPost API", error?.response);
    } finally {
      dispatch(setProgress(false));
    }
  };

  const getAllPurchase = async (id) => {
    try {
      dispatch(setProgress(true));
      const { data } = await fetchUserPurchase(id);
      setPost(data);
    } catch (error) {
      console.log("Error occured in getUserPurchase", error);
      console.log("Error occured in getUserPurchase API", error?.response);
    } finally {
      dispatch(setProgress(false));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleChoiceClick = (id) => {
    const updatedChoice = choice.map((x) =>
      x.id === id ? { ...x, active: true } : { ...x, active: false }
    );

    setChoice(updatedChoice);
  };

  const [choice, setChoice] = useState([
    {
      id: 0,
      text: "Published Ads",
      active: true,
      apiCall: getAllPost,
    },
    {
      id: 1,
      text: "Items Purchased",
      active: false,
      apiCall: getAllPurchase,
    },
  ]);

  useEffect(() => {
    choice.forEach((element) => {
      if (element.active === true) element.apiCall(user?._id);
    });
  }, [choice, user]);

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    getUserInformation(id);
  }, [location]);

  return (
    <Container>
      <ProfileContainer>
        <LogoutContainer>
          {currentUser.user?._id === user?._id ? (
            <PowerSettingsNewIcon
              onClick={handleLogout}
              sx={{ color: "red", cursor: "pointer" }}
            />
          ) : null}
        </LogoutContainer>
        <ProfileImage src={defaultUserImg} />
        <InfoContainer>
          <UserNameText>{user?.fullName}</UserNameText>
          <StyledSmallText>{`Joined ${moment(
            user?.createdAt
          ).fromNow()}`}</StyledSmallText>
        </InfoContainer>
      </ProfileContainer>

      <ChoiceContainer>
        {choice.map((x) => (
          <ChoiceText
            onClick={() => handleChoiceClick(x.id)}
            key={x.id}
            active={x.active}
          >
            {x.text}
          </ChoiceText>
        ))}
        <ChoiceText></ChoiceText>
      </ChoiceContainer>

      <Hr />

      <ItemContainer>
        <Items items={post} />
      </ItemContainer>
    </Container>
  );
};

export default UserProfile;
