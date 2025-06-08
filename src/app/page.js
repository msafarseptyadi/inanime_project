"use client";

import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header";
import SkeletonCard from "@/components/Utilities/Skeleton";
import { getAnimeResponse } from "@/libs/api";
import { useState, useRef, useCallback, useEffect } from "react";

export default function Home() {
    const [animeList, setAnimeList] = useState([]);
    const [genres, setGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState("");

    const fetchAnime = useCallback(async (currentPage, reset = false) => {
    setLoading(true);
    const queryWithGenre = `
        query ($page: Int, $perPage: Int, $genre: String) {
        Page(page: $page, perPage: $perPage) {
            pageInfo { hasNextPage }
            media(type: ANIME, genre_in: [$genre]) {
            id title { romaji english }
            coverImage { large color }
            description
            bannerImage
            genres
            averageScore
            }
        }
        }`;

    const queryWithoutGenre = `
        query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo { hasNextPage }
            media(type: ANIME) {
            id title { romaji english }
            coverImage { large color }
            description
            bannerImage
            genres
            averageScore
            }
        }
        }`;

    const query = selectedGenre ? queryWithGenre : queryWithoutGenre;
    const variables = { page: currentPage, perPage: 9 };
    if (selectedGenre && selectedGenre !== "0") {
        variables.genre = selectedGenre;
    }

    try {
        const data = await getAnimeResponse(query, variables);
        setAnimeList(prev => reset ? data.Page.media : [...prev, ...data.Page.media]);
        setHasMore(data.Page.pageInfo.hasNextPage);
        setPage(currentPage + 1);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    }, [selectedGenre]);

    useEffect(() => {
        const fetchGenres = async () => {
            const query = `query { genres: GenreCollection }`;
            try {
                const data = await getAnimeResponse(query);
                setGenres(data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    const handleGenreChange = (selectedGenre) => {
        setSelectedGenre(selectedGenre);
    };

    const loader = useRef(null);
    const handleObserver = useCallback((entries) => {
    const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
            fetchAnime(page);
        }
    }, [hasMore, loading]);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 1
        };

        const observer = new IntersectionObserver(handleObserver, option);
            if (loader.current) observer.observe(loader.current);

            return () => {
            if (loader.current) observer.unobserve(loader.current);
            };
    }, [handleObserver]);

    useEffect(() => {
        setAnimeList([]);   // reset data
        setPage(1);         // reset page
        setHasMore(true);   // reset infinite scroll
        console.log("test masuk sini");
        fetchAnime(1, true);
    }, [selectedGenre, fetchAnime]);

    const animeTrendings = [
        {
          "id": 156092,
          "title": {
            "english": "To Be Hero X",
            "romaji": "Tu Bian Yingxiong X"
          },
          "description": "This is a world where heroes are created by people's trust, and the hero who gains the most trust is known as X. In this world, people's trust can be quantified through data, and these values are reflected on everyone's wrist. As long as one gains enough trust points, an ordinary person can possess superpowers and become a superhero who saves the world. However, the constantly changing trust values make the path of a hero full of uncertainties...\n<br><br>\n(Source: Official To Be Hero X home page)",
          "genres": [
            "Action",
            "Drama",
            "Mystery",
            "Supernatural"
          ],
          "averageScore": 83,
          "coverImage": {
            "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx156092-yHqgQZOF2mbg.jpg"
          }
        },
        {
          "id": 180367,
          "title": {
            "english": "WITCH WATCH",
            "romaji": "Witch Watch"
          },
          "description": "Morihito Otogi, a high school student who comes from a lineage of ogres, enjoys a peaceful, ordinary life until his childhood friend, Nico, moves in with him. Nico is a witch-in-training, and chooses Morihito to be her familiar. While Nico is thrilled to reunite with her old friend and crush, Morihito is tasked with the perilous duty to protect her from a foretold calamity. Between the unpredictable chaos caused by Nico’s magic, and the awkwardness of sharing a home, their lives become a whirlwind of supernatural hijinks and threats.\n<br><br>\n(Source: Crunchyroll) <br><br>\n\n<i>Notes: <br>\n- Worldwide premiere of Episodes 1-3 titled as <b>WITCH WATCH: WATCH PARTY</b> before the Japanese premiere was pre-screened in advance in theaters on March 16, 2025 in North America by GKIDS Films and March 22 and 23 in Europe by Animation Digital Network. <br>\n- Episodes 1-2 + a selection of stories (Cat Scout, Kanshi's Part Time Job Diaries ~ The Side Job ~, and Kan & Nico's Channel) was pre-screened in advance in theaters on March 30, 2025 in Japan. The regular TV broadcast began April 6, 2025.</i>",
          "genres": [
            "Comedy",
            "Drama",
            "Fantasy",
            "Romance",
            "Slice of Life",
            "Supernatural"
          ],
          "averageScore": 73,
          "coverImage": {
            "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx180367-GlRuB2lG7Kaa.jpg"
          }
        },
        {
          "id": 176301,
          "title": {
            "english": "The Apothecary Diaries Season 2",
            "romaji": "Kusuriya no Hitorigoto 2nd Season"
          },
          "description": "The second season of <i>Kusuriya no Hitorigoto</i>.<br><br>\n\nMaomao and Jinshi face palace intrigue as a pregnant concubine's safety and a looming conspiracy collide.<br><br>\n\n(Source: Crunchyroll News)",
          "genres": [
            "Drama",
            "Mystery"
          ],
          "averageScore": 87,
          "coverImage": {
            "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx176301-TIGmldLffQGX.jpg"
          }
        },
    ];

    return (
        <section>
            <div className="absolute mx-auto w-full">
            <div className="container mx-auto -mt-35 p-4">
                <Header title={'Trending Now'} color={'text-white'} filter={false}/>
                <AnimeList data={animeTrendings} />
            </div>
            <div className="container mx-auto p-4 mb-100">
                <Header title={'Anime'} color={'text-black'} filter={true} genres={genres} onGenreChange={handleGenreChange}/>
                <AnimeList data={animeList} />
                {loading && (
                    <div className="grid
                                gap-4
                                grid-cols-[repeat(3,minmax(390px,500px))]
                                max-[1345px]:grid-cols-2
                                max-[768px]:grid-cols-1
                                justify-center
                                w-full
                                min-w-0
                                mt-5">
                    {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                )}
                <div ref={loader} />
            </div>
            </div>
        </section>
    );
}
