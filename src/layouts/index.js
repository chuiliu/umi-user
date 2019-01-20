import withRouter from 'umi/withRouter';
import Header from './Header';
import styles from './index.less';

function BasicLayout({ children, location }) {
  const { pathname } = location;

  if (pathname === '/login') {
    return <div>login page</div>
  }

  return (
    <div className={styles.normal}>
      <Header location={location} />
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default withRouter(BasicLayout);
