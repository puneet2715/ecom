import styles from '@/styles/Home.module.css';
import dynamic from 'next/dynamic';
import { GridColDef } from '@mui/x-data-grid';
import { MouseEvent, useState } from 'react';
import { ListingData } from '@/types/listing.type';
import { client, serverClient } from '@/utils/axios';
import EnhancedDataGrid from '@/components/common/EnhancedDataGrid';
import ListingToolbar from '@/components/listing/Toolbar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
const EnhancedForm = dynamic(() => import('@/components/common/Form'));
const Box = dynamic(() => import('@mui/material/Box'));
const Paper = dynamic(() => import('@mui/material/Paper'));
const Stack = dynamic(() => import('@mui/material/Stack'));

type ActionButtonsProps = {
  onAction: (type: string) => void;
};

const ActionButtons = (props: ActionButtonsProps) => {
  const onAction = (e: MouseEvent<HTMLButtonElement>, type: string) => {
    e.stopPropagation(); // don't select this row after clicking
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
    key: 'productName',
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

export default function Seller({ listings }: { listings: ListingData[] }) {
  const [rows, setRows] = useState(listings);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<
    Record<string, string | number> | undefined
  >(undefined);

  const handleDelete = async (id: string) => {
    await client.delete(`/seller`, { data: { id } });
    const newRows = rows.filter((row) => row.id !== id);
    setRows([...newRows]);
  };

  const handleUpdate = async (
    id: string,
    data: Record<string, string | number>,
  ) => {
    const response = await client.put<ListingData>('/listing', {
      id,
      ...data,
    });
    const updatedRow = {
      ...response.data,
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
    console.log('data', data);
    const listing = await client.post<ListingData>('/listing', data);

    setRows([...rows, { ...listing.data }]);
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
      field: 'productName',
      headerName: 'Product',
      flex: 1,
    },
    {
      field: 'sku',
      headerName: 'SKU',
      hide: true,
      flex: 1,
    },
    {
      field: 'image',
      headerName: 'Image',
      hide: true,
      flex: 1,
    },
    {
      field: 'costPrice',
      headerName: 'Cost Price',
      flex: 1,
    },
    {
      field: 'sellingPrice',
      headerName: 'Selling Price',
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <ActionButtons
          onAction={(type) => handleActionClick(params.row.id, type)}
        />
      ),
    },
  ];

  return (
    <>
      <main className={styles.main}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <ListingToolbar noOfRows={rows.length} setOpen={setOpen} />
            <EnhancedDataGrid rows={rows} columns={columns} />
          </Paper>
        </Box>
        <EnhancedForm
          key={'listing-form' + (editData ? editData.id : '')}
          title={editData ? 'Update Listing' : 'Add Listing'}
          editData={editData}
          fields={fields}
          onClose={() => setOpen(false)}
          open={open}
          onSubmit={handleSubmit}
        />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  let listings: ListingData[] = [];
  try {
    const response = await serverClient.get<ListingData[]>('/listing');
    listings = response.data;
  } catch (error) {
  } finally {
    return {
      props: {
        listings,
      },
    };
  }
};
