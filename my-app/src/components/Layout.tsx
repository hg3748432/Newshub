import { SideBar } from './SideBar';
import { useState } from 'react';
import { List } from '@material-ui/icons';
type Props = {};

export const Layout: React.FC<Props> = ({ children }) => {
	const [showSideBar, setShowSideBar] = useState(true);

	return (
		<div className='layout flex w-full h-full'>
			<div className='sidebar'></div>
			<div className='content'></div>
			<SideBar showSideBar={showSideBar} />
			<div className='w-full'>
				<div className='header bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-20 w-full flex items-center'>
					<List
						style={{ fontSize: 60, color: 'white' }}
						className='folding'
						onClick={() => setShowSideBar(!showSideBar)}
					/>
				</div>
				<div className='content max-h-[100vh] overflow-y-auto bg-blue-100'> {children}</div>
			</div>
		</div>
	);
};
