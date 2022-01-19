const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const posts = require('./routes/api/posts');

const app = express();
const port = process.env.PORT || 3030;


// Middleware
app.use(bodyParser.json()).use(cors()).use('/api/posts', posts);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public'));

  app.get(/.*/, (_, response) => response.sendFile(__dirname + '/public/index.html'));
}

app
  .listen(port, () => console.log(`Server started on port ${port}`))
  .on('error', (error) => console.log(`error ${error}`));
