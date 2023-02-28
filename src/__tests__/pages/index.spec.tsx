import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/pages/index';
import { SellerData } from '@/types/seller.type';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '@/test-utils/createMockRouter';
import SellerToolbar from '@/components/seller/Toolbar';

describe('Test Seller Toolbar', () => {
  beforeEach(async () => {
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
    render(
      await waitFor(() => (
        <RouterContext.Provider
          value={createMockRouter({ query: { id: '123456' } })}
        >
          <Home sellers={sellers}></Home>
        </RouterContext.Provider>
      )),
    );
  });
  it('renders seller toolbar correctly', async () => {
    render(
      <SellerToolbar
        noOfRows={1}
        setOpen={(open: boolean) => {
          console.log(open);
        }}
      ></SellerToolbar>,
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Sellers')).toBeInTheDocument(),
    );
  });
});

// describe('Home Page', () => {
//   it('renders homepage correctly', async () => {
//     //mock get sellers api
//     const sellers: SellerData[] = [
//       {
//         id: '1',
//         name: 'Seller 1',
//         contactNumber: '1234567890',
//         location: 'Location 1',
//         address: 'Address 1',
//         gender: 'Male',
//         image: 'https://picsum.photos/200',
//         totalListings: 10,
//         listings: [],
//       },
//       {
//         id: '1',
//         name: 'Seller 1',
//         contactNumber: '1234567890',
//         location: 'Location 1',
//         address: 'Address 1',
//         gender: 'Male',
//         image: 'https://picsum.photos/200',
//         totalListings: 10,
//         listings: [],
//       },
//     ];
//     render(
//       <RouterContext.Provider
//         value={createMockRouter({ query: { id: '123456' } })}
//       >
//         <Home sellers={sellers}></Home>
//       </RouterContext.Provider>,
//     );
//     await waitFor(() =>
//       expect(screen.findByText(/Sellers/)).toBeInTheDocument(),
//     );
//   });
// });
