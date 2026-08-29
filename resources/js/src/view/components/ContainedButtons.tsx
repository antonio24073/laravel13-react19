import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import notifyAction from '../../store/actions/notify.action';


export default function ContainedButtons() {
  const dispatch = useDispatch();

  return (

    <div>
      <Button variant="contained">Default</Button>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained">
        Disabled
      </Button>
      <Button variant="contained" color="primary" href="#contained-buttons">
        Link
      </Button>
      <Button variant="contained"
        onClick={() =>
          dispatch(
            notifyAction.open({
              msg: 'My first error message',
              class: 'danger',
            })
          )
        }
      >
        Notify Test
      </Button>
    </div>
  );
}
