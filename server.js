const express = require('express');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const app = express();
const port = 3000;

// Set up livereload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname);

// Inject livereload script into HTML
app.use(connectLivereload());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Notify livereload server of changes
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
