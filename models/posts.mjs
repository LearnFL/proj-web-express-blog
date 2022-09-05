import mongoose from 'mongoose';
import {} from 'dotenv/config';

mongoose.connect('mongodb+srv://'+process.env.atlasAdmin+':'+process.env.atlasPass+'@cluster0.ckkapiv.mongodb.net/?retryWrites=true&w=majority')

const postSchema = new mongoose.Schema({
  name: {type: String, required:[1]},
  post: {type: String, required:[1]}
});

const Post = mongoose.model("Post", postSchema);

export {Post};
