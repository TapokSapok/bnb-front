import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './Chat.module.scss';
import { IConnection } from '../Support';
import { socket } from '../../socket';

export default function Chat({ connection, setConnection }: { connection: IConnection; setConnection: (c: IConnection) => void }) {
	const [text, setText] = useState('');
	const msgRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (msgRef.current) {
			msgRef.current.scrollTo({ top: msgRef.current.scrollHeight });
		}
	}, [connection.messages]);

	useEffect(() => {
		console.log(connection);
	}, [connection]);
	const handleSubmit = (e: FormEvent) => {
		if (e) e.preventDefault();
		setConnection({ ...connection, messages: [...connection.messages, { for: 'support', text }] });
		socket.emit('support-message', { ip: connection?.ip, text });
		setText('');
	};
	return (
		<div className={styles.chat}>
			<div className={styles.header}>Чат</div>
			<div className={styles.messages} ref={msgRef}>
				{connection?.messages.length ? (
					connection.messages.map((m, i) => {
						return (
							<div className={styles.message} data-from={m.for} key={i}>
								<div className={styles.text}>{m.text}</div>
							</div>
						);
					})
				) : (
					<h4>Сообщений нет</h4>
				)}
			</div>
			<form className={styles.field} onSubmit={handleSubmit}>
				<input type='text' placeholder='Enter a message...' value={text} onChange={e => setText(e.target.value)} />
			</form>
		</div>
	);
}
