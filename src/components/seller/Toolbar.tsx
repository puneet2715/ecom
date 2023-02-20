import dynamic from 'next/dynamic';

const Box = dynamic(() => import('@mui/material/Box'));
const Button = dynamic(() => import('@mui/material/Button'));
const Stack = dynamic(() => import('@mui/material/Stack'));
const Toolbar = dynamic(() => import('@mui/material/Toolbar'));
const Typography = dynamic(() => import('@mui/material/Typography'));

export default function SellerToolbar({
  noOfRows,
  setOpen,
}: {
  noOfRows: number;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Box>
          <Typography>Sellers({noOfRows})</Typography>
        </Box>
        <Box>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Seller
          </Button>
        </Box>
      </Stack>
    </Toolbar>
  );
}
