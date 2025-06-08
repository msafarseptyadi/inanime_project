export default function Header({title, color, filter, genres, onGenreChange}) {
  return (
    <div className="flex justify-between">
        <h1 className={`${color} text-xl font-bold py-4 uppercase`}>{title}</h1>
        {filter &&
            <form>
                <select onChange={(e) => onGenreChange(e.target.value)} id="genres" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue={""}>Choose a Genre</option>
                    {
                        genres.map((genre,i) => (
                            <option value={genre} key={i}>{genre}</option>
                        ))
                    }
                </select>
            </form>
        }
    </div>
  );
}
