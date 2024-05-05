import DotLoader from '../../DotLoader';
import styles from './Header.module.scss';

export default function ChatHeader({ onClick, loading }: { onClick: (b: boolean) => void; loading: boolean }) {
	return (
		<div className={styles.header}>
			{loading ? (
				<div className={styles.loader}>
					<DotLoader />
				</div>
			) : (
				<div className={styles.profile}>
					<span className={styles.status} />
					Support
				</div>
			)}
			<button className={styles.exit} onClick={() => onClick(false)}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='M18 6 6 18' />
					<path d='m6 6 12 12' />
				</svg>
			</button>
		</div>
	);
}
