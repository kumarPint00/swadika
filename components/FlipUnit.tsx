"use client";
import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import styles from "./FlipUnit.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function FlipUnit({
  unit,
  digit,
  prevDigit,
}: {
  unit: string;
  digit: number;
  prevDigit: number;
}) {
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      setFlipping(true);
      const t = setTimeout(() => setFlipping(false), 600);
      return () => clearTimeout(t);
    }
  }, [digit, prevDigit]);

  return (
    <Box className={styles.unit}>
      <Box className={styles.card}>
        {/* Static top shows current digit */}

        
        {/* <Box className={`${styles.half} ${styles.topStatic}`}>
          <Typography variant="h4">{pad(digit)}</Typography>
        </Box> */}
        <Box className={`${styles.half} ${styles.bottomStatic}`}>
          <Typography variant="h4">{pad(digit)}</Typography>
        </Box>

        {/* When flipping, overlay the two animated halves */}
        {flipping && (
          <>
            {/* Top half flips up from prevDigit */}
            {/* <Box className={`${styles.half} ${styles.topFlip}`}>
              <Typography variant="h4">{pad(prevDigit)}</Typography>
            </Box> */}
            {/* Bottom half flips down to digit */}
            <Box className={`${styles.half} ${styles.bottomFlip}`}>
              <Typography variant="h4">{pad(digit)}</Typography>
            </Box>
          </>
        )}
      </Box>
      <Typography variant="caption">{unit}</Typography>
    </Box>
  );
}
