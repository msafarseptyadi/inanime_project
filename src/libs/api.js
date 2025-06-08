export const getAnimeResponse = async(query, variables) => {
    const response = await fetch(`https://graphql.anilist.co`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    })
    const anime = await response.json()
    return anime.data;
}