'use client';
import { useState } from 'react';
import styles from './Field.module.scss';

export default function Field({
	label,
	onChange,
	value,
	errorMessage,
	type = 'text',
	showPass,
}: {
	label: string;
	onChange: (v: string) => void;
	value?: string;
	errorMessage?: string;
	type?: 'text' | 'password';
	showPass?: boolean;
}) {
	const [focused, setFocused] = useState(false);
	return (
		<>
			<div
				style={focused && !errorMessage ? { border: '2px solid #0b57d0' } : errorMessage ? { border: '2px solid #b3261e' } : {}}
				className={styles.input_wrapper}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			>
				<div
					style={focused || value ? { top: '-13px', fontSize: '12px', color: !errorMessage && focused ? '#0b57d0' : errorMessage ? '#b3261e' : '' } : { pointerEvents: 'none' }}
					className={styles.label}
				>
					{label}
				</div>
				<input type={!showPass && type === 'password' ? 'password' : 'text'} onChange={e => onChange(e.target.value)} />
			</div>
			{errorMessage && (
				<div className={styles.error_message}>
					<svg aria-hidden='true' fill='#b3261e' focusable='false' width='16px' height='16px' viewBox='0 0 24 24' xmlns='https://www.w3.org/2000/svg'>
						<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'></path>
					</svg>
					{errorMessage}
				</div>
			)}
		</>
	);
}
