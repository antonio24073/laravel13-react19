import { useSelector, useDispatch } from 'react-redux'
import { Modal, Typography } from '@mui/material'
import { MdError, MdCheckCircle } from 'react-icons/md'
import type { AlertModel } from '../../models/AlertModel'
import { open, close } from '../../store/reducers/alert.reducer'

export default function Alert() {
    const dispatch = useDispatch();
    const alert = useSelector( (state: AlertModel) => state.alert)

    if(alert.open){
        setTimeout(() => dispatch( close() ), alert.time);
    }
    return (
        <Modal
            open={alert.open}
            // onClose={() => dispatch(open())}
            className="d-flex flex-column align-items-center justify-content-center h-100"
        >
            <div className="bg-white rounded-lg d-flex align-items-center outline-none p-4">
                {(alert.class == 'success') &&
                    <MdCheckCircle style={{ fontSize: '2.5rem' }} className="mr-3 text-success" />
                }
                {(alert.class == 'error') &&
                    <MdError style={{ fontSize: '2.5rem' }} className="mr-3 text-danger" />
                }
                <Typography className="font-weight-bold ms-2" variant="subtitle2">{alert.msg}</Typography>
            </div>
        </Modal>
    )
}
