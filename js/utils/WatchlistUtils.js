
export function getWatchlist() {

    return JSON.parse(localStorage.getItem('watchlist')) || []
}

function saveWatchList(watchlist) {
    try {
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
        return true;
    } catch (err) {
        console.error('Error while saving the watchlist to localStorage: ', err)
        return false;
    }
}


export function checkIfInWatchList(movieID) {
    const watchlist = getWatchlist();
    return watchlist.some(item => item.idmbID === movieID)
}

export function getMovieFromWatchlist(movieID) {
    const watchlist = getWatchlist()
    return watchlist.find(item => item.imdbID === movieID) || null
}

export function addToWatchList(movie) {
    if(!movie || !movie.imdbID){
        throw new Error('Invalid movie object: missing imdbID')
        return;
    }

    const watchlist = getWatchlist()

    if(watchlist.some(item => item.imdbID === movie.imdbID)){
        console.warn(`Movie ${movie.Title} with ID: ${movie.imdbID} is already in watchlist`)
        return false;
    }
    watchlist.push(movie)
    return saveWatchList(watchlist)
}

export function removeFromWatchList(movieID) {
    const watchlist = getWatchlist()
    const watchlistLength = watchlist.length
    const updatedWatchlist = watchlist.filter(item => item.imdbID === movieID)
    
    if(watchlistLength === updatedWatchlist.length){
        console.warn(`Movie with ID ${imdbID} not found in watchlist`)
        return false;
    }

    return saveWatchList(updatedWatchlist)
}
