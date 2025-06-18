import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {OrderTracker} from './OrderTracker';

const meta: Meta<typeof OrderTracker> = {
  component: OrderTracker,
};

export default meta;

type Story = StoryObj<typeof OrderTracker>;

export const Basic: Story = {args: {}};
