
import store from './app/store'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { FaBeer } from 'react-icons/fa';
import BasicList from './components/BasicList'
import ContainedButtons from './components/ContainedButtons'
import { Counter } from './features/counter/Counter';
// import { Loading, Notify, Alert } from './view/components'
// import "./tmp.global.css"


const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    }
  },
  // props: {
  //   MuiTextField: {
  //     variant: 'outlined',
  //     fullWidth: true,
  //   },
  //   MuiSelect: {
  //     variant: 'outlined',
  //     fullWidth: true,
  //   },
  // },
})


const App = () => {
return <Provider store={store}>
  <ThemeProvider theme={theme}>
    <h1 className="text-danger"> Olá 2</h1>
    {/* <FaBeer style={{ fontSize: '60px', color: 'B8860B' }} /> */}
    {/* <ContainedButtons></ContainedButtons>
    <BasicList></BasicList> */}
    <Counter></Counter>
    <TextField id="outlined-basic" label="Outlined" />
    {/* <Loading></Loading>
    <Alert />
    <Notify />*/}
  </ThemeProvider> 
</Provider>;
}


export default App;