
//import models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//like a post
exports.likePost = async (req,res) => {
    try{
            const {post, user} = req.body;
            const like = new Like({
                post,user,
            });
            const savedLike = await like.save();

            //update the post 
            const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true} )
            .populate("likes").exec();


            res.json({
                post:updatedPost,
            });
    }
    catch(error) {
        return res.status(400).json({
            error: "Error while putting like",
        });
    }
};


//unlike a post
exports.unlikePost = async (req,res) => {
    try{
            const {post, like} = req.body;
            
            //find and delete the id from post and like 
            const deletedLike = await Like.findByIdAndDelete({post:post, _id:like} );

            //update post
            const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes:deletedLike._id}}, {new: true} );

            res.json({
                post:updatedPost,
            });
    }
    catch(error) {
        return res.status(400).json({
            error: "Error while uliking post",
        });
    }
};


exports.dummyLink = (req,res) => {
    res.send("This is Dummy Page");
}

