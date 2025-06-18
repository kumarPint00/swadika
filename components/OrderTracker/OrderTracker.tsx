import React from 'react';

import styles from './OrderTracker.css';

export interface OrderTrackerProps {
  prop?: string;
}

export function OrderTracker({prop = 'default value'}: OrderTrackerProps) {
  return <div className={styles.OrderTracker}>OrderTracker {prop}</div>;
}
