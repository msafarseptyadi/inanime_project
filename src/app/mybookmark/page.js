"use client";

import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header";
import { useState, useEffect } from "react";

export default function Page() {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        setBookmarks(savedBookmarks);
    }, []);

  return (
    <section>
        <div className="absolute mx-auto w-full">
        <div className="container mx-auto -mt-35 p-4">
            <Header title={'My Bookmark'} color={'text-white'} filter={false}/>
            <AnimeList data={bookmarks} />
        </div>
        </div>
    </section>
  );
}
