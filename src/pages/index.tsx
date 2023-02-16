import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import * as React from 'react';
import EnhancedButton from '@/components/common/Button';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import Link from 'next/link';
// import { Box, Button, Paper, Stack, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
const inter = Inter({ subsets: ['latin'] });

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      {/* <GridToolbarDensitySelector />
      <GridToolbarExport /> */}
    </GridToolbarContainer>
  );
}

const actionButtons = () => {
  return (
    <>
      <Stack direction="row" width={'100%'} justifyContent="space-between">
        <Link href="/seller">
          <Button variant="contained" size="small">
            Update
          </Button>
        </Link>
        <Link href="/seller">
          <Button variant="contained" size="small">
            Delete
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default function Home() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'Name',
      headerName: 'Name',
      // width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'contact',
      headerName: 'Contact No.',
      type: 'number',
      // width: 140,
      valueFormatter: (params) => Number(params.value).toLocaleString('en'),
    },
    {
      field: 'listing',
      headerName: 'Total Listing',
      type: 'number',
      // width: 140,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      // type: React.ReactNode,
      renderCell: () => actionButtons(),
      // sortable: false,
      width: 180,
      // filterable: false,
      // disableColumnMenu: true,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  const rows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: 'Jon',
      contact: 123456789,
      listing: 35,
    },
    {
      id: 2,
      lastName: 'Lannister',
      firstName: 'Cersei',
      contact: 123456789,
      listing: 42,
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: 'Jaime',
      contact: 123456789,
      listing: 45,
    },
    {
      id: 4,
      lastName: 'Stark',
      firstName: 'Arya',
      contact: 123456789,
      listing: 16,
    },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: 'Daenerys',
      contact: 123456789,
      listing: 30,
    },
    {
      id: 6,
      lastName: 'Melisandre',
      firstName: 'Paul',
      contact: 123456789,
      listing: 150,
    },
    {
      id: 7,
      lastName: 'Clifford',
      firstName: 'Ferrara',
      contact: 123456789,
      listing: 44,
    },
    {
      id: 8,
      lastName: 'Frances',
      firstName: 'Rossini',
      contact: 123456789,
      listing: 36,
    },
    {
      id: 9,
      lastName: 'Roxie',
      firstName: 'Harvey',
      contact: 123456789,
      listing: 65,
    },
  ];

  const fields = [
    'Email Address',
    'Contact Number',
    'Location',
    'Address',
    'Gender',
    'Image url',
  ];

  return (
    <>
      <Head>
        <title>Ecom</title>
        <meta name="description" content="Easyops assignment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2, height: rows.length * 48 }}>
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Box>
                  <Typography>Sellers({rows.length})</Typography>
                </Box>
                <Box>
                  {/* <Button variant="contained">Add Seller</Button> */}
                  <EnhancedButton str="Seller" fields={fields} />
                </Box>
              </Stack>
            </Toolbar>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // rowsPerPageOptions={[5, 10, 15]}
              checkboxSelection
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </Paper>
        </Box>
      </main>
    </>
  );
}
