import * as React from 'react';
import { format, parseISO } from 'date-fns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Grid,
  Alert,
  LinearProgress,
  Backdrop,
  CircularProgress,
} from '@mui/material';

import { useQuery } from '@tanstack/react-query';

import { IScrapeApi } from './interfaces/IScrapeApi';
import { sendApiRequest } from '../helpers/sendApiRequest';

export default function GasPriceTable() {
  const { error, isPending, data, refetch } = useQuery({
    queryKey: ['scrapes'],
    queryFn: async () => {
      return await sendApiRequest<IScrapeApi[]>(
        'http://localhost:3200/scrape',
        'GET',
      );
    },
  });

  return (
    <>
      <Grid item md={2}></Grid>
      <Grid item md={8} px={4} my={5}>
        <Grid container display="flex" justifyContent="center">
          {error && (
            <Alert severity="error">
              There was an error fetching median gas prices
            </Alert>
          )}

          {!error && Array.isArray(data) && data.length === 0 && (
            <Alert severity="warning">
              You do not have any updated prices created yet. New prices reflect
              in 30 minutes intervals.
            </Alert>
          )}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Transaction UUID</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong> Med Gas Price</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Date</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isPending ? (
                  <Backdrop
                    sx={{
                      color: '#fff',
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={true}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                ) : (
                  Array.isArray(data) &&
                  data.length > 0 &&
                  data.map((each, index) => (
                    <TableRow
                      key={index + each.price}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {each.id}
                      </TableCell>
                      <TableCell align="center">{each.price} nAVAX</TableCell>
                      <TableCell align="right">
                        {format(
                          parseISO(each.date),
                          "eeee do MMM, yyyy 'at' HH:mm:ss",
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid item md={2}></Grid>
    </>
  );
}
