import styles from './ErrorAlert.module.css';

const ErrorAlert = ({ children }) => {
  return <div className={styles.alert}>{children}</div>;
};

export default ErrorAlert;
