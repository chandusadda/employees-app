import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Terms of Use from footer', () => {
  render(<App />);
  const linkElement = screen.getByText(/Terms of Use/i);
  expect(linkElement).toBeInTheDocument();
});
