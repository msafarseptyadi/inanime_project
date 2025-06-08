"use client";

import Image from "next/image";
import { getAnimeResponse } from "@/libs/api";
import { useState, useEffect, useContext  } from "react";
import { useParams } from 'next/navigation';
import { ValueContext } from "@/contexts/ValueContext";

export default function Page(){
    const { setSharedValue } = useContext(ValueContext);
    const params = useParams();
    const id = params.id;

    const [animeDetail, setAnimeDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetailAnime = async () => {
        setLoading(true);

        const query = `
            query ($id: Int) {
            Media(id: $id, type: ANIME) {
                id
                title {
                romaji
                english
                native
                }
                bannerImage
                description
                genres
                averageScore
                coverImage {
                large
                }
                trailer {
                id
                thumbnail
                site
                }
            }
            }
        `;

        const variables = {
            id: parseInt(id, 10)
        };

        try {
            const data = await getAnimeResponse(query, variables);
            setAnimeDetail(data.Media);
            setSharedValue(data.Media.bannerImage);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (id) {
      fetchDetailAnime();
    }
    
    }, [setSharedValue]);

    const AnimeScoreBadge = ({ averageScore }) => {
        let icon;
        let color;

        if (averageScore >= 80) {
            icon = <i className="fa-regular fa-face-smile-beam text-2xl text-green-500"></i>;
            color = 'text-green-500';
        } else if (averageScore >= 70) {
            icon = <i className="fa-regular fa-face-meh text-2xl text-orange-400"></i>;
            color = 'text-orange-400';
        } else {
            icon = <i className="fa-regular fa-face-frown text-2xl text-red-600"></i>;
            color = 'text-red-600';
        }
        return (
        <div className="flex justify-end items-center mt-2">
            <span className="me-3">Score: <span className={`${color}`}>{averageScore}</span>/100</span> 
            {icon}
        </div>
        );
    };

    if (loading) {
        return <p className="text-center py-5">Loading...</p>;
    }else{
        return(
        <>
        <section className="mb-5">
            <div className="container mx-auto">
                <div className="md:flex md:flex-row">
                    <div className="relative w-[265px] mx-auto">
                        <Image
                            className="object-cover rounded-xs -mt-35"
                            src={animeDetail.coverImage.large}
                            alt=""
                            width={265}
                            height={370}
                        />
                        <button type="button" className={`text-gray-800 hover:bg-[#f6ad12]/80 cursor-pointer bg-[#f6ad12] transition font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2 w-full`}><i className="fa-solid fa-bookmark me-2"></i> Bookmark</button>
                    </div>
                    <div className="p-4 w-full">
                        <h1 className="text-2xl mb-3 font-bold">{animeDetail.title.english??animeDetail.title.romaji}</h1>
                        <p dangerouslySetInnerHTML={{ __html: animeDetail.description }}></p>
                        <div className="mt-3">
                            <div>
                                <div className="w-full rounded-br-lg flex flex-wrap gap-2">
                                {animeDetail.genres.map((tag, j) => (
                                    <span 
                                    key={j}
                                    className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-gray-700 bg-[#0d93e4]/50"
                                    >
                                    {tag}
                                    </span>
                                ))}
                                </div>
                                <AnimeScoreBadge averageScore={animeDetail.averageScore} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="bg-gray-200">
            <div className="container mx-auto py-4">
                <h1 className="text-2xl font-bold mb-3">Trailer</h1>
                {animeDetail.trailer ? (
                <iframe
                    frameBorder={0}
                    allowFullScreen="allowfullscreen"
                    width={350}
                    height={250}
                    src={`https://www.youtube.com/embed/${animeDetail.trailer.id}`}
                ></iframe>
                ) : (
                <p className="text-gray-500">No trailer available.</p>
                )}
            </div>
        </section>
        </>
        )   
    }
}