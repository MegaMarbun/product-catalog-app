// src/components/ProductList.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductList from './ProductList';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true,
    headers: {
      get: () => '20' // Menyediakan nilai header untuk X-Total-Count
    }
  })
);

describe('ProductList component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders ProductList component', async () => {
    render(<ProductList />);
    expect(screen.getByText('Product List')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Add Product')).toBeInTheDocument();
    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });

  it('fetches products when mounted', async () => {
    render(<ProductList />);
    // Tambahkan menunggu hingga fetch dipanggil
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/products'));
    });
  });

  it('handles search input change', async () => {
    render(<ProductList />);
    const searchInput = screen.getByPlaceholderText('Search products');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });

  it('handles adding new product', async () => {
    render(<ProductList />);
    fireEvent.click(screen.getByText('Add Product'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Enter title'), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByPlaceholderText('Enter description'), { target: { value: 'Description of New Product' } });
    fireEvent.change(screen.getByPlaceholderText('Enter price'), { target: { value: '50' } });
    fireEvent.change(screen.getByPlaceholderText('Enter image URL'), { target: { value: 'https://example.com/image.jpg' } });
    fireEvent.click(screen.getByText('Add Product'));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/products'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Generic Rubber Table6',
        description: 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
        price: '5646.00',
        image: 'https://cdn1-production-images-kly.akamaized.net/0kiCa-hipKt1jKmY_5uD-lxJTBI=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4069615/original/075701200_1656662727-assortment-pieces-cake.jpg'
      })
    }));
  });
});
