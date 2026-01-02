

export async function getMovieCardHtml(ObjList) {
        const promises = ObjList.map(async (item) => {
        const res = await fetch(`http://www.omdbapi.com/?apikey=be014527&i=${item.imdbID}`)
        const info = await res.json()

        if(!info.Response){
            throw new Error(info.Error)
            return
        }

        const poster = (info.Poster !== 'N/A')? info.Poster: "/assets/images/placeholderPoster.png"
        
        return `<div class="movie-card">
            <img class="movie-card__img" src="${poster}" onerror="this.src='/assets/images/placeholderPoster.png';" alt="Poster for ${info.Title}">
            <div class="movie-card__details">
                <div class="movie-card__details-header">
                    <h2>${info.Title}</h2>
                    <p><span class="ratings">&starf;</span> ${info.imdbRating}</p> 
                </div>
                <div class="movie-card__details-metadata">
                    <p>${info.Runtime}</p>
                    <p>${info.Genre}</p>
                    <div class="movie-card__details-add-btn">
                        <button class="add-btn" data-add="${info.imdbID}">+</button>
                        <span>Watchlist</span>
                    </div>
                </div>
                <p class="movie-card__details-plot">${info.Plot}</p>
            </div>
        </div>`
        })

        const htmlArray = await Promise.all(promises)
        const movieListHTML = htmlArray.join("")
    return movieListHTML
}