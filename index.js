const express = require("express");
const app = express();
const request = require("request-promise");

const PORT = process.env.PORT || 5000;
// all secret token in .env

const genApiStr = (apikey) =>
  `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`;
// json parser - {}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to this Amazon Scraper API");
});

app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${genApiStr(api_key)}&url=https://www.amazon.in/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${genApiStr(
        api_key
      )}&url=https://www.amazon.in/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${genApiStr(
        api_key
      )}&url=https://www.amazon.in/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${genApiStr(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

app.listen(PORT, (req, res) => {
  console.log("Server is Running");
});
