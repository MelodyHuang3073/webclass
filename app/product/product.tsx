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
import { useEffect } from "react";


export default function ProductList() {
  const [products, addProduct, deleteProduct, updateProduct, isLoading, order, setOrder] = useRead();
  const [newProduct, setNewProduct] = useState<Product>({ id: "", desc: "", price: 0, });
  const [status, setStatus] = useState({ visible: false });
  const [search, setSearch] = useState("");
  const [filterList,setFilterList] = useState<Product[]>([]);

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

  const searchFilter=()=>{
    setFilterList(products.filter((x)=>x.desc.toLowerCase().includes(search.toLowerCase())))
  }

  const orderIsChange = (e:any) => {
    order === "desc" ? setOrder("asc") : setOrder("desc");
  };

  useEffect(() => {
    searchFilter()
  }, [products,search]);
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
      <button type="button" onClick={orderIsChange}>
              {order === "desc" ? (
                "up"
              ) : (
                "down"
              )}
            </button>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <TextField id="outlined-basic" label="search" variant="outlined" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </Box>
      <Dialog open={status.visible} onClose={hide} aria-labelledby={newProduct.id === "" ? "新增產品" : "修改QA"}>
        <DialogTitle>{newProduct.id === "" ? "新增產品" : "修改QA"}</DialogTitle>
        <DialogContent>
          <TextField label="question" variant="outlined" name="desc" value={newProduct.desc} onChange={handleClick} /><p />
          <TextField type="number" label="answer" variant="outlined" name="price" value={newProduct.price} onChange={handleClick} /><p />
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
          <Button variant="contained" color="primary" onClick={addOrUpdate}>{newProduct.id === "" ? "新增產品" : "修改QA"}</Button>
        </DialogActions>
      </Dialog>
      
      

      {isLoading ? <CircularProgress /> :
          <List subheader="QA" aria-label="QA">
            {filterList.map((product) =>
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
