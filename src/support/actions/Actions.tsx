import { socket } from '../../socket';
import { IConnection } from '../Support';
import styles from './Actions.module.scss';

export default function Actions({
	activeConnection,
	setActiveConnection,
	connections,
	setConnections,
}: {
	activeConnection: IConnection;
	setActiveConnection: (b: null) => void;
	connections: IConnection[];
	setConnections: (c: IConnection[]) => void;
}) {
	return (
		<div className={styles.actions}>
			<div className={styles.header}>Действия</div>
			<div className={styles.action}>
				<button
					onClick={() => {
						socket.emit('disconnect-connection', { ip: activeConnection.ip });
						setActiveConnection(null);
						const cons = connections;
						const conId = cons.findIndex(c => c.ip === activeConnection.ip);
						if (conId) cons.splice(conId, 1);
						setConnections(cons);
					}}
				>
					Отключить
				</button>
			</div>
		</div>
	);
}
