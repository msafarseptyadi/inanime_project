import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from "@/components/AnimeList/Header";

describe('Header', () => {
  const defaultProps = {
    title: 'Trending Now',
    color: 'text-black',
    filter: true,
    genres: ['Action', 'Adventure'],
    onGenreChange: jest.fn(),
  };

  it('renders the title with the given color', () => {
    render(<Header {...defaultProps} />);
    const title = screen.getByText(defaultProps.title);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(defaultProps.color);
  });

  it('renders the dropdown if filter is true', () => {
    render(<Header {...defaultProps} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    // Check options length (+1 karena ada "Choose a Genre")
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(defaultProps.genres.length + 1);
    expect(options[1]).toHaveTextContent('Action');
    expect(options[2]).toHaveTextContent('Adventure');
  });

  it('does not render the dropdown if filter is false', () => {
    render(<Header {...defaultProps} filter={false} />);
    expect(screen.queryByRole('combobox')).toBeNull();
  });

  it('calls onGenreChange when selecting a genre', () => {
    render(<Header {...defaultProps} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Action' } });
    expect(defaultProps.onGenreChange).toHaveBeenCalledWith('Action');
  });
});
