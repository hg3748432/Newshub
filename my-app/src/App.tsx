import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AddNews } from './pages/AddNews';
import { Latest } from './pages/Latest';
import { LandingPage } from './pages/LandingPage';
import { PostedNotes } from './pages/PostedNotes';
import { EditNews } from './pages/EditNews';
import { NewsDescription } from './pages/NewsDescription';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div className='App'>
			<ToastContainer />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route
						path='/latest'
						element={
							<ProtectedRoute>
								<Latest />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/home'
						element={
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/addnews'
						element={
							<ProtectedRoute>
								<AddNews />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/edit/:newsid'
						element={
							<ProtectedRoute>
								<EditNews />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/posted'
						element={
							<ProtectedRoute>
								<PostedNotes />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/newsdesc/:newsid'
						element={
							<ProtectedRoute>
								<NewsDescription />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

export const ProtectedRoute = ({ children }: any) => {
	if (localStorage.getItem('token')) {
		return children;
	} else {
		return <Navigate to='/' />;
	}
};
