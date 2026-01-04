import { checkIfInWatchList } from "./WatchlistUtils.js"

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}


export async function getMovieCardHtml(ObjList, context='search') {
    const htmlArray = ObjList.map((item) => {
    
    const poster = (item.Poster !== 'N/A')? item.Poster: "/assets/images/placeholderPoster.png"
   
    const fullplot = item.Plot
    const needsTruncation = (fullplot.length > 135)
    const shortplot = (needsTruncation)? fullplot.slice(0, 135): fullplot;
    let actionButton;

    if(context === 'search') {
        const isInWatchlist = checkIfInWatchList(item.imdbID)
        actionButton = isInWatchlist ? 
        "<span class='watchlist-status'>Added to</span>" :`<button class="action-btn add-btn" data-add="${item.imdbID}">+</button>`
    } else if(context === 'watchlist') {
        actionButton = `<button class="action-btn remove-btn" data-remove="${item.imdbID}">-</button>`
    }


    return `<div class="movie-card">
        <img class="movie-card__img" src="${poster}" onerror="this.src='/assets/images/placeholderPoster.png';" alt="Poster for ${item.Title}">
        <div class="movie-card__details">
            <div class="movie-card__details-header">
                <h3>${item.Title}</h3>
                <p><span class="ratings">&starf;</span> ${item.imdbRating}</p> 
            </div>
            <div class="movie-card__details-metadata">
                <p>${item.Runtime}</p>
                <p>${item.Genre}</p>
                <div class="movie-card__details-add-btn">
                    ${actionButton}
                    ${context === 'search' ? `<span>Watchlist</span>` : `<span>Remove</span>`}
                </div>
            </div>
            <div>
                <p class="movie-card__details-plot" data-full="${escapeHtml(fullplot)}" data-short="${escapeHtml(shortplot)}">${shortplot}</p>
                ${needsTruncation? `<button class="read-more-btn">Read more</button>` : ""}
            </div>
        </div>
    </div>`
    })

    return htmlArray.join("")
}