const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
