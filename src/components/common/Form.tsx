import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
interface FormInputProps<
  T extends ReadonlyArray<{ key: string; label: string }>,
> {
  title: string;
  fields: T;
  open: boolean;
  onClose: () => void;
  onSubmit: (
    input: Record<T[number]['key'], string | number>,
    id?: string,
  ) => void;
  editData?: Record<string, string | number>;
}

export default function EnhancedForm<
  T extends ReadonlyArray<{ key: string; label: string }>,
>({ fields, title, onClose, onSubmit, open, editData }: FormInputProps<T>) {
  const [input, setInput] = useState<Record<string, string | number>>(
    fields.reduce(
      (acc, { key }) => ({
        ...acc,
        [key]: editData ? editData[key] : '',
      }),
      {},
    ),
  );

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {title}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack
          spacing={2}
          sx={{
            mt: 1,
          }}
        >
          {fields.map(({ key, label }) => (
            <FormControl key={key}>
              <TextField
                value={input[key]}
                variant="outlined"
                label={label}
                name={key}
                onChange={(e) =>
                  setInput((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </FormControl>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          mx: 2,
          mb: 2,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            onSubmit(input, editData ? (editData.id as string) : undefined);
            setInput(
              fields.reduce((acc, { key }) => ({ ...acc, [key]: '' }), {}),
            );
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
