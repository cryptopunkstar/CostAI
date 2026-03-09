import { render, screen } from '@testing-library/react';
import CostAIApp from './App';

test('renders learn react link', () => {
  render(<CostAIApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
