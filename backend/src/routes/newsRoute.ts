import { Router, Request, Response } from 'express';
import NewsItems from '../models/NewsItem';
const newsRoute = Router();

newsRoute.post('/addnewsitem', async (req: Request, res: Response) => {
	try {
		const newItem = await NewsItems.create(req.body);
		newItem.save();
		res.send('news item created');
	} catch (err) {
		res.status(400).send(err);
	}
});

newsRoute.get('/getallnewsitems', async (req: Request, res: Response) => {
	try {
		const newItem = await NewsItems.find();

		res.send(newItem);
	} catch (err) {
		res.status(400).send(err);
	}
});

newsRoute.post('/getallpostbyuserid', async (req: Request, res: Response) => {
	try {
		const newItem = await NewsItems.find();
		const userPosted = newItem.filter(
			(obj) => obj.postedBy.userid == req.body.userid
		);

		res.send(userPosted);
	} catch (err) {
		res.status(400).send(err);
	}
});
newsRoute.post('/getDetail', async (req: Request, res: Response) => {
	try {
		const newItem = await NewsItems.findOne({ _id: req.body.newsid });

		res.send(newItem);
	} catch (err) {
		res.status(400).send(err);
	}
});

newsRoute.post('/editmynotes', async (req: Request, res: Response) => {
	try {
		const newItem = await NewsItems.findOneAndUpdate(
			{ _id: req.body.newsid },
			req.body
		);
		newItem.save();
		res.send('Item Edited');
	} catch (err) {
		res.status(400).send(err);
	}
});

newsRoute.post('/deletenotes', async (req: Request, res: Response) => {
	try {
		await NewsItems.findOneAndDelete({ _id: req.body.newsid });

		res.send('Item Deleted');
	} catch (err) {
		res.status(400).send(err);
	}
});

export { newsRoute };
