const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/../client-for-dynamic-platformer/'));

app.listen(PORT, () => {
  console.log('App is listening on port ' + PORT);
});