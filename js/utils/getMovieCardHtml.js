import { checkIfInWatchList } from "./WatchlistUtils.js"


export async function getMovieCardHtml(ObjList, context='search') {
    const htmlArray = ObjList.map((item) => {
    
    const poster = (info.Poster !== 'N/A')? info.Poster: "/assets/images/placeholderPoster.png"
   
    const fullplot = info.Plot
    const needsTruncation = (fullplot.length > 135)
    const shortplot = (needsTruncation)? fullplot.slice(0, 135): fullplot;

    if(context === 'search') {
        const isInWatchlist = checkIfInWatchList(info.imdbID)
        actionButton = isInWatchlist ? 
        "<span class='watchlist-status'>Added to</span>"
        : `<button class="action-btn" data-add="${info.imdbID}">+</button>`
    } else if(context === 'watchlist') {
        actionButton = `<button class="action-btn" data-remove="${info.imdbID}">-</button>`
    }


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
                    ${actionButton}
                    <span>Watchlist</span>
                </div>
            </div>
            <div>
                <p class="movie-card__details-plot" data-full="${fullplot}" data-short="${shortplot}">${shortplot}</p>
                ${needsTruncation? `<button class="read-more-btn">Read more</button>` : ""}
            </div>
        </div>
    </div>`
    })

    return htmlArray.join("")
}