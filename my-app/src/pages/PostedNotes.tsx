import { Layout } from 'src/components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '../components/Spinner';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
type NewsItem = {
	_id: string;
	title: string;
	description: string;
	content: string;
	postedBy: {
		email: string;
		_id: string;
	};
	createdAt?: string;
};

const PostedNotes: React.FC = () => {
	const { newsid } = useParams();
	const navigate = useNavigate();
	const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState(false);
	const user = JSON.parse(localStorage.getItem('token') || '');
	const getData = async () => {
		setLoading(true);
		try {
			const result = await axios.post(
				'https://notenewsapp.herokuapp.com/api/newsitems/getallpostbyuserid',
				{
					userid: user._id,
				}
			);
			setLoading(false);
			setNewsItems(result.data);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
	useEffect(() => {
		getData();
	}, []);

	const deleteNotes = async (newsid: string) => {
		setLoading(true);
		try {
			await axios.post(
				'https://notenewsapp.herokuapp.com/api/newsitems/deletenotes',
				{
					newsid,
				}
			);
			getData();
			setLoading(false);

			toast.success('News item deleted successfully');
		} catch (error) {
			console.log(error);
			setLoading(false);
			toast.error('Error deleting news item');
		}
	};

	return (
		<Layout>
			{loading && <Spinner />}
			{newsItems.length > 0 && (
				<div className='p-10'>
					<h1 className='text-3xl text-gray-700 mb-5 font-bold'>My Notes </h1>
					<table className='w-full border-2 border-gray-500 p-10'>
						<thead className='w-full '>
							<tr className='w-full '>
								<th className='border-2 border-gray-600 p-2'>ID</th>
								<th className='border-2 border-gray-600 p-2'>Title</th>
								<th className='border-2 border-gray-600 p-2'>Posted On</th>
								<th className='border-2 border-gray-600 p-2'>Modify</th>
							</tr>
						</thead>
						<tbody>
							{newsItems.map((item, i) => {
								return (
									<tr key={i}>
										<td className='border-2 border-gray-500 '>{item._id}</td>
										<td className='border-2 border-gray-500 '>{item.title}</td>
										<td className='border-2 border-gray-500 '>
											{item.createdAt?.slice(0, 10)}
										</td>

										<td className='border-2 border-gray-500 p-2 items-center'>
											<div className='flex space-x-2 justify-around'>
												<button
													className='px-5 py-2 bg-red-500'
													onClick={() => navigate(`/edit/${item._id}`)}
												>
													{' '}
													Edit
													<EditIcon />
												</button>
												<button
													className='px-5 py-2 bg-green-600'
													onClick={() => deleteNotes(item._id)}
												>
													{' '}
													Delete
													<DeleteIcon />
												</button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</Layout>
	);
};

export { PostedNotes };
