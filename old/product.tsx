"use client";
import { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Fab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductList() {
  const [products, setProducts] = useState([
    { id: 0, desc: "iPad", price: 20000 },
    { id: 1, desc: "iPhone 8", price: 20000 },
    { id: 2, desc: "iPhone X", price: 30000 },
  ]);

  const [index, setIndex] = useState(3);

  const [newProduct, setNewProduct] = useState({
    state: false,
    visible: false,
    id: 0,
    desc: "",
    price: 0,
  });

  const handleClick = (e: any) => {
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
      const updatedProducts = products.map((product) =>
        product.id === newProduct.id ? { ...product, ...newProduct } : product
      );
      setProducts(updatedProducts);
    } else {
      const newProductWithId = {
        ...newProduct,
        id: index,
      };
      setProducts([...products, newProductWithId]);
      setIndex((index) => index + 1);
    }

    setNewProduct({ state: false, visible: false, id: 0, desc: "", price: 0 });
  };

  const deleteProduct = (id: any) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <Box
      sx={{
        width: "80vw",
        height: "100vh",
        backgroundColor: "background.paper",
        color: "black",
        textAlign: "left",
      }}
    >
      <Fab
        color="primary"
        aria-label="Add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={show}
      >
        <AddIcon />
      </Fab>

      {newProduct.visible && (
        <Dialog
          open={newProduct.visible}
          onClose={hide}
          aria-labelledby="新增產品"
        >
          <DialogTitle>
            {newProduct.state ? "修改產品" : "新增產品"}
          </DialogTitle>
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
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Button variant="contained" color="primary" onClick={update}>
              {newProduct.state ? "修改" : "新增"}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <List subheader="Product list" aria-label="product list">
        {products.map((product) => (
          <ListItem divider key={product.id}>
            <ListItemText
              primary={product.desc}
              secondary={`Price: ${product.price}`}
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteProduct(product.id)}
            >
              <DeleteIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setNewProduct({ ...product, visible: true, state: true })
              }
            >
              修改
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
