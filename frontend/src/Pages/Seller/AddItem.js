import * as React from 'react';
import {useState} from 'react'
import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
import {createProduct} from '../../Utilities/Sellers'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useParams} from 'react-router-dom';
import { mainListItems } from './ListItems';



import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { PhotoCamera } from '@mui/icons-material';
import { Card, CardContent } from '@mui/material';

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

  

export default function AddItem() {
  
  const Items = () => {


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('image'))
        console.log({
                productDetails: 
                {
                name: data.get('productName'),
                minPrice: data.get('price'),
                picture: URL.createObjectURL(data.get('image'), {autoRevoke: false}),
                seller_id: sessionStorage.getItem('sellerId'),
                status: "open"}
                })

                createProduct(data)
                
                // window.location.href = '/seller'
      };

    const [selectedImage, setSelectedImage] = useState(null);
    
      return (
        <Container component="main" maxWidth="xs">
          
            <CssBaseline />
            <Card>
                <CardContent>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              
              <Typography component="h1" variant="h5">
                Please provide the following details for your product
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="productName"
                      label="Product Name"
                      name="productName"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={2}>
                  <IconButton color="primary" aria-label="upload picture" component="label" >
                    <input hidden accept="image/*" type="file" id="image" name="image"
                        onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }} />
                    <PhotoCamera/>
                </IconButton>
                  </Grid>
                  <Grid item xs={10}>
                  {selectedImage && <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(selectedImage)}
                    />}
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="price"
                      label="Price"
                      type="number"
                      id="price"
                      autoComplete="price"
                    />
                  </Grid>
                  </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add Product
                </Button>
              </Box>
            </Box>
            </CardContent>
            </Card>
          
          </Container>
      );
  }
  React.useEffect(()=>{
    if(!sessionStorage.getItem('sellerLogin')){
        window.location.href = '/sellerLogin'
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
              Seller Panel
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
          <Items/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}