"use client";
import { useState } from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";

export default function ProductList() {
  const products = [
    { desc: "iPad", price: 20000, index: 0 },
    { desc: "iPhone 8", price: 20000, index: 1 },
    { desc: "iPhone X", price: 30000, index: 2 },
  ];

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
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
      <List subheader="Product list" aria-label="product list">
        {products.map((product) => (
          <ListItem divider key={product.desc}>
            <ListItemButton
              selected={selectedIndex === product.index}
              onClick={(event) => handleListItemClick(event, product.index)}
            >
              <ListItemText
                primary={product.desc}
                secondary={`Price: ${product.price}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
