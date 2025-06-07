import Image from "next/image";
import Link from "next/link";

export default function Page(){
    const tags = ["photography", "travel", "winter"]
    return(
        <>
        <section>
            <div className="container mx-auto">
                <div className="md:flex md:flex-row">
                    <div className="relative w-[265px] mx-auto">
                        <Image
                        className="object-cover rounded-xs -mt-35"
                        src={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-GCsPm7waJ4kS.png"}
                        alt=""
                        width={265}
                        height={370}
                        />
                        <button type="button" className="text-gray-800 bg-[#f6ad12] hover:bg-[#f6ad12]/80 transition font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2 w-full cursor-pointer"><i className="fa-solid fa-bookmark me-2"></i> Bookmark</button>
                    </div>
                    <div className="p-4 w-full">
                        <h1 className="text-2xl mb-3 font-bold">Kusuriya no Hitorigoto 2nd Season</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <div className="mt-3">
                            <div>
                                <div className="w-full rounded-br-lg flex flex-wrap gap-2">
                                {tags.map((tag, j) => (
                                    <span 
                                    key={j}
                                    className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-gray-700 bg-[#0d93e4]/50"
                                    >
                                    {tag}
                                    </span>
                                ))}
                                </div>
                                <div className="flex justify-end items-center mt-2">
                                    <span className="me-3">Score: 80%</span> 
                                    <i className="fa-regular fa-face-smile-beam text-2xl text-green-500"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="bg-gray-200">
            <div className="container mx-auto py-4">
                <h1 className="text-2xl font-bold mb-3">Trailer</h1>
                <iframe frameBorder={0} allowFullScreen={"allowfullscreen"} width={350} height={250}
                    src="https://www.youtube.com/embed/3BYutu3Pf_0">
                </iframe>
            </div>
        </section>
        </>
    )
}