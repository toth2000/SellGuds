import { API } from "./index";

import {
  createPostUrl,
  deletePostUrl,
  fetchAllPostUrl,
  fetchPostByIdUrl,
  fetchUserPostUrl,
  fetchUserPurchaseUrl,
  markSoldUrl,
  purchasePostUrl,
  searchPostUrl,
} from "../../constants/serverApiUrl";

export const createPost = ({
  title,
  description,
  price,
  images,
  state,
  country,
  continent,
  coordinates,
}) => {
  return API.post(createPostUrl, {
    title: title,
    description: description,
    price: price,
    images: images,
    location: {
      state: state,
      country: country,
      continent: continent,
      coordinates: coordinates,
    },
  });
};

export const deletePost = (id) => {
  return API.delete(`${deletePostUrl}/${id}`);
};

export const markItemSold = (id) => {
  return API.patch(`${markSoldUrl}/${id}`);
};

export const purchasePost = (id) => {
  return API.patch(`${purchasePostUrl}/${id}`);
};

export const fetchAllPost = () => {
  return API.get(fetchAllPostUrl);
};

export const fetchPostById = (id) => {
  return API.get(`${fetchPostByIdUrl}/${id}`);
};

export const fetchUserPost = (id) => {
  return API.get(`${fetchUserPostUrl}/${id}`);
};

export const fetchUserPurchase = (id) => {
  return API.get(`${fetchUserPurchaseUrl}/${id}`);
};

export const searchPost = (query) => {
  return API.post(searchPostUrl, { query: query });
};
