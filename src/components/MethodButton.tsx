import styles from '../styles.module.scss';

const MethodButton = ({ img, title, onClick }: { img: string; title: string; onClick?: () => void }) => {
	return (
		<button className={styles.method_button} onClick={onClick}>
			<img src={img} alt='' width={20} height={20} />
			<div className={styles.title}>{title}</div>
		</button>
	);
};

export default MethodButton;
