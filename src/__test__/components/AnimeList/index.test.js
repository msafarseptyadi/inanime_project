import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AnimeList from "@/components/AnimeList"

describe('AnimeList', () => {
  const mockData = [
    {
      id: 1,
      title: { romaji: 'Test Anime', english: 'Test Anime English' },
      description: 'This is a test description.',
      coverImage: { large: '/test.jpg', color: '#123456' },
      genres: ['Action', 'Adventure'],
      averageScore: 85,
    },
    {
      id: 2,
      title: { romaji: 'Test Anime 2', english: 'Test Anime 2 English' },
      description: 'This is a second test description.',
      coverImage: { large: '/test2.jpg', color: '#654321' },
      genres: ['Comedy'],
      averageScore: 75,
    },
    {
      id: 3,
      title: { romaji: 'Test Anime 3', english: 'Test Anime 3 English' },
      description: 'This is a third test description.',
      coverImage: { large: '/test3.jpg', color: '#abcdef' },
      genres: ['Drama'],
      averageScore: 65,
    },
  ];

  it('renders AnimeList with all score badges', () => {
    render(<AnimeList data={mockData} loading={false} />);
    
    // Cek judul
    expect(screen.getByText('Test Anime English')).toBeInTheDocument();
    expect(screen.getByText('Test Anime 2 English')).toBeInTheDocument();
    expect(screen.getByText('Test Anime 3 English')).toBeInTheDocument();
    
    // Cek icon untuk score 85
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();  // fa-regular icons rendered as <i>, but can also check by className if needed

    // Cek score badge text
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<AnimeList data={mockData} loading={false} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
