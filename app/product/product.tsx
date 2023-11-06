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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import useRead from "./readData";
import { Product } from "../_settings/interfaces";

export default function ProductList() {
  const [products, addProduct, deleteProduct, updateProduct, isLoading] = useRead();
  const [newProduct, setNewProduct] = useState<Product>({ id: "", desc: "", price: 0, });
  const [status, setStatus] = useState({ visible: false });

  function addOrUpdate() {
    if (newProduct.id === "") {
      addProduct(newProduct);
    }
    else {
      updateProduct(newProduct);
    }
    setStatus({ ...status, visible: false })
    resetProduct();
  }

  function setUpdateProduct(product: Product) {
    setNewProduct({ ...product })
    setStatus({ visible: true })
  }

  const resetProduct = () => {
    setNewProduct({ id: "", desc: "", price: 0, })
  }

  const hide = () => {
    setStatus({ ...status, visible: false })
  }
  const show = () => {
    setStatus({ ...status, visible: true })
  }

  const handleClick = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "price") {
      setNewProduct({ ...newProduct, [e.target.name]: parseInt(e.target.value) })
    }
    else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }
  }

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

      <Dialog open={status.visible} onClose={hide} aria-labelledby={newProduct.id === "" ? "新增產品" : "更新產品"}>
        <DialogTitle>{newProduct.id === "" ? "新增產品" : "更新產品"}</DialogTitle>
        <DialogContent>
          <TextField label="產品描述" variant="outlined" name="desc" value={newProduct.desc} onChange={handleClick} /><p />
          <TextField type="number" label="產品價格" variant="outlined" name="price" value={newProduct.price} onChange={handleClick} /><p />
        </DialogContent>
        <DialogActions>
          <IconButton
            aria-label="close"
            onClick={hide}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button variant="contained" color="primary" onClick={addOrUpdate}>{newProduct.id === "" ? "新增產品" : "更新產品"}</Button>
        </DialogActions>
      </Dialog>
      
      

      {isLoading ? <CircularProgress /> :
          <List subheader="Product list" aria-label="product list">
            {products.map((product) =>
              <ListItem divider key={product.desc}>
                <ListItemText primary={product.desc} secondary={product.price}>
                </ListItemText>
                <IconButton edge="end" aria-label="update" onClick={() => setUpdateProduct(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteProduct(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>)}
          </List>
      }

    </Box>
  );
}
