import AnimeList from "@/components/AnimeList"
import Header from "@/components/AnimeList/Header";

export default function Home() {

  const animeTrendings = [
  {
      id: 1,
      title: "Noteworthy technology acquisitions 2021",
      description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
      image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-GCsPm7waJ4kS.png",
      tags: ["photography", "travel", "winter"],
      color:"#0d93e4",
      score: 86
  },
  {
      id: 2,
      title: "Another anime",
      description: "This is another anime description.",
      image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-GCsPm7waJ4kS.png",
      tags: ["adventure", "fantasy"],
      color:"#0d93e4",
      score: 70
  },
  {
      id: 2,
      title: "Another anime",
      description: "This is another anime description.",
      image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-GCsPm7waJ4kS.png",
      tags: ["adventure", "fantasy"],
      color:"#f1bb5d",
      score: 60
  },
  ];

  const animes = [
    {
        id: 1,
        title: "Noteworthy technology acquisitions 2021",
        description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-GCsPm7waJ4kS.png",
        tags: ["photography", "travel", "winter"],
        color:"#0d93e4",
        score: 86
    },
    {
        id: 2,
        title: "Another anime",
        description: "This is another anime description.",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-GCsPm7waJ4kS.png",
        tags: ["adventure", "fantasy"],
        color:"#0d93e4",
        score: 70
    },
    {
        id: 2,
        title: "Another anime",
        description: "This is another anime description.",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-GCsPm7waJ4kS.png",
        tags: ["adventure", "fantasy"],
        color:"#f1bb5d",
        score: 60
    },
    {
        id: 1,
        title: "Noteworthy technology acquisitions 2021",
        description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-GCsPm7waJ4kS.png",
        tags: ["photography", "travel", "winter"],
        color:"#0d93e4",
        score: 86
    },
    {
        id: 2,
        title: "Another anime",
        description: "This is another anime description.",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-GCsPm7waJ4kS.png",
        tags: ["adventure", "fantasy"],
        color:"#0d93e4",
        score: 70
    },
    {
        id: 2,
        title: "Another anime",
        description: "This is another anime description.",
        image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-GCsPm7waJ4kS.png",
        tags: ["adventure", "fantasy"],
        color:"#f1bb5d",
        score: 60
    },
  ];

  return (
    <section>
        <div className="absolute mx-auto w-full">
          <div className="container mx-auto -mt-35 p-4">
              <Header title={'Trending Now'} color={'text-white'} filter={false}/>
              <AnimeList data={animeTrendings} />
          </div>
          <div className="container mx-auto p-4">
              <Header title={'Anime'} color={'text-black'} filter={true}/>
              <AnimeList data={animes} />
          </div>
        </div>
    </section>
  );
}
