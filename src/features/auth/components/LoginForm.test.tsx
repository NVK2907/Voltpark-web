import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { LoginForm } from '@/features/auth/components/LoginForm';

// Wrapper with required providers
function TestProviders({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: 0 }, mutations: { retry: 0 } },
  });
  return (
    <QueryClientProvider client={qc}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

describe('LoginForm', () => {
  it('renders email and password inputs', () => {
    render(
      <TestProviders>
        <LoginForm />
      </TestProviders>,
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();
    render(
      <TestProviders>
        <LoginForm />
      </TestProviders>,
    );

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('shows invalid email error', async () => {
    const user = userEvent.setup();
    render(
      <TestProviders>
        <LoginForm />
      </TestProviders>,
    );

    await user.type(screen.getByRole('textbox', { name: /email/i }), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup();
    render(
      <TestProviders>
        <LoginForm />
      </TestProviders>,
    );

    await user.type(screen.getByRole('textbox', { name: /email/i }), 'admin@example.com');
    await user.type(screen.getByPlaceholderText('••••••••'), '123456');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    // Should enter loading state (button becomes disabled)
    expect(await screen.findByRole('button', { name: /signing in/i })).toBeDisabled();
  });
});
