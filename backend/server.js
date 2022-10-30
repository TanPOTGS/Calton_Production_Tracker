const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use Routes
const orders = require('./routes/orderRoutes');
const users = require('./routes/userRoutes');

app.use('/api/orders', orders);
app.use('/api/users', users);

//Serve frontend
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('Set to Production'))
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));