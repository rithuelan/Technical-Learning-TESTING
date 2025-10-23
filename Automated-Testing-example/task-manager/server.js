const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();
app.use(bodyParser.json());
app.use(require('cors')());

app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', routes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app; // for testing
