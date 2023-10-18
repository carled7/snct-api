import express from "express";
import axios from "axios";
import { coins } from "./coins.js";

const app = express();

app.get("/get-balances", async (req, res) => {
  const balances = await Promise.all(
    coins.map(async (coin) => {
      const limit = 1000;

      const { data } = await axios.get(
        "https://api.binance.com/api/v3/trades",
        { params: { symbol: coin.code, limit } }
      );

      const momentVariation = ((data[limit - 1].price / data[0].price) - 1) * 100;

      return {
        coin: coin.name,
        currentPrice: data[limit - 1].price,
        momentVariation
      };
    })
  );

  res.send(balances);
});

app.listen(5555, () => {
  console.log("Running on port 5555");
});
