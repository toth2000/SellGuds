const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { title, description, price, images, location } = req.body;

    if (!title || !description || !price || !location || !images)
      return res.status(400).json({ message: "Incomplete data" });

    const post = new Post({
      sellerUserId: req.userId,
      title: title,
      description: description,
      price: price,
      images: images,
      location: location,
    });

    const savedPost = await post.save();
    return res.status(200).json(savedPost);
  } catch (error) {
    console.log("post.js controller, createPost\n", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = req.post;

    await Post.findByIdAndDelete(post._id);
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log("post controller, deletePost\n", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const markSold = async (req, res) => {
  try {
    const post = req.post;
    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      { sold: true },
      { new: true }
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log("post controller, markSold\n", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const buyPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (post.userId === req.userId)
      return res.status(402).json({ message: "You can't buy your own post" });

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { buyerUserId: req.userId, sold: true },
      { new: true }
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log("post controller, buyPost\n", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

/** Fetching all unsold posts */
const fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ sold: false }).sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    console.log("post controller, fetchAllPost\n", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const fetchPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    return res.status(200).json(post);
  } catch (error) {
    console.log("post controller, fetchPostById\n", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const fetchUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ sellerUserId: id }).sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    console.log("post controller, fetchUserPosts\n", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const fetchUserPurchases = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ buyerUserId: id }).sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    console.log("post controller, fetchUserPurchases\n", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const searchPost = async (req, res) => {
  try {
    const { query } = req.body;
    const posts = await Post.find({
      title: { $regex: `${query}`, $options: "i" },
    }).sort({
      createdAt: -1,
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log("post controller, fetchUserPurchases\n", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  markSold,
  buyPost,
  fetchAllPosts,
  fetchPostById,
  fetchUserPosts,
  fetchUserPurchases,
  searchPost,
};
