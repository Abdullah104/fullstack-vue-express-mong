const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (_, response) => {
  const posts = await loadPostsCollection();

  response.send(await posts.find({}).toArray())
});

// Add posts
router.post('/', async (request, response) => {
  const posts = await loadPostsCollection();

  await posts.insertOne({ text: request.body.text, createdAt: new Date() });

  response.status(201).send();
});

// Delete posts
router.delete('/:id', async (request, response) => {
  const posts = await loadPostsCollection();

  await posts.deleteOne({ _id: new mongodb.ObjectId(request.params.id) })

  response.status(200).send();
})

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://Abdullah104:xnKD3MTtjwqUvTEo@cluster0.kavur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

  return client.db('myFirstDatabase').collection('posts');
}

module.exports = router;