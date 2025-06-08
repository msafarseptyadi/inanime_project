"use client";

import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header";
import SkeletonCard from "@/components/Utilities/Skeleton";
import { getAnimeResponse } from "@/libs/api";
import { useState, useRef, useCallback, useEffect } from "react";

export default function Home() {
    const [animeList, setAnimeList] = useState([]);
    const [animeTrendings, setAnimeTrendings] = useState([]);
    const [genres, setGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingFirst, setLoadingFirst] = useState(true);
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
    
    console.log("selectedGenre",selectedGenre);
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
        const fetchAnimeTrendings = async () => {
        setLoadingFirst(true);
        const query = `
            query ($page: Int, $perPage: Int) {
            Page(page: $page, perPage: $perPage) {
                media(type: ANIME, sort: TRENDING_DESC) {
                id
                title { romaji english }
                coverImage { large color }
                description
                bannerImage
                genres
                averageScore
                }
            }
            }`;

        try {
            const data = await getAnimeResponse(query, { page: 1, perPage: 3 });
            setAnimeTrendings(data.Page.media);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingFirst(false);
        }
        };

        const fetchGenres = async () => {
        const query = `query { genres: GenreCollection }`;
        try {
            const data = await getAnimeResponse(query);
            setGenres(data.genres);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
        };

        fetchAnimeTrendings();
        fetchGenres();
    }, []);

    const handleGenreChange = (selectedGenre) => {
        setSelectedGenre(selectedGenre);
    };

    const loader = useRef(null);
    const handleObserver = useCallback((entries) => {
    const target = entries[0];
        if (target.isIntersecting && hasMore && !loading && online) {
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
        setAnimeList([]);   
        setPage(1);         
        setHasMore(true); 
        fetchAnime(1, true);
    }, [selectedGenre, fetchAnime]);

    return (
        <section>
            <div className="absolute mx-auto w-full">
            <div className="container mx-auto -mt-35 p-4">
                <Header title={'Trending Now'} color={'text-white'} filter={false}/>
                <AnimeList data={animeTrendings} loading={loadingFirst} />
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
