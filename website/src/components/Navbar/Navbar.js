import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import {
  CenterContainer,
  CompanyTitle,
  Container,
  LeftContainer,
  LocationText,
  LocationContainer,
  LoginTextButton,
  RightContainer,
  SearchButton,
  SearchContainer,
  SearchField,
  SellButton,
  SellText,
  StyledLink,
  Wrapper,
} from "./style";
import { fetchLocation } from "../../helper/location";
import { searchPost } from "../../api/serverAPI/post";
import { setProgress } from "../../redux/action/progress";

const Navbar = ({ setAuthVisibility, setItemList }) => {
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [query, setQuery] = useState("");

  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getLocation = async () => {
    const location = await fetchLocation();

    if (location) setLocation(location.state);
  };

  const getSearchedPost = async () => {
    try {
      if (!query) return;

      navigate("/");

      dispatch(setProgress(true));
      const { data } = await searchPost(query);
      console.log(data);
      setItemList(data);
    } catch (error) {
      console.log("Error in getSearchPost", error);
      console.log("Error in getSearchPost", error?.response);
    } finally {
      dispatch(setProgress(false));
    }
  };

  const handleLoginButtonClick = () => {
    setAuthVisibility(true);
  };

  const handleSellButtonClick = () => {
    if (!user.isLoggedIn) {
      setAuthVisibility(true);
      return;
    }

    navigate("/post");
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Container>
      <Wrapper>
        <LeftContainer>
          <StyledLink to="/">
            <CompanyTitle>SellGuds</CompanyTitle>
          </StyledLink>
          <LocationContainer>
            <LocationOnIcon />
            <LocationText>{location}</LocationText>
          </LocationContainer>
        </LeftContainer>

        <CenterContainer>
          <SearchContainer>
            <SearchField
              value={query}
              placeholder="Search Anything..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchButton onClick={getSearchedPost}>
              <SearchIcon sx={{ color: "white" }} />
            </SearchButton>
          </SearchContainer>
        </CenterContainer>

        <RightContainer>
          {user.isLoggedIn ? (
            <StyledLink to={`user/${user.user._id}`}>
              <LoginTextButton>My Profile</LoginTextButton>
            </StyledLink>
          ) : (
            <LoginTextButton onClick={handleLoginButtonClick}>
              Login
            </LoginTextButton>
          )}
          <SellButton onClick={handleSellButtonClick}>
            <AddIcon />
            <SellText>SELL</SellText>
          </SellButton>
        </RightContainer>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
