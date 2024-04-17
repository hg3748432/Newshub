import { Router, Request, Response } from 'express';
import Users from '../models/UserModel';
const userRoute = Router();

userRoute.post('/register', async (req: Request, res: Response) => {
	try {
		const newItem = await Users.create(req.body);
		newItem.save();
		res.send('User created');
	} catch (err) {
		res.status(400).send(err);
	}
});

userRoute.post('/login', async (req: Request, res: Response) => {
	try {
		// in production we gonna hash the password before storing it in the database, but for now we will just store the password as it is
		const result = await Users.findOne({
			email: req.body.email,
			password: req.body.password,
		});

		res.send(result);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
});

export { userRoute };
