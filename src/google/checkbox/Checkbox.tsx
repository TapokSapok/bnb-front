'use client';
import styles from './Checkbox.module.scss';

export default function Checkbox({ active, onClick }: { active: boolean; onClick: (b: boolean) => void }) {
	return (
		<div className={styles.checkbox} onClick={() => onClick(!active)} data-active={active}>
			{active ? (
				<svg aria-hidden='true' viewBox='0 0 24 24'>
					<path fill='none' d='M1.73,12.91 8.1,19.28 22.79,4.59' strokeDashoffset={0}></path>
				</svg>
			) : (
				<></>
			)}
		</div>
	);
}
