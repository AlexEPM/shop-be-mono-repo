import express from 'express';
import * as process from 'process';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.all('/*', (req, res) => {
  console.log('originalUrl', req.originalUrl);
  console.log('originalMethod', req.method);
  console.log('originalBody', req.body);

  const url = req.originalUrl.split('?')[0];
  const recipient = url.split('/')[1];
  console.log('recipient', recipient);

  const recipientURL = process.env[recipient];
  console.log(recipientURL);

  if (recipientURL) {
    const queryParameter = Object.values(req.query)[0] || '';

    const axiosConfig = {
      method: req.method,
      url: `${recipientURL}/${recipient}/${queryParameter}`,
      ...(Object.keys(req.body || {}).length > 0 && {data: req.body})
    };

    console.log('axiosConfig', axiosConfig);

    axios(axiosConfig)
        .then(function (response) {
          console.log('response from recipient', response.data);
          res.json(response.data);
        })
        .catch((error) => {
          console.log('some error', JSON.stringify(error));

          if (error.response) {
            const { status, data } = error.response;

            res.status(status).json(data);
          } else {
            res.status(500).json({ error: error.message});
          }
        });
  } else {
    res.status(502).json({ error: 'Cannot process request'});
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
