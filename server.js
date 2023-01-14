import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  console.log("This is a get request");
  res.send("This is the server");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
