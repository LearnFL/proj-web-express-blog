//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import {logErrors, respondInternalError, respondNoResourceFound} from "./controllers/errorHandling.mjs";
import {showAbout, showContact, showCompose} from "./controllers/homeController.mjs";
import {addPost, showPostId, showHome, deletePost, showEdit, editPost} from "./controllers/postsController.mjs";
import {parseForm, csrfProtect} from "./controllers/csrfHelper.mjs";

// CSRF PROTECTION
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import session from 'express-session';

// APP
const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(logErrors);

// FOR CSRF
app.use(cookieParser());

// ROUTES
app.get('/', showHome);
app.get('/home', showHome);
app.get('/about', showAbout);
app.get('/contact', showContact);
app.get('/compose', csrfProtect, showCompose);
app.post('/addPost', parseForm, csrfProtect, addPost);
app.get('/post/:postId', showPostId);
app.get('/delete/:postId', deletePost);
app.get('/edit/:postId', csrfProtect, showEdit);
app.post('/edit/:postId', parseForm, csrfProtect, editPost);
// app.post('/addPost', parseForm, csrfProtect, addPost);

// ERROR HANDLING
app.use(respondNoResourceFound);
app.use(respondInternalError);

app.listen(PORT, ()=>{console.log('The app is runnin.')})
