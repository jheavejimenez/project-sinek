const express = require('express');
const fs = require("fs");
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
const cert = process.env.CA_CERT;

cert && fs.writeFileSync("./ca-certificate.crt", cert);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsCAFile: cert ? "./ca-certificate.crt" : undefined
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connected');
});

const evaluationRouter = require('./routes/evaluations');
const memberRouter = require('./routes/members');

app.use('/api/evaluations', evaluationRouter);
app.use('/api/members', memberRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
