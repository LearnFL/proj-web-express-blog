import {Post} from '../models/posts.mjs';
import _ from 'lodash';

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";


function addPost (req, res) {

  let postTitle = _.capitalize(req.body.postTitle);
  let postBody =  _.capitalize(req.body.postBody[0])+req.body.postBody.slice(1, -1);

  Post.create({name: postTitle, post: postBody});
  res.redirect('/home');
}

function showHome (req, res) {
  Post.find({}, (err, doc) => {
      res.render('home', {homeContent: homeStartingContent, allPosts: doc});
  });
}

function showPostId (req, res) {
  Post.findOne({_id: req.params.postId}, (err, doc) => {
    res.render('post', {data: doc});
  });
}

function deletePost (req, res) {
  console.log(req.params.postId);
  Post.findByIdAndDelete(req.params.postId, (err) => {
    if (err){
      console.log('Delete Error: ' + err);
    }
    res.redirect('/home');
  });
}

function showEdit (req, res) {
  Post.findOne({_id: req.params.postId}, (err, doc) => {
    res.render('edit', {postTitle: doc.name, postBody: doc.post, _id: doc._id, csrfToken: req.csrfToken()});
  });
}

function editPost (req, res) {
  Post.findByIdAndUpdate(req.params.postId, {name: req.body.postTitle, post: req.body.postBody}, (err) => {
    if (err){
      console.log('Edit Error: ' + err);
    }
    res.redirect('/home');
  });
}

export {showHome, showPostId, addPost, deletePost, showEdit, editPost};
