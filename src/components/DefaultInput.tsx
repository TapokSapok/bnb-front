import { useState } from 'react';
import styles from '../styles.module.scss';

const DefaultInput = ({
	onChange,
	value = '',
	setErrorMessage,
	placeholder,
	regExp,
	isPassword = false,
}: {
	onChange: (v: string) => void;
	value: string | undefined;
	setErrorMessage: (v: string) => void;
	placeholder: string;
	regExp?: RegExp;
	isPassword?: boolean;
}) => {
	const [focused, setFocused] = useState(false);
	const [inputError, setInputError] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<div
				className={styles.input_box}
				onBlur={() => setFocused(false)}
				onFocus={() => setFocused(true)}
				style={
					focused
						? { boxShadow: `inset 0 0 0 2px ${inputError ? '#C13515' : '#222222'}` }
						: inputError
						? {
								boxShadow: `inset 0 0 0 1px #C13515`,
								background: '#FFF8F6',
						  }
						: {}
				}
			>
				<label>
					<div
						className={styles.label_title}
						style={
							focused || value.length
								? {
										transform: 'translateY(-10px) scale(0.75)',
										left: isPassword ? '5px' : '8px',
										height: '15px',
										fontWeight: inputError ? '700' : '',
										color: inputError ? '#C13515' : '',
								  }
								: {}
						}
					>
						{placeholder}
					</div>
					<div className={styles.input_wrapper} style={focused || value.length ? { opacity: '1' } : {}}>
						<input
							type={isPassword && !showPassword ? 'password' : 'text'}
							onChange={e => {
								onChange(e.target.value);
								setInputError(e.target.value.length ? !e.target.value.match(regExp!) : false);
								if (regExp && e.target.value.match(regExp)) {
									setErrorMessage('');
								}
							}}
							style={value.length && inputError && !focused ? { background: '#FFF8F6' } : {}}
							placeholder={placeholder}
						/>
					</div>
				</label>
				{isPassword && (
					<div className={styles.password_container}>
						<div className={styles.show_password} onClick={() => setShowPassword(p => !p)}>
							{showPassword ? 'Hide' : 'Show'}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default DefaultInput;
