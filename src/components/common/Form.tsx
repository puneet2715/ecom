// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   FormGroup,
//   FormControl,
//   TextField,
//   DialogActions,
//   Button,
// } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';

interface FormInputProps<
  T extends ReadonlyArray<{ key: string; label: string }>,
> {
  title: string;
  fields: T;
  open: boolean;
  onClose: () => void;
  onSubmit: (input: Record<T[number]['key'], string>) => void;
}

export default function EnhancedForm<
  T extends ReadonlyArray<{ key: string; label: string }>,
>({ fields, title, onClose, onSubmit, open }: FormInputProps<T>) {
  const [input, setInput] = useState<Record<string, string>>(
    fields.reduce((acc, { key }) => ({ ...acc, [key]: '' }), {}),
  );

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <FormGroup>
          {fields.map(({ key, label }) => (
            <FormControl key={key}>
              <TextField
                value={input[key]}
                variant="standard"
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
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            onSubmit(input);
            setInput(
              fields.reduce((acc, { key }) => ({ ...acc, [key]: '' }), {}),
            );
          }}
        >
          Submit
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
