import { useSelector, useDispatch } from 'react-redux'
import { Typography, Modal, CircularProgress } from '@mui/material'
import type { LoadingModel } from '../../models/loading.types';
import loadingAction from '../../store/actions/loading.action'


export default function Loading() {
    const dispatch = useDispatch();
    const loading = useSelector((state: LoadingModel) => state.loading)

    return (
        <Modal
            open={loading.open}
            onClose={() => dispatch(loadingAction.close())}
            className="d-flex justify-content-center align-items-center h-100">
            <div className="bg-white d-flex align-items-center rounded-lg p-3 outline-none">
                <CircularProgress size={20}></CircularProgress>
                <Typography className="ms-2" variant="subtitle1">{loading.msg}</Typography>
            </div>
        </Modal>
    )
}
