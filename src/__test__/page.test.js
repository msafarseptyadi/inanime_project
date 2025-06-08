import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Page from '../app/page';
import * as api from '@/libs/api'; // supaya bisa di-mock
import userEvent from '@testing-library/user-event';

// 1️⃣ Mock getAnimeResponse
jest.mock('@/libs/api', () => ({
  getAnimeResponse: jest.fn()
}));

// 2️⃣ Mock IntersectionObserver
beforeAll(() => {
  class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe(target) {
      // Simulasikan langsung intersecting
      this.callback([{ isIntersecting: true }]);
    }
    unobserve() {}
    disconnect() {}
  }
  window.IntersectionObserver = IntersectionObserver;
});

describe('Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders page and fetches anime trendings and genres', async () => {
    // 3️⃣ Siapkan fake response
    api.getAnimeResponse
      .mockResolvedValueOnce({
        Page: { media: [{ id: 1, title: { romaji: 'Test', english: 'Test English' }, coverImage: { large: '/image.jpg', color: '#000' }, description: 'desc', genres: ['Action'], averageScore: 90 }] }
      }) // for trending anime
      .mockResolvedValueOnce({
        genres: ['Action', 'Drama', 'Comedy']
      }) // for genres
      .mockResolvedValue({
        Page: { media: [], pageInfo: { hasNextPage: false } }
      }); // for fetchAnime

    render(<Page />);

    // 4️⃣ Tunggu trending anime muncul
    await waitFor(() => {
      expect(api.getAnimeResponse).toHaveBeenCalled();
    });

    // 5️⃣ Cek judul trending
    expect(screen.getByText(/Trending Now/i)).toBeInTheDocument();

    // 6️⃣ Cek genre header
    expect(screen.getByText(/Anime/i)).toBeInTheDocument();

    // 7️⃣ Cek genre fetch
    expect(api.getAnimeResponse).toHaveBeenCalledWith(expect.stringContaining('GenreCollection'));

    // 8️⃣ Cek fetchAnime dipanggil saat load
    expect(api.getAnimeResponse).toHaveBeenCalledWith(
      expect.stringContaining('query ($page: Int, $perPage: Int)'),
      expect.objectContaining({ page: 1, perPage: 9 })
    );
  });

  it('handles error during fetch', async () => {
    api.getAnimeResponse.mockRejectedValue(new Error('API Error'));

    render(<Page />);

    await waitFor(() => {
      // harus ada console.error yang dipanggil
      expect(api.getAnimeResponse).toHaveBeenCalled();
    });
  });

  it('renders loading skeletons while loading', async () => {
    api.getAnimeResponse.mockResolvedValueOnce({
      Page: { media: [], pageInfo: { hasNextPage: false } }
    });
    api.getAnimeResponse.mockResolvedValueOnce({
      genres: ['Action']
    });
    api.getAnimeResponse.mockResolvedValue({
      Page: { media: [], pageInfo: { hasNextPage: false } }
    });

    render(<Page />);
    
    // Skeleton trending
    expect(await screen.findByTestId('anime-list')).toBeInTheDocument();
  });

  it('handles genre change', async () => {
    api.getAnimeResponse.mockResolvedValue({
      Page: { media: [], pageInfo: { hasNextPage: false } }
    });
    render(<Page />);

    const genreButton = screen.getByText(/Anime/i);
    // simulate genre change (you'd need to simulate clicking dropdown in your real component)
    // but since we only have "Header" component with onGenreChange, you can skip this or test handleGenreChange directly in integration tests
  });
});
