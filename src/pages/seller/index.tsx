import styles from '@/styles/Home.module.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridValueGetterParams,
} from '@mui/x-data-grid';
// import DataGrid from '@mui/x-data-grid/DataGrid';
// import GridToolbarColumnsButton from '@mui/x-data-grid/GridToolbarColumnsButton';
// import GridToolbarContainer from '@mui/x-data-grid/GridToolbarContainer';
// import GridToolbarFilterButton from '@mui/x-data-grid/';
import Link from 'next/link';
import React from 'react';
import EnhancedForm from '@/components/common/Form';

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
  const onClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation(); // don't select this row after clicking
  };
  return (
    <>
      <Stack direction="row" width={'100%'} justifyContent="space-between">
        <Link href="/seller">
          <Button variant="contained" size="small" onClick={onClick}>
            Update
          </Button>
        </Link>
        <Link href="/seller">
          <Button variant="contained" size="small" onClick={onClick}>
            Delete
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default function Seller() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 70 },
    {
      field: 'product',
      headerName: 'Product',
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 120,
      valueFormatter: (params) => Number(params.value).toLocaleString('en'),
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 140,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      // type: React.ReactNode,
      sortable: false,
      renderCell: () => actionButtons(),
      minWidth: 180,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    // minWidth: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  const rows = [
    {
      id: 1,
      lastName: 'Name',
      firstName: 'SKU',
      stock: 12,
      price: 35,
      // actions: {<Button>Update</Button>},
    },
    {
      id: 2,
      lastName: 'Name',
      firstName: 'SKU',
      stock: 67,
      price: 42,
    },
    {
      id: 3,
      lastName: 'Name',
      firstName: 'SKU',
      stock: 78,
      price: 45,
    },
    {
      id: 4,
      lastName: 'Name',
      firstName: 'SKU',
      stock: 45,
      price: 16,
    },
    {
      id: 5,
      lastName: 'Name',
      firstName: 'SKU',
      stock: 123,
      price: 30,
    },
    {
      id: 6,
      lastName: 'Name',
      firstName: 'SKU',
      stock: 123456789,
      price: 150,
    },
    {
      id: 7,
      lastName: 'Name',
      firstName: 'SKU',
      stock: 123456789,
      price: 44,
    },
    {
      id: 8,
      lastName: 'Name',
      firstName: 'SKU',
      stock: 123456789,
      price: 36,
    },
    {
      id: 9,
      lastName: 'Name',
      firstName: 'SKU',
      stock: 123456789,
      price: 65,
    },
  ];

  const fields = [
    {
      key: 'product',
      label: 'Product Name',
    },
    {
      key: 'sku',
      label: 'SKU',
    },
    {
      key: 'image',
      label: 'Image',
    },
    {
      key: 'costPrice',
      label: 'Cost Price',
    },
    {
      key: 'sellingPrice',
      label: 'Selling Price',
    },
    {
      key: 'stock',
      label: 'Stock',
    },
  ] as const;

  const [open, setOpen] = React.useState(false);

  const handleSubmit = (
    data: Record<(typeof fields)[number]['key'], string>,
  ) => {
    setOpen(false);
  };

  return (
    <>
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
                  <Typography>Listings({rows.length})</Typography>
                </Box>
                <Box>
                  <Button variant="contained" onClick={() => setOpen(true)}>
                    Add New Listings
                  </Button>
                </Box>
              </Stack>
            </Toolbar>
            <DataGrid
              // minColumnWidth={'100%'}
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
            {/* <Box sx={{ width: '100%', height: rows.length * 48 }}></Box> */}
          </Paper>
        </Box>
        <EnhancedForm
          title="Add New Listing"
          fields={fields}
          onClose={() => setOpen(false)}
          open={open}
          onSubmit={handleSubmit}
        />
      </main>
    </>
  );
}
