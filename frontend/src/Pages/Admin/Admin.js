import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import {customerLogout , getProducts, getProductById} from '../../Utilities/Customers'
import { adminLogout, deleteProduct } from '../../Utilities/Admin'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useParams} from 'react-router-dom';
import { mainListItems } from './ListItems';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

export default function Customer() {
  
  const Items = () => {
    return (<TableContainer component={Paper}>
      <Table aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell >Item</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell/>
          </TableRow>
          </TableHead>
          <TableBody>
          {productList.map((row) => (
              <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                  {row.name}
              </TableCell>
              <TableCell align="right">{row.minPrice}</TableCell>
              <TableCell align="right"><Button variant="outlined" startIcon={<DeleteIcon /> } onClick={() => {
                deleteProduct(row._id)
                window.location.reload()
              }
                }>
                Delete
              </Button>
</TableCell>
              </TableRow>
          ))}
          </TableBody>
          </Table>
  </TableContainer>)
  }
  React.useEffect(()=>{
    if(!sessionStorage.getItem('adminLogin')){
        window.location.href = '/adminLogin'
    }
    else{
    getProducts()
    .then(products => setProductList(products.data))
    .catch(err => console.log(err))
    }

  },[])
  const [productList, setProductList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin
            </Typography>
            <IconButton color="inherit" onClick={adminLogout}><LogoutIcon/></IconButton>
            </Toolbar>
        </AppBar>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Items/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}