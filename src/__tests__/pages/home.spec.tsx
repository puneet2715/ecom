import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home', () => {
  it('renders correctly', () => {
    render(<Home />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
