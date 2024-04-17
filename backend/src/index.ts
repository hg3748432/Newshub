import express from 'express';
const dotenv = require("dotenv");


const app = express();
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 5000;
import mongoose from 'mongoose';
import 'dotenv/config';
import { newsRoute } from './routes/newsRoute';
import { userRoute } from './routes/userRoute';


mongoose
	.connect(`${process.env.MONGO}`)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log('Error:', err.message);
	});

app.use('/api/newsitems', newsRoute);
app.use('/api/users', userRoute);
app.get('/', (req, res) => {
	res.send('Hello World!');
});
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
