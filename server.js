const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

// 1. Seal and harden dynamic response headers using Helmet
app.use(helmet());

// 2. Configure CORS whitelist to accept requests exclusively from React port 5173
const corsOptions = {
  origin: ['http://localhost:5173', 'https://jherry268.vercel.app'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// 3. Map REST routing controllers API pipelines
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);

// 4. Connect to Local/Cloud MongoDB Database server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server active on port ${PORT}`));
  })
  .catch((err) => console.log('MongoDB gate failed: ', err));