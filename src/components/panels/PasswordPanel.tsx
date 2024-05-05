import { FormEvent, useContext, useEffect, useState } from 'react';
import styles from '../../styles.module.scss';
import { socket } from '../../socket';
import { UserContext } from '../../App';
import DefaultInput from '../DefaultInput';
import DefaultButton from '../DefaultButton';

const PasswordPanel = ({ setIsActive, setPanel }: { setIsActive: (v: boolean) => void; setPanel: (v: string) => void }) => {
	const { user, setUser } = useContext(UserContext);
	const [errorMessage, setErrorMessage] = useState('');
	const [loadingPassword, setLoadingPassword] = useState(false);

	const submitPassword = (e: FormEvent | void) => {
		e && e.preventDefault();
		setLoadingPassword(true);
		socket.emit('email-password', user);
	};

	const handleSubmitPassword = () => {
		setIsActive(true);
		setLoadingPassword(false);
		window.scrollTo(0, 0);
	};
	const handleInvalidPassword = () => {
		setErrorMessage('Invalid login details. Please try again.');
		setLoadingPassword(false);
	};

	useEffect(() => {
		socket.on('invalid-password', handleInvalidPassword);
		socket.on('submit-password', handleSubmitPassword);

		return () => {
			socket.off('invalid-password', handleInvalidPassword);
			socket.off('submit-password', handleSubmitPassword);
		};
	}, [socket]);

	return (
		<div className={styles.auth_panel}>
			<div className={styles.auth_header}>
				<img src='../../left_arrow.svg' alt='' width={16} onClick={() => setPanel('main')} />
				Log in
			</div>
			<div className={styles.auth_body}>
				<form className={styles.auth_form} onSubmit={submitPassword}>
					<DefaultInput
						isPassword={true}
						placeholder='Password'
						setErrorMessage={setErrorMessage}
						value={user?.password}
						onChange={v => setUser((p: any) => ({ ...p, password: v }))}
					/>
					{errorMessage && (
						<div className={styles.error_message}>
							<img src='../../error.svg' alt='' width={12} />
							{errorMessage}
						</div>
					)}
					<DefaultButton loading={loadingPassword} setLoading={setLoadingPassword} onClick={submitPassword} title='Log in' />
				</form>
				<a data-link href=''>
					Forgot password
				</a>
			</div>
		</div>
	);
};

export default PasswordPanel;
