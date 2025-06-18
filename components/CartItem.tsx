"use client";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartItem({ item, onRemove }:{item:any,onRemove:()=>void}) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" py={1}>
      <Box>
        <Typography variant="body1">{item.name}</Typography>
        <Typography variant="caption">Qty: {item.qty}</Typography>
      </Box>
      <Box>
        <Typography variant="body2">₹{item.price*item.qty}</Typography>
        <IconButton size="small" onClick={onRemove}><DeleteIcon /></IconButton>
      </Box>
    </Box>
  );
}
