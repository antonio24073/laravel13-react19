
import { store } from './store'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
// import TextField from '@mui/material/TextField';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { FaBeer } from 'react-icons/fa';
// import { Counter } from './view/components/Counter';
import { Alert, AuthButton, Confirm, ContainedButtons, Counter, Loading, Notify } from './view/components'


const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    }
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      }
    },
    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      }
    },
  },
})


const App = () => {

  return <Provider store={store}>
    <ThemeProvider theme={theme}>
      <h1 className="text-danger"> Olá 2</h1>
      {/* <FaBeer style={{ fontSize: '60px', color: 'B8860B' }} /> */}
      {/* <ContainedButtons></ContainedButtons>*/}
      {/* <Confirm
        open={true}
        onClose={() => alert('close')}
        onConfirm={() => alert('confirm')}
      /> */}

      {/* <Counter></Counter> */}
      {/* <TextField id="outlined-basic" label="Outlined" /> */}
      {/* <Loading></Loading> */}
      {/* <Alert /> */}
      {/* <Notify />
      <ContainedButtons /> */}
      <AuthButton />

    </ThemeProvider>

  </Provider>;
}


export default App;