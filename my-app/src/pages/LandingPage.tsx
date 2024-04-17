import { Player } from '@lottiefiles/react-lottie-player';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';

const LandingPage = () => {
	const [showLoginForm, setShowLoginForm] = useState(false);
	const [showRegisterForm, setShowRegisterForm] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const login = async () => {
		setLoading(true);
		try {
			const payload = {
				email,
				password,
			};
			const result = await axios.post(
				'https://notenewsapp.herokuapp.com/api/users/login',
				payload
			);
			setLoading(false);
			toast.success('Login Successful, go ahead and explore');
			localStorage.setItem('token', JSON.stringify(result.data));
			navigate('/latest');
		} catch (error) {
			toast.error('Login Failed');
			setLoading(false);
		}
	};

	const register = async () => {
		setLoading(true);
		try {
			const payload = {
				name,
				email,
				password,
			};
			//check password length, should be greater than 6
			if (password.length < 6) {
				toast.error('Password should be at least 6 characters');
				setLoading(false);
				return;
			}
			await axios.post(
				'https://notenewsapp.herokuapp.com/api/users/register',
				payload
			);
			setLoading(false);
			toast.success('Registration Successful, go ahead and log in');
			setShowRegisterForm(false);
			setShowLoginForm(true);
			setName('');
			setEmail('');
			setPassword('');
		} catch (error) {
			toast.error('Registration Failed');
			setLoading(false);
		}
	};

	//after the user logs in, we need to redirect them to the latest page,not the registration page
	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/latest');
		}
	}, []);

	return (
		<div className='h-screen flex items-center sm:flex-col'>
			{loading && <Spinner />}
			<div
				className={`w-1/2 px-10 space-y-5  sm:w-screen ${(showLoginForm || showRegisterForm) && `sm:hidden`
					}`}
			>
				<h1>
					<b className='text-[#3273a8] text-8xl'>News</b>
					<b className='text-[#32a871] text-8xl'>Hub</b>
				</h1>
				<p className='text-lg '>
					Brings you the latest news from the world. Don't wait, register Now!
				</p>
				<div className='space-x-8 p-5 '>
					<button
						className='bg-[#32a871] px-10 text-white py-3 sm:p-1'
						onClick={() => {
							setShowRegisterForm(false);
							setShowLoginForm(true);
						}}
					>
						LOG IN
					</button>
					<button
						className='bg-[#3273a8] px-10 text-white py-3 sm:p-1 ml-0'
						onClick={() => {
							setShowLoginForm(false);
							setShowRegisterForm(true);
						}}
					>
						REGISTER
					</button>
				</div>
			</div>

			<div className='w-1/2 sm:w-screen'>
				{!showLoginForm && !showRegisterForm && (
					<Player
						// set the ref to your class instance
						autoplay={true}
						loop={true}
						src='https://assets6.lottiefiles.com/packages/lf20_y2nlvxyz.json'
						style={{ height: '400px', width: '400px' }}
					></Player>
				)}

				{showLoginForm && !showRegisterForm && (
					<div className='ml-40 sm:ml-0'>
						<div className='flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5'>
							<h1 className='text-4xl text-gray-200 text-left w-full my-5'>
								LOG IN
							</h1>

							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='text'
								className='border-2 h-10 w-full border-gray-500 px-2 bg-transparent text-gray-200'
								placeholder='Email'
							/>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type='password'
								className='border-2 h-10 w-full border-gray-500 px-2 bg-transparent text-gray-200'
								placeholder='Password'
							/>
							<div className='flex justify-end w-full'>
								<button
									className='bg-[#3273a8] px-10 text-white py-3 sm:p-1 ml-0'
									onClick={login}
								>
									LOG IN
								</button>
							</div>
						</div>
					</div>
				)}

				{!showLoginForm && showRegisterForm && (
					<div className='ml-40 sm:ml-0'>
						<div className='flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5'>
							<h1 className='text-4xl text-gray-200 text-left w-full my-5'>
								Register
							</h1>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								type='text'
								className='border-2 h-10 w-full border-gray-500 px-2 bg-transparent text-gray-200'
								placeholder='Name'
							/>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='text'
								className='border-2 h-10 w-full border-gray-500 px-2 bg-transparent text-gray-200'
								placeholder='Email'
							/>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type='password'
								className='border-2 h-10 w-full border-gray-500 px-2 bg-transparent text-gray-200'
								placeholder='Password'
							/>
							<div className='flex justify-end w-full'>
								<button
									className='bg-[#3273a8] px-10 text-white py-3 sm:p-1 ml-0'
									onClick={register}
								>
									REGISTER
								</button>
							</div>
						</div>
					</div>
				)}

				{(showRegisterForm || showLoginForm) && (
					<HighlightOffIcon
						onClick={() => {
							setShowLoginForm(false);
							setShowRegisterForm(false);
						}}
						className=' absolute z-10 cursor-pointer top-10 right-10'
						style={{ fontSize: 50 }}
					/>
				)}
			</div>
		</div>
	);
};
export { LandingPage };
