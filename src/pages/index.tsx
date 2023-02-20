import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useState, MouseEvent } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import dynamic from 'next/dynamic';
import { serverClient, client } from '@/utils/axios';
import { SellerData } from '@/types/seller.type';
import EnhancedDataGrid from '@/components/common/EnhancedDataGrid';
import SellerToolbar from '@/components/seller/Toolbar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Box = dynamic(() => import('@mui/material/Box'));
const Paper = dynamic(() => import('@mui/material/Paper'));
const Stack = dynamic(() => import('@mui/material/Stack'));
const EnhancedForm = dynamic(() => import('@/components/common/Form'));

type ActionButtonsProps = {
  onAction: (type: string) => void;
};

const ActionButtons = (props: ActionButtonsProps) => {
  const onAction = (e: MouseEvent<HTMLButtonElement>, type: string) => {
    e.stopPropagation();
    props.onAction(type);
  };

  return (
    <Stack direction="row" spacing={2}>
      <IconButton color="primary" onClick={(e) => onAction(e, 'update')}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={(e) => onAction(e, 'delete')}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

const fields = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'contactNumber',
    label: 'Contact Number',
  },
  {
    key: 'location',
    label: 'Location',
  },
  {
    key: 'address',
    label: 'Address',
  },
  {
    key: 'gender',
    label: 'Gender',
  },
  {
    key: 'image',
    label: 'Image',
  },
];

export default function Home({ sellers }: { sellers: SellerData[] }) {
  const [rows, setRows] = useState(sellers);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<
    Record<string, string | number> | undefined
  >(undefined);

  const handleDelete = async (id: string) => {
    await client.delete(`/seller`, {
      data: { id },
    });
    const newRows = rows.filter((row) => row.id !== id);
    setRows([...newRows]);
  };

  const handleUpdate = async (
    id: string,
    data: Record<string, string | number>,
  ) => {
    const response = await client.put<SellerData>('/seller', {
      id,
      ...data,
    });
    const index = rows.findIndex((row) => row.id === id);
    const updatedRow = {
      ...response.data,
      totalListings: rows[index].totalListings,
    };
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return updatedRow;
      }
      return row;
    });
    setRows([...newRows]);
  };

  const handleCreate = async (data: Record<string, string | number>) => {
    const seller = await client.post<SellerData>('/seller', data);
    setRows([...rows, { ...seller.data, totalListings: 0 }]);
  };

  const handleSubmit = async (
    data: Record<string, string | number>,
    id?: string,
  ) => {
    if (id) {
      await handleUpdate(id, data);
    } else {
      await handleCreate(data);
    }
    setOpen(false);
  };

  const handleActionClick = (id: string, type: string) => {
    if (type === 'delete') {
      handleDelete(id);
    } else {
      const data = rows.find((row) => row.id === id);
      setEditData(data);
      setOpen(true);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, hide: true },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'contactNumber',
      headerName: 'Contact No.',
      flex: 1,
    },
    {
      field: 'totalListings',
      headerName: 'Total Listing',
      type: 'number',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <ActionButtons
          onAction={(type) => handleActionClick(params.row.id, type)}
        />
      ),
      sortable: false,
    },
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
          <Paper sx={{ width: '100%', mb: 2 }}>
            <SellerToolbar noOfRows={rows.length} setOpen={setOpen} />
            <EnhancedDataGrid rows={rows} columns={columns} />
          </Paper>
        </Box>
        <EnhancedForm
          key={'seller-form' + (editData ? editData.id : '')}
          title={editData ? 'Update Seller' : 'Add Seller'}
          fields={fields}
          onClose={() => setOpen(false)}
          open={open}
          editData={editData}
          onSubmit={handleSubmit}
        />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  let sellers: SellerData[] = [];
  try {
    const response = await serverClient.get<SellerData[]>('/seller');
    sellers = response.data;
  } catch (error) {
  } finally {
    return {
      props: {
        sellers,
      },
    };
  }
};
