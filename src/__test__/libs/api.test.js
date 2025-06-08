import { getAnimeResponse } from "@/libs/api";

// Setup jest mock untuk global fetch
global.fetch = jest.fn();

describe('getAnimeResponse', () => {
  beforeEach(() => {
    fetch.mockClear(); // bersihin mock di tiap test
  });

  it('should call fetch with correct URL and options', async () => {
    // Dummy response
    const mockResponse = {
      json: jest.fn().mockResolvedValue({
        data: { Page: { media: [] } }
      })
    };

    fetch.mockResolvedValue(mockResponse);

    const query = 'query { media { id title } }';
    const variables = { page: 1, perPage: 10 };

    const result = await getAnimeResponse(query, variables);

    expect(fetch).toHaveBeenCalledWith(
      'https://graphql.anilist.co',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query, variables })
      })
    );

    expect(result).toEqual({ Page: { media: [] } });
  });

  it('should handle different data returned', async () => {
    const fakeData = { data: { Page: { media: [{ id: 1 }] } } };
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(fakeData)
    });

    const result = await getAnimeResponse('fake-query', {});
    expect(result).toEqual(fakeData.data);
  });

  it('should throw if fetch fails', async () => {
    fetch.mockRejectedValue(new Error('Network Error'));

    await expect(getAnimeResponse('query', {})).rejects.toThrow('Network Error');
  });
});
