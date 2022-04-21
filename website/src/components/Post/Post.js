import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchLocation } from "../../helper/location";
import InputField from "./InputField/InputField";
import { convertBase64 } from "../../helper/file";
import { setProgress } from "../../redux/action/progress";
import { createPost } from "../../api/serverAPI/post";

import {
  Button,
  Container,
  FileInput,
  Hr,
  InfoContainer,
  StyledHeading,
  StyledTitle,
} from "./style";

const Post = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
    state: "",
    country: "",
    continent: "",
    coordinates: {
      lat: "",
      lon: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getLocation = async () => {
    const location = await fetchLocation();

    if (location)
      setData({
        ...data,
        coordinates: { lat: location.lat, lon: location.lon },
        state: location.state,
        country: location.country,
        continent: location.continent,
      });
  };

  const handleInputChange = (event) => {
    if (event.target.name === "images") {
      if (event.target.files.length > 5) {
        alert("Maximum 5 images are allowed");
        event.target.value = null;
        return;
      }

      Array.from(event.target.files).forEach(async (file) => {
        const base64 = await convertBase64(file);
        setData((prev) => ({ ...prev, images: [...prev.images, base64] }));
      });
    } else setData({ ...data, [event.target.name]: event.target.value });
  };

  const handlePostNow = async () => {
    try {
      if (!data.title || !data.description || !data.price) {
        alert("Fill all the required fields first");
        return;
      }

      if (data.images.length === 0) {
        alert("Upload alteast one image");
        return;
      }

      dispatch(setProgress(true));

      const response = await createPost(data);

      navigate(`/item/${response.data._id}`);
    } catch (error) {
      console.log("Error in handlePostNow", error);
      console.log("Error in handlePostNow API", error?.response);
    } finally {
      dispatch(setProgress(false));
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Container>
      <StyledHeading>Post Your Ad</StyledHeading>

      <InfoContainer>
        <StyledTitle>Include Some Details</StyledTitle>
        <InputField
          name="title"
          value={data.title}
          title="Ad Title*"
          handleInputChange={handleInputChange}
        />
        <InputField
          name="description"
          value={data.description}
          title="Description*"
          large={true}
          handleInputChange={handleInputChange}
        />
        <Hr />
        <StyledTitle>Set A Price</StyledTitle>
        <InputField
          name="price"
          type="number"
          value={data.price}
          title="Price (in INR)*"
          handleInputChange={handleInputChange}
        />
        <Hr />
        <StyledTitle>Upload Upto 5 Photos</StyledTitle>
        <FileInput
          name="images"
          type="file"
          multiple="true"
          accept="image/png, image/gif, image/jpeg"
          onClick={() => setData({ ...data, images: [] })}
          onChange={(e) => handleInputChange(e)}
        />
        <Hr />
        <StyledTitle>Location Details</StyledTitle>
        <InputField title="State" value={data?.state} disabled={true} />
        <InputField title="Country" value={data?.country} disabled={true} />
        <Hr />
        <Button onClick={handlePostNow}>Post now</Button>
      </InfoContainer>
    </Container>
  );
};

export default Post;
