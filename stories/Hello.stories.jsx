import React from 'react';

import Hello from "../components/Hello";

export default {
  component: Hello,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Primary = <Hello />