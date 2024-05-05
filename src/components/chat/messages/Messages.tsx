import { useEffect, useRef } from 'react';
import DotLoader from '../../DotLoader';
import styles from './Messages.module.scss';

export interface IMessage {
	for: 'support' | 'me';
	text: string;
}

export default function Messages({ messages, loading }: { messages: IMessage[]; setMessages: (v: IMessage[]) => void; loading: boolean }) {
	const msgRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (msgRef.current) {
			msgRef.current.scrollTo({ top: msgRef.current.scrollHeight });
		}
	}, [messages]);
	return (
		<div className={styles.messages} ref={msgRef}>
			{loading ? (
				<div className={styles.loader}>
					<DotLoader />
				</div>
			) : (
				messages.map((m, i) => (
					<div className={styles.message} data-from={m.for} key={i}>
						<div className={styles.text}>{m.text}</div>
					</div>
				))
			)}
		</div>
	);
}
