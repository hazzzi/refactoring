import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import UserManagement from './UserManagement';

vi.mock('axios');

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', lastLogin: '2023-01-01T00:00:00Z' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', lastLogin: '2023-01-02T00:00:00Z' },
];

describe('UserManagement', () => {
  beforeEach(() => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockUsers });
  });

  it('renders user list', async () => {
    render(<UserManagement />);
    await waitFor(() => {
      expect(screen.getByText('John Doe (john@example.com)')).toBeDefined();
      expect(screen.getByText('Jane Smith (jane@example.com)')).toBeDefined();
    });
  });

  it('displays user details when a user is clicked', async () => {
    render(<UserManagement />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('John Doe (john@example.com)'));
    });
    expect(screen.getByText('Name: John Doe')).toBeDefined();
    expect(screen.getByText('Email: john@example.com')).toBeDefined();
    expect(screen.getByText('Role: user')).toBeDefined();
  });

  it('handles error when fetching users fails', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('API Error'));
    render(<UserManagement />);
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch users')).toBeDefined();
    });
  });
});