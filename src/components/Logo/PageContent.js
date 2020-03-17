import React from 'react';

import styles from './PageContent.module.scss';

const PageContent = ({ children }) => (
  <div className={styles.pageContent}>{children}</div>
);

export default PageContent;
