import Image from "next/image";
import Link from "next/link";

export default function AnimeList({data}){
    return(
        <div className="grid
                              gap-4
                              grid-cols-[repeat(3,minmax(390px,500px))]
                              max-[1345px]:grid-cols-2
                              max-[768px]:grid-cols-1
                              justify-center
                              w-full
                              min-w-0">
              {data.map((card, i) => (
                  <Link 
                  key={i} 
                  href={`/anime/${card.id}`}
                  className="flex flex-row bg-white rounded-lg box-shadow-custom dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
                              h-230px
                              md:h-[265px]
                              min-w-[300px]
                              md:min-w-[370px]
                              overflow-hidden"
                  >
                  <div className="relative w-[120px] md:w-[185px] flex-shrink-0">
                      <Image
                      className="object-cover rounded-s-lg"
                      src={card.image}
                      alt=""
                      fill
                      />
                  </div>
                  <div className="relative flex-1 flex flex-col justify-between">
                      <div className="p-4 min-w-[200px]">
                      <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                          {card.title}
                      </h2>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm line-clamp-3">
                          {card.description}
                      </p>
                      </div>
                      <div className="p-3 w-full rounded-br-lg flex flex-wrap gap-2" style={{backgroundColor:`${card.color?? '#0d93e4'}1A`}}>
                      {card.tags.map((tag, j) => (
                          <span 
                          key={j}
                          className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-gray-700"
                          style={{backgroundColor:`${card.color??'#0d93e4'}80`}}
                          >
                          {tag}
                          </span>
                      ))}
                      </div>
                      <div className='absolute top-0 right-0 p-1'>
                          <div className="relative w-10 h-10 cursor-pointer group">
                              <div className="absolute inset-0 flex items-center justify-center 
                                              transition-all duration-300 ease-in-out 
                                              opacity-100 translate-x-0 group-hover:opacity-0 group-hover:-translate-x-4">
                                  <i className="fa-regular fa-face-smile-beam text-2xl text-green-500"></i>
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center 
                                              transition-all duration-300 ease-in-out 
                                              opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
                                  <span className="text-xs font-semibold text-center">Score: <span className='text-green-500'>86</span>/100</span>
                              </div>
                          </div>
                      </div>
                  </div>
                  </Link>
              ))}
        </div>
    )
}