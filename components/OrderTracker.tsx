"use client";
import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";
import { useOrderStatus } from "../hooks/useOrderStatus";

export default function OrderTracker({ orderId }:{orderId:string}) {
  const status = useOrderStatus(orderId);
  const steps=["Preparing","Cooking","Out for Delivery","Delivered"];
  const active = steps.indexOf(status);
  return (
    <Box sx={{ px:4, py:6 }}>
      <Typography variant="h4" gutterBottom>Order #{orderId}</Typography>
      <Stepper activeStep={active} alternativeLabel>
        {steps.map((s)=>(
          <Step key={s}><StepLabel>{s}</StepLabel></Step>
        ))}
      </Stepper>
    </Box>
  );
}
