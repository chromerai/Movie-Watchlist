export async function getMovieDetails(imdbID) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=be014527&i=${imdbID}`)
    if(!res.ok) {
        throw new Error(`Error fetching details for movie with id: ${imdbID}`)
        return;
    }

    const info = await res.json()
    
    if(!info.Response){
        throw new Error(info.Error)
        return
    }

    return info
}

export async function getAllMovieDetails(movieList) {
    const promises = movieList.map((movie) => getMovieDetails(movie.imdbID))
    return await Promise.all(promises)
}