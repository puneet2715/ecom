import React from 'react';
import { render, screen } from '@testing-library/react';
// import Home from '@/pages/index';
import Home from '../../pages/index';
// import { SellerData } from '@/types/seller.type';
import { SellerData } from '../../types/seller.type';

describe('Home Page', () => {
  it('renders correctly', () => {
    //mock get sellers api
    const sellers: SellerData[] = [
      {
        id: '1',
        name: 'Seller 1',
        contactNumber: '1234567890',
        location: 'Location 1',
        address: 'Address 1',
        gender: 'Male',
        image: 'https://picsum.photos/200',
        totalListings: 10,
        listings: [],
      },
      {
        id: '1',
        name: 'Seller 1',
        contactNumber: '1234567890',
        location: 'Location 1',
        address: 'Address 1',
        gender: 'Male',
        image: 'https://picsum.photos/200',
        totalListings: 10,
        listings: [],
      },
    ];
    render(<Home sellers={sellers}></Home>);
    expect(screen.getByText(/Sellers/i)).toBeInTheDocument();
  });
});
