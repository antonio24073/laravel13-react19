import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'

export default function Confirm(props) {
  const { open, title, onClose, onConfirm } = props;
  return (
    <Dialog
     open={open}
     onClose={() => onClose()}
     >
        <DialogTitle sx={{ typography: 'inherit' }}>
            <h6>{ title || 'Tem certeza que deseja excluir?' }</h6>
        </DialogTitle>

        <DialogActions className="justify-content-center mb-2">
          <Button autoFocus onClick={() => onClose()}>
            Não<option value=""></option>
          </Button>
          <Button variant="contained" onClick={() => {
            onConfirm();
            onClose();
          }}>Sim</Button>
        </DialogActions>
     </Dialog>
  )
}
