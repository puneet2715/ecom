import { ListingData } from '@/types/listing.type';
import { SellerData } from '@/types/seller.type';
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
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
}: {
  rows: SellerData[] | ListingData[];
  columns: GridColDef[];
}) {
  // const [selectionModel, setSelectionModel] = React.useState<
  //   GridSelectionModel | undefined
  // >(undefined);

  const [pageSize, setPageSize] = React.useState(5);

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
      // selectionModel={selectionModel}
      // onSelectionModelChange={(newSelectionModel) => {
      //   setSelectionModel(newSelectionModel);
      // }}
      components={{
        Toolbar: CustomToolbar,
      }}
    />
  );
}
