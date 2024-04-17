import { Layout } from '../components/Layout';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface NewsItem {
	_id: string;
	title: string;
	description: string;
	content: string | any;
	postedBy: string;
	createdAt: string;
}

const NewsDescription: React.FC = () => {
	const { newsid } = useParams();

	const [newsItem, setNewsItem] = useState<NewsItem>({
		_id: '',
		title: '',
		description: '',
		content: '',
		postedBy: '',
		createdAt: '',
	});
	const getData = async () => {
		try {
			const result = await axios.post(
				'https://notenewsapp.herokuapp.com/api/newsitems/getDetail',
				{
					newsid: newsid,
				}
			);

			setNewsItem(result.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Layout>
			<div className='p-5 space-y-10'>
				<h1 className='text-primary text-3xl font-bold'>{newsItem.title}</h1>
				<p className='text-primary text-lg font-bold'>{newsItem.description}</p>

				<p>{newsItem.content}</p>
			</div>
		</Layout>
	);
};

export { NewsDescription };
