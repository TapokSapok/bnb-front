import { useEffect, useState } from 'react';
import Field from '../field/Field';
import ChatHeader from '../header/Header';
import Messages, { IMessage } from '../messages/Messages';
import styles from './Modal.module.scss';
import { socket } from '../../../socket';
import { AnimatePresence, motion } from 'framer-motion';

export default function ChatModal({ isActive, setIsActive }: { isActive: boolean; setIsActive: (b: boolean) => void }) {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!socket) return;
		setLoading(!socket.connected);
		socket.on('connect', () => {
			setLoading(false);
			socket.emit('add-connection');
			socket.on('messages', (messages: any) => {
				setMessages((prev: IMessage[]) => [...prev, ...messages]);
			});
			socket.on('message', text => {
				console.log('msg', text);
				setMessages((prev: IMessage[]) => [...prev, { for: 'support', text }]);
				setIsActive(true);
			});
		});
		socket.on('disconnect', () => setLoading(true));

		return () => {};
	}, [socket]);

	if (!isActive) return null;
	return (
		<AnimatePresence>
			<motion.div //
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				className={styles.modal}
			>
				<ChatHeader onClick={setIsActive} loading={loading} />
				<Messages setMessages={setMessages} messages={messages} loading={loading} />
				<Field loading={loading} setMessages={setMessages} />
			</motion.div>
		</AnimatePresence>
	);
}
