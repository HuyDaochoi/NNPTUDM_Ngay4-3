const express = require('express');
const app = express();

app.use(express.json());

const roleRoutes = require('./routes/role');
const userRoutes = require('./routes/users');

app.use('/roles', roleRoutes);
app.use('/users', userRoutes);

module.exports = app;