import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Items from "./components/Items/Items";
import Navbar from "./components/Navbar/Navbar";
import Post from "./components/Post/Post";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import UserProfile from "./components/UserProfile/UserProfile";
import Progress from "./components/Progress/Progress";

import { fetchAllPost } from "./api/serverAPI/post";
import { setProgress } from "./redux/action/progress";
import { useDispatch } from "react-redux";

function App() {
  const [authVisibility, setAuthVisiblity] = useState(false);

  const [itemList, setItemList] = useState([]);

  const dispatch = useDispatch();

  const gettAllItems = async () => {
    try {
      dispatch(setProgress(true));
      const { data } = await fetchAllPost();
      setItemList(data);
      dispatch(setProgress(false));
    } catch (error) {
      console.log("Error in getAllItems, app.js", error);
      console.log("Error in getAllItems APIT, app.js", error?.response);
    }
  };

  useEffect(() => {
    gettAllItems();
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Progress />
      <Auth visibility={authVisibility} setVisibility={setAuthVisiblity} />
      <Navbar setAuthVisibility={setAuthVisiblity} setItemList={setItemList} />

      <Routes>
        <Route path="/" exact element={<Items items={itemList} />} />
        <Route path="/item/:id" exact element={<ProductDetail />} />
        <Route path="/post" exact element={<Post />} />
        <Route path="/user/:id" exact element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
