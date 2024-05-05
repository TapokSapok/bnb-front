import { FormEvent, useState } from 'react';
import styles from './Field.module.scss';
import { socket } from '../../../socket';
import { IMessage } from '../messages/Messages';

export default function Field({ loading, setMessages }: { loading: boolean; setMessages: (f: any) => any }) {
	const [text, setText] = useState('');
	const handleSubmit = (e: FormEvent) => {
		if (e) e.preventDefault();
		if (!text) return;
		socket.emit('message', text);
		setText('');
		setMessages((prev: IMessage[]) => [...prev, { for: 'me', text: text }]);
	};
	return (
		<form onSubmit={handleSubmit} className={styles.field} style={loading ? { opacity: '0.5', pointerEvents: 'none' } : {}}>
			<input type='text' placeholder='Enter a message...' value={text} onChange={e => setText(e.target.value)} />
			<button className={styles.send} type='submit'>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
					<path d='m3 3 3 9-3 9 19-9Z' />
					<path d='M6 12h16' />
				</svg>
			</button>
		</form>
	);
}
