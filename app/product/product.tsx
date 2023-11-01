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
import useRead from "./read";

export default function ProductList() {
  const [products, setProducts, addProduct] = useRead();
  const [newProduct, setNewProduct] = useState<{ desc: string; price: number }>({desc:"",price:0});
  const [visible, setVisible] = useState(true);
  const [state, setState] = useState(true);
  function add() {
    addProduct(newProduct);
    setNewProduct({ ...newProduct})
    
    console.log(products);
  }
  const show = () => {
    setVisible(true)
  };

  const hide = () => {
    setVisible(false)
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

      {visible && (
        <Dialog
          open={visible}
          onClose={hide}
          aria-labelledby="新增產品"
        >
          <DialogTitle>
            {state ? "修改產品" : "新增產品"}
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
              value={products.price}
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
              {state ? "修改" : "新增"}
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
                setProducts({ ...products })
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
