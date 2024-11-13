import React from 'react';
import { render, screen } from '@testing-library/react';
import BookList from './BookList';

test('renders BookList component', () => {
    render(<BookList />);
    const titleElement = screen.getByText(/Book List/i);
    expect(titleElement).toBeInTheDocument();
});
