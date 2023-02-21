import { ListingData } from '@/types/listing.type';
import { SellerData } from '@/types/seller.type';
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import React from 'react';

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
export default function EnhancedDataGrid({
  rows,
  columns,
  onDoubleClick,
}: {
  rows: SellerData[] | ListingData[];
  columns: GridColDef[];
  onDoubleClick?: (id: string) => void;
}) {
  const [pageSize, setPageSize] = React.useState(10);

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      rowsPerPageOptions={[5, 10, 15]}
      onPageSizeChange={(newPageSize) => {
        setPageSize(newPageSize);
      }}
      checkboxSelection
      onRowDoubleClick={(params) =>
        onDoubleClick && onDoubleClick(params.id.toString())
      }
      components={{
        Toolbar: CustomToolbar,
      }}
    />
  );
}
