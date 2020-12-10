import React, { memo, ReactNode } from 'react';
import { Grid } from '@material-ui/core';
import styles from './layout.module.css';

type PropTypes = {
  children: ReactNode;
};

function Layout({ children }:PropTypes) {
  return (
    <Grid className={styles.layout}>
      <div className={styles.layout__content}>{children}</div>
    </Grid>
  );
}

export default memo(Layout);
