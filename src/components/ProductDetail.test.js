// src/components/ProductDetail.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './ProductDetail';

// Mock global fetch
global.fetch = jest.fn();

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/product/:id" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ProductDetail component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mock setelah setiap pengujian
  });

  it('fetches and displays product details', async () => {
    const mockProduct = {
      id: '60',
      title: 'Sleek Steel Tuna',
      description: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
      price: 172.00,
      image: 'https://loremflickr.com/cache/resized/6193_6078636809_017bb6906a_z_640_480_nofilter.jpg'
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockProduct),
      ok: true,
    });

    renderWithRouter(<ProductDetail />, { route: '/product/1' });

    // Tunggu sampai produk dimuat dan ditampilkan
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('$172.00')).toBeInTheDocument();
      expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'https://loremflickr.com/cache/resized/6193_6078636809_017bb6906a_z_640_480_nofilter.jpg');
    });
  });

  it('enters edit mode and updates product details', async () => {
    const mockProduct = {
      id: '60',
      title: 'Sleek Steel Tuna',
      description: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
      price: 172.00,
      image: 'https://loremflickr.com/cache/resized/6193_6078636809_017bb6906a_z_640_480_nofilter.jpg'
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockProduct),
      ok: true,
    });

    renderWithRouter(<ProductDetail />, { route: '/product/1' });

    // Tunggu sampai produk dimuat
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Update'));

    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Updated Product' } });
    fireEvent.change(screen.getByLabelText('Deskripsi'), { target: { value: 'Updated Description' } });
    fireEvent.change(screen.getByLabelText('Harga'), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText('URL Gambar'), { target: { value: 'https://example.com/newimage.jpg' } });

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        id: '60',
        title: 'Sleek Steel Tuna',
        description: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
        price: 172.00,
        image: 'https://loremflickr.com/cache/resized/6193_6078636809_017bb6906a_z_640_480_nofilter.jpg'
      }),
      ok: true,
    });

    fireEvent.click(screen.getByText('Simpan'));

    // Tunggu sampai produk diperbarui
    await waitFor(() => {
      expect(screen.getByText('Updated Product')).toBeInTheDocument();
      expect(screen.getByText('Updated Description')).toBeInTheDocument();
      expect(screen.getByText('$200')).toBeInTheDocument();
      expect(screen.getByAltText('Updated Product')).toHaveAttribute('src', 'https://example.com/newimage.jpg');
    });
  });

  it('deletes product and navigates back to product list', async () => {
    const mockProduct = {
        id: '60',
        title: 'Sleek Steel Tuna',
        description: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
        price: 172.00,
        image: 'https://loremflickr.com/cache/resized/6193_6078636809_017bb6906a_z_640_480_nofilter.jpg'
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockProduct),
      ok: true,
    });

    renderWithRouter(<ProductDetail />, { route: '/product/1' });

    // Tunggu sampai produk dimuat
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    // Mock window.confirm
    window.confirm = jest.fn(() => true);

    fetch.mockResolvedValueOnce({
      ok: true,
    });

    fireEvent.click(screen.getByText('Delete'));

    // Tunggu sampai produk dihapus
    await waitFor(() => {
      expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
    });
  });

  it('navigates back to the product list on back button click', async () => {
    const mockProduct = {
        id: '60',
        title: 'Sleek Steel Tuna',
        description: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
        price: 172.00,
        image: 'https://loremflickr.com/cache/resized/6193_6078636809_017bb6906a_z_640_480_nofilter.jpg'
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockProduct),
      ok: true,
    });

    renderWithRouter(<ProductDetail />, { route: '/product/1' });

    // Tunggu sampai produk dimuat
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Back'));

    // Tunggu sampai navigasi bekerja
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });
});
