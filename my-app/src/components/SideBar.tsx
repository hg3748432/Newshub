import { Link, useLocation } from 'react-router-dom';
import LanguageIcon from '@material-ui/icons/Language';
import { useNavigate } from 'react-router-dom';
interface Props {
	showSideBar: boolean;
}

export const SideBar: React.FC<Props> = ({ showSideBar }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const menuItems = [
		{
			title: 'Latest',
			path: '/latest',
		},
		{
			title: 'Note Hub',
			path: '/home',
		},
		{
			title: 'My Notes',
			path: '/posted',
		},
		{
			title: 'Add Notes',
			path: '/addnews',
		},

		{
			title: 'Logout',
			path: '/logout',
		},
	];
	//implementing the logic for logout
	const logout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};
	return (
		<div
			className={`min-h-screen max-h-full transition-all duration-300 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  h-screen flex flex-col overflow-hidden ${showSideBar ? `w-60` : 'w-0'
				}`}
		>
			<div>
				<h1 className='text-4xl font-bold mt-5 text-gray-200'>
					BREAKING NEWS
				</h1>
			</div>
			<div className='flex flex-col mt-20'>
				{menuItems.map((item, i) => {
					return item.title !== 'Logout' ? (
						<Link
							key={i}
							to={`${item.path}`}
							className={`text-gray-100 hover:bg-gray-400 py-5 text-sm
                    ${location.pathname.includes(item.path) &&
								`bg-[#6172cf] text-yellow-200`
								}`}
						>
							<LanguageIcon className='mr-3' />
							{item.title}
						</Link>
					) : (
						<span
							key={i}
							onClick={logout}
							className='text-gray-100 hover:bg-gray-400 py-5 text-sm cursor-pointer'
						>
							Logout
						</span>
					);
				})}
			</div>
		</div>
	);
};
