const express = require("express");
require("dotenv").config();
const axios = require("axios").default;

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());

app.all("/*", (req, res) => {
  const recepient = req.originalUrl.split("/")[1];
  console.log({ recepient });

  const recepientURL = process.env[recepient];
  console.log({ recepientURL });

  if (recepientURL) {
    const axiosConfig = {
      method: req.method,
      url: `${recepientURL}${req.originalUrl}`,
      ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
    };

    console.log({ axiosConfig });

    axios(axiosConfig)
      .then((res) => {
        console.log("axios res", res);
        res.json(res.data);
      })
      .catch((err) => {
        console.log("axios error", err);

        if (err.response) {
          const { status, data } = err.response;

          res.status(status).json(data);
        } else {
          res.status(500).json({ error: err.message });
        }
      });
  } else {
    res.status(502).json({ error: "unknown service" });
  }
});

app.listen(PORT, () => {
  console.log("Service is running on port ", PORT);
});
