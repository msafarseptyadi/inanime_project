import Link from "next/link";

export default function Header({title,color,filter}) {
   const genres = [
    {
        id: 1,
        title: "action",
    },
    {
        id: 2,
        title: "drama",
    },
    {
        id: 3,
        title: "fantasy",
    },
  ];

  return (
    <div className="flex justify-between">
        <h1 className={`${color} text-xl font-bold py-4 uppercase`}>{title}</h1>
        {filter &&
            <form>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option defaultValue={0}>Choose a Genre</option>
                {
                    genres.map((genre,i) => (
                        <option value={genre.id} key={genre.id}>{genre.title}</option>
                    ))
                }
            </select>
        </form>
        }
    </div>
  );
}
