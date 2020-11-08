const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');
const router = express.Router();
const keys = require('../../config/keys');
const cloudinary = require('cloudinary');
const user = require('../../models/user');

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {

  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

//@route....... GET /api/posts/user/id
//@desc ....... get post by current user
//@access...... Private

router.get(
  '/user/id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.find({ user: req.user.id })
      .then((post) => {
        if (!post) res.status(404).json({ noPost: 'No post exists' });

        res.json(post);
      })
      .catch((err) =>
        res.status(404).json({ nopostfound: 'No post found with that ID ' })
      );
  }
);

//@route....... POST /api/posts
//@desc ....... create posts
//@access...... Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      image: req.body.image,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
    });
    newPost.save().then((post) => res.json(post));

  }
);

//@route....... DELETE /api/posts/:id
//@desc ....... delete post
//@access...... Private

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })

        );
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })

        );
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          // Get remove index
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })

        );
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexist: 'Comment does not exist' });
        }
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: ' No post found' }));
  }
);

//@route    GET /api/posts/following/lists
//@desc     get posts for users you are following
//@access   private

router.get(
  '/following/lists',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) res.status(404).json({ profile: 'No profile exists' });
        res.json({ following: profile.following });
      })
      .catch((err) => console.log(err));
  }
);

//@route    POST /api/posts/media/upload
//@desc     upload media
//@access   private

// router.post(
//   '/media/upload',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
    // console.log(req.body.image);
    // const { errors, isValid } = validatePostInput(req.body);
    // if (!isValid) {
    //   return res.json(400).json(errors);
    // }
    // cloudinary.config({
    //   cloud_name: keys.cloudinary.cloud_name,
    //   api_key: keys.cloudinary.api_key,
    //   api_secret: keys.cloudinary.api_secret,
    // });

    // if (!req.body.image) {
    //   return res.status(400).json('Please add an image');
    // }

    // cloudinary.v2.uploader.upload(
    //   req.body.image,
    //   { height: 400, crop: 'scale' },
    //   (error, result) => {
    //     console.log(result, error);
    //     if (result) {

          // const newPost = new Post({
          //   text: req.body.text,
          //   name: req.body.name,
          //   avatar: req.body.avatar,
          //   user: req.user.id,
          //   image: req.body.url,

          // });
          // console.log(newPost);
          // newPost.save().then((post) => res.json(post));
        // }
    //   }
    // );
    
//   }
// );

module.exports = router;
