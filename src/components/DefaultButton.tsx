import styles from '../styles.module.scss';
import DotLoader from './DotLoader';

const DefaultButton = ({ title, loading = false }: { title: string; onClick: () => void; loading?: boolean; setLoading?: (v: boolean) => void }) => {
	return (
		<button disabled={loading} className={loading ? styles.loading_default_button : styles.default_button}>
			{loading ? <DotLoader /> : title}
		</button>
	);
};

export default DefaultButton;
