'use client'
import { useState } from "react";
import { Box, Button, List, ListItem, ListItemText, TextField, Dialog, DialogTitle , DialogContent, DialogActions, IconButton, Fab} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductList() {
  const [products, setProducts] = useState([
    { desc: 'iPad', price: 20000 },
    { desc: 'iPhone 8', price: 20000 },
    { desc: 'iPhone X', price: 30000 }
  ]);

  const [newProduct, setNewProduct] = useState({
    state: false,
    visible: false,
    desc: '',
    price: 0
  });

  const handleClick = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const show = () => {
    setNewProduct({ ...newProduct, visible: true });
  };

  const hide = () => {
    setNewProduct({ ...newProduct, visible: false });
  };

  const update = () => {
    if (newProduct.state) {
      // Update existing product
      const updatedProducts = products.map((product) =>
        product.desc === newProduct.desc ? newProduct : product
      );
      setProducts(updatedProducts);
    } else {
      // Add a new product
      setProducts([...products, newProduct]);
    }

    setNewProduct({ state: false, visible: false, desc: '', price: 0 });
  };

  const deleteProduct = (desc) => {
    setProducts(products.filter((x) => x.desc !== desc));
  };

  

  return (
    <Box
      sx={{
        width: '80vw',
        height: '100vh',
        backgroundColor: 'background.paper',
        color: 'black',
        textAlign: 'left'
      }}
    >
      <Fab
        color="primary"
        aria-label="Add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
        onClick={show}
      >
        <AddIcon />
      </Fab>

      {newProduct.visible && (
        <Dialog open={newProduct.visible} onClose={hide} aria-labelledby="新增產品">
          <DialogTitle>{newProduct.state ? '修改產品' : '新增產品'}</DialogTitle>
          <DialogContent>
            <TextField
              label="產品描述"
              variant="outlined"
              name="desc"
              value={newProduct.desc}
              onChange={handleClick}
            />
            <br />
            <TextField
              label="產品價格"
              variant="outlined"
              name="price"
              value={newProduct.price}
              onChange={handleClick}
            />
            <br />
          </DialogContent>
          <DialogActions>
            <IconButton
              aria-label="close"
              onClick={hide}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8
              }}
            >
              <CloseIcon />
            </IconButton>
            <Button variant="contained" color="primary" onClick={update}>
              {newProduct.state ? '修改' : '新增'}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <List subheader="Product list" aria-label="product list">
        {products.map((product) => (
          <ListItem divider key={product.desc}>
            <ListItemText primary={product.desc} secondary={`Price: ${product.price}`} />
            <IconButton edge="end" aria-label="delete" onClick={() => deleteProduct(product.desc)}>
              <DeleteIcon />
            </IconButton>
            <Button variant="contained" color="primary" onClick={() => setNewProduct({ ...product, visible: true, state: true })}>
              修改
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
