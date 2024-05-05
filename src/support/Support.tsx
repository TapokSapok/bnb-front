import { useEffect, useState } from 'react';
import styles from './Support.module.scss';
import SidebarSupport from './sidebar/Sidebar';
import { IMessage } from '../components/chat/messages/Messages';
import { socket } from '../socket';
import Chat from './chat/Chat';
import Flows, { IFlow } from './flows/Flows';
import { useSearchParams } from 'react-router-dom';
import Actions from './actions/Actions';

export interface IConnection {
	ip: string;
	messages: IMessage[];
	flows: IFlow[];
}

export default function Support() {
	const [connections, setConnections] = useState<IConnection[]>([]);
	const [activeConnection, setActiveConnection] = useState<IConnection | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (!socket) return;

		socket.on('connect', () => {
			socket.emit('join-support');
		});

		socket.on('connections', (c: IConnection[]) => {
			console.log(c);
			setConnections(c);
		});

		socket.on('messages', (con: IConnection) => setActiveConnection(p => ({ ...p!, messages: con.messages })));
		socket.on('message', ({ ip, text }: { ip: string; text: string }) => {
			console.log('message', ip, text);
			if (activeConnection?.ip === ip) {
				const newMessages = [...activeConnection!.messages, { for: 'me', text }] as IMessage[];
				setActiveConnection({ ip, messages: newMessages, flows: activeConnection.flows });
			}
			const conId = connections.findIndex(c => c.ip === ip);
			if (conId !== -1) {
				const newConnections = connections.splice(conId, 1);
				setConnections(newConnections);
			}
		});
		socket.on('flows', ({ ip, flows }: { ip: string; flows: IFlow[] }) => {
			if (activeConnection?.ip === ip) {
				setActiveConnection({ ...activeConnection, flows });
			}
		});
	}, [socket, activeConnection]);

	useEffect(() => {
		const ip = searchParams.get('con');
		if (ip && activeConnection?.ip !== ip) {
			const con = connections.find(c => c.ip === ip);
			if (con) {
				setActiveConnection(con);
				socket.emit('get-connection', con.ip);
			}
		}
	}, [connections]);

	useEffect(() => {
		const ip = searchParams.get('con');
		if (activeConnection && ip !== activeConnection.ip) {
			setSearchParams({ con: activeConnection.ip });
		}
	}, [activeConnection]);

	return (
		<div className={styles.support}>
			<SidebarSupport connections={connections} setActiveConnection={setActiveConnection} activeConnection={activeConnection} />
			{activeConnection && <Chat connection={activeConnection} setConnection={setActiveConnection} />}
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{activeConnection && <Flows flows={activeConnection.flows} />}
				{activeConnection && <Actions connections={connections} setConnections={setConnections} activeConnection={activeConnection} setActiveConnection={setActiveConnection} />}
			</div>
		</div>
	);
}
