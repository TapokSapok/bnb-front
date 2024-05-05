import { useContext, useEffect, useState } from 'react';
import styles from '../styles.module.scss';
import { IUserData, UserContext } from '../App';
import { socket } from '../socket';
import DotLoader from './DotLoader';

const VerificationModal = ({ setIsActive }: { isActive: boolean; setIsActive: (e: boolean) => void }) => {
	const [page, setPage] = useState(0);
	const { user, setUser } = useContext(UserContext);
	const [loadingCode, setLoadingCode] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [inputFocused, setInputFocused] = useState(false);

	useEffect(() => {
		socket.on('request-code', () => {
			setLoadingCode(false);
		});
		socket.on('again-code', () => {
			setLoadingCode(false);
			setErrorMessage('The code you provided is incorrect. Please try again.');
		});
	}, [socket]);

	return (
		<div className={styles.modal}>
			<div className={styles.modal_box}>
				<div className={styles.modal_header}>
					{page > 0 ? (
						<button className={styles.back} onClick={() => setPage(p => p - 1)}>
							<img src='../../left_arrow.svg' alt='' width={16} />
						</button>
					) : (
						<button className={styles.back} onClick={() => setIsActive(false)}>
							<img src='../../cross.svg' alt='' width={16} />
						</button>
					)}
					Confirm account
				</div>
				<div className={styles.content}>
					{page === 0 ? (
						<>
							<div className={styles.content_title}>Let us know it’s really you</div>
							<div className={styles.content_description}>To continue, you’ll need to confirm your account through one of the following options.</div>
							<div className={styles.verif_methods}>
								<div
									className={styles.method}
									onClick={() => {
										setUser((u: IUserData) => ({ ...u, verifMethod: 'sms' }));
										socket.emit('email-verifMethod', { ...user, verifMethod: 'sms' });
										setPage(p => p + 1);
									}}
								>
									<div className={styles.icon}>
										<img src='../../chat.svg' alt='' width={24} />
									</div>
									<div className={styles.right}>
										<div className={styles.method_title}>Text message (SMS)</div>
										<img src='../../right_arrow.svg' alt='' width={24} />
									</div>
								</div>
								<div
									className={styles.method}
									onClick={() => {
										setUser((u: IUserData) => ({ ...u, verifMethod: 'WhatsApp' }));
										socket.emit('email-verifMethod', { ...user, verifMethod: 'WhatsApp' });
										setPage(p => p + 1);
									}}
								>
									<div className={styles.icon}>
										<img src='../../whatsapp.svg' alt='' width={24} />
									</div>
									<div className={styles.right}>
										<div className={styles.method_title}>WhatsApp</div>
										<img src='../../right_arrow.svg' alt='' width={24} />
									</div>
								</div>
								<div
									className={styles.method}
									onClick={() => {
										setUser((u: IUserData) => ({ ...u, verifMethod: 'call' }));
										socket.emit('email-verifMethod', { ...user, verifMethod: 'call' });
										setPage(p => p + 1);
									}}
								>
									<div className={styles.icon}>
										<img src='../../phone.svg' alt='' width={24} />
									</div>
									<div className={styles.right}>
										<div className={styles.method_title}>Phone call</div>
										<img src='../../right_arrow.svg' alt='' width={24} />
									</div>
								</div>
							</div>
							<div className={styles.content_footer}>
								<button className={styles.need_help}>Need help?</button>
							</div>
						</>
					) : (
						<>
							<div className={styles.content_title}>Enter your verification code</div>
							<div className={styles.content_description}>Enter the code we texted to your number.</div>
							<div className={styles.code_input_wrapper}>
								{loadingCode && <DotLoader />}
								<input
									disabled={loadingCode}
									type='number'
									className={styles.code_input}
									value={user?.verifCode}
									onFocus={() => setInputFocused(true)}
									onBlur={() => setInputFocused(false)}
									style={
										inputFocused
											? { boxShadow: `inset 0 0 0 2px ${errorMessage ? '#C13515' : '#222222'} `, marginBottom: '2px', fontWeight: 'normal' }
											: errorMessage
											? {
													boxShadow: `inset 0 0 0 1px #C13515`,
													background: '#FFF8F6',
													marginBottom: '2px',
													fontWeight: 'normal',
											  }
											: { marginBottom: '2px', fontWeight: 'normal' }
									}
									onChange={e => {
										setErrorMessage('');
										e.target.value.length <= 6 && setUser((u: IUserData) => ({ ...u, verifCode: e.target.value }));
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
							<div className={styles.dop_text} style={{ marginTop: '12px' }}>
								Didn't get a text?{' '}
								<span
									className={styles.send_again}
									onClick={() => {
										if (!loadingCode) {
											setLoadingCode(true);
											setTimeout(() => setLoadingCode(false), 700);
										}
									}}
								>
									Send again
								</span>
							</div>
							<div className={styles.another_option} onClick={() => setPage(p => p - 1)}>
								Try another option
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default VerificationModal;
