import { EditorState, convertToRaw } from 'draft-js';
import { toast } from 'react-toastify';
import { Layout } from '../components/Layout';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { Spinner } from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const EditNews: React.FC = () => {
	const { newsid } = useParams();
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	//get logged in user's local storage value and set it to the variable user
	const user = JSON.parse(localStorage.getItem('token') || '');

	const navigate = useNavigate();

	const save = async () => {
		setLoading(true);
		try {
			const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
			const value = blocks
				.map(
					(block: { text: string }) =>
						(!block.text.trim() && '\n') || block.text
				)
				.join('\n');
			const data = {
				title,
				description,
				content: value,
				postedBy: { userid: user._id, email: user.email },
				newsid: newsid,
			};

			await axios.post(
				'https://notenewsapp.herokuapp.com/api/newsitems/editmynotes',
				data
			);
			setLoading(false);
			toast.success('News item edited successfully');
			navigate('/home');
		} catch (error) {
			console.log(error);
			setLoading(false);
			toast.error('Error editing news item');
		}
	};

	return (
		<Layout>
			{loading && <Spinner />}
			<h1 className='text-2xl font-semibold mt-5 ml-5'>Edit news</h1>
			<div className='px-5'>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type='text'
					className='border-2 h-10 w-full border-gray-500 px-2'
					placeholder='Title'
				/>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='border-2  w-full border-gray-500 my-2 px-2'
					rows={4}
					placeholder='Description'
				></textarea>
			</div>
			<div className='border-2 border-gray-500 mx-5 rounded px-2'>
				<Editor
					editorClassName='input-content'
					editorState={editorState}
					onEditorStateChange={setEditorState}
				/>
			</div>

			<div className='flex justify-end space-x-5 pr-5 pt-6'>
				<button
					className='px-5 py-2 bg-red-500'
					onClick={() => navigate('/home')}
				>
					Cancel
					<CancelIcon />
				</button>
				<button className='px-5 py-2 bg-green-600' onClick={save}>
					Save
					<SaveAltIcon />
				</button>
			</div>
		</Layout>
	);
};

export { EditNews };
