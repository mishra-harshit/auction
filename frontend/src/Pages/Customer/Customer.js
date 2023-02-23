import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
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
import {customerLogout , getProducts, getProductById, getBidsByProductId, createBid} from '../../Utilities/Customers'
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

  const Bidding = (props) => {

    React.useEffect(()=>{
        getProductById(props.id).then(item => setProduct(item)).catch(err=>console.log(err))
        getBidsByProductId(props.id).then(item => setBids(item))

    },[])
    const addBid = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
     const bidData = {
        consumerId: sessionStorage.getItem('customerId'),
        consumerName : sessionStorage.getItem('customerName'),
        bidVal: data.get('bidPrice'),
        productId: props.id,
        productName: card.name,
        sellerId: card.seller_id,        
        status : 'open'
      }
      createBid(bidData)
      window.location.reload()
    }
    const [card, setProduct] = React.useState({})
    const [bids,setBids] = React.useState([])
    return (
        <Grid container spacing={4}>
            <Grid item key={1} xs={6} >
            <Card
                  sx={{  display: 'flex', flexDirection: 'column' }}
                >
                <CardMedia
                sx={{
                    // 16:9
                    pt: '90%',
                  }}
                image={card.picture}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {card.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Minimum Price : Rs {card.minPrice}
                </Typography>
            </CardContent>
            <CardActions >
              <Box component="form" noValidate onSubmit={addBid}>
                Rs &nbsp;<input type='number' min={card.minPrice} name='bidPrice' id='bidPrice'/> &nbsp;&nbsp;
                <Button variant='contained' type="submit" >Add Bid</Button>
                </Box>
            </CardActions>
                </Card>
            </Grid>
            <Grid item key={2} xs={6} >
            
                     <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Bidder</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {bids.map((row) => (
                                <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.consumerName}
                                </TableCell>
                                <TableCell align="right">{row.bidVal}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                            </Table>
                    </TableContainer>
            </Grid>
        </Grid>
    )
  }

export default function Customer() {
  
  const Items = () => {
    return (<Grid container spacing={4}>
            {productList.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 250 }}
                    image={card.picture}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {card.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Minimum Price : Rs {card.minPrice}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained" onClick={()=>{window.location.href = `/customer/${card._id}`}}>Bid</Button>
                </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>)
  }
  React.useEffect(()=>{
    if(!sessionStorage.getItem('cutomerLogin')){
        window.location.href = '/login'
    }
    if(params.id){
        setBidPage(true)
    }
    else{
    getProducts()
    .then(products => setProductList(products.data))
    .catch(err => console.log(err))
    }

  },[])
  const params = useParams();
  const [bidPage, setBidPage] = React.useState(false)
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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Bidding App
            </Typography>
            <IconButton color="inherit" onClick={customerLogout}><LogoutIcon/></IconButton>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
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
          {bidPage?<Bidding id={params.id}/>:<Items/>}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}