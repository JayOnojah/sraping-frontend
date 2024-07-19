import React, { FC, ReactElement } from 'react';

import { Grid } from '@mui/material';

import GasPriceTable from '../../components/gasPriceTable';

export const Prices: FC = (): ReactElement => {
  return (
    <Grid container minHeight="100vh" p={0} m={0}>
      <GasPriceTable />
    </Grid>
  );
};
