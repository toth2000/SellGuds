const Post = require("../models/Post");
const mongoose = require("mongoose");

const verifyPostAccess = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id && !mongoose.Types.ObjectId.isValid(id))
      return res.status(406).json({ message: "Invalid id" });

    const post = await Post.findById(id); 

    if (post.sellerUserId !== req.userId)
      return res.status(403).json({ message: "This action is not allowed" });
    else {
      req.post = post;
      next();
    }
  } catch (err) {
    console.log("Post middleware, verifyToken: ", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { verifyPostAccess };
