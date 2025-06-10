// src/components/OpeningHours.tsx
"use client";
import { Box, Typography, Table, TableBody, TableRow, TableCell, Paper } from "@mui/material";

const hours = [
  { day: "Mon – Fri", time: "11 AM – 3 PM · 6 PM – 10 PM" },
  { day: "Saturday",  time: "11 AM – 10 PM (continuous)" },
  { day: "Sunday",    time: "11 AM – 5 PM" },
];

export default function OpeningHours() {
  return (
    <Box py={8}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ mb: 4, fontFamily: "Playfair Display, serif" }}
      >
        Opening Hours
      </Typography>
      <Paper sx={{ maxWidth: 420, mx: "auto", borderRadius: 3 }}>
        <Table size="small">
          <TableBody>
            {hours.map((h) => (
              <TableRow key={h.day}>
                <TableCell sx={{ fontWeight: 700 }}>{h.day}</TableCell>
                <TableCell>{h.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
