const express = require("express");
const {
  createPost,
  deletePost,
  markSold,
  buyPost,
  fetchAllPosts,
  fetchUserPosts,
  fetchUserPurchases,
  fetchPostById,
  searchPost,
} = require("../controller/post");
const { verifyToken } = require("../middleware/auth");
const { verifyPostAccess } = require("../middleware/post");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Post Route");
});

router.post("/create", verifyToken, createPost);
router.delete("/delete/:id", verifyToken, verifyPostAccess, deletePost);
router.patch("/sold/:id", verifyToken, verifyPostAccess, markSold);
router.patch("/purchase/:id", verifyToken, buyPost);

router.post("/search", searchPost);

router.get("/all", fetchAllPosts);
router.get("/:id", fetchPostById);
router.get("/user/:id", fetchUserPosts);
router.get("/user/purchase/:id", fetchUserPurchases);

module.exports = router;
