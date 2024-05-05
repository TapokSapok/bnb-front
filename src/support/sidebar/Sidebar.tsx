import styles from './Sidebar.module.scss';
import { IConnection } from '../Support';
import { socket } from '../../socket';

export default function SidebarSupport({
	connections,
	setActiveConnection,
	activeConnection,
}: {
	connections: IConnection[];
	setActiveConnection: (c: IConnection) => void;
	activeConnection: IConnection | null;
}) {
	return (
		<div className={styles.sidebar}>
			<div className={styles.header}>Connections</div>
			<div className={styles.connections}>
				{connections.map(con => (
					<div
						className={styles.connection}
						onClick={() => {
							socket.emit('get-connection', con.ip);
							setActiveConnection(con);
						}}
						key={con.ip}
						style={activeConnection?.ip === con.ip ? { background: 'rgba(1,1,1,0.5)' } : {}}
					>
						{con.ip}
					</div>
				))}
			</div>
		</div>
	);
}
