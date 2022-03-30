import express from 'express';
import { register, login } from '../controllers/authController';

const Route = express.Router();

Route.post('/register', register);
Route.get('/register', (req, res) => {
    console.log('register call')
    res.status(200).send('register call')
});

Route.post('/login', login)


module.exports = Route;
