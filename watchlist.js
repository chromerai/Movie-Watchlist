import { getMovieCardHtml } from "./js/utils/getMovieCardHtml.js"
import { getWatchlist, getWatchListLength, removeFromWatchList } from "./js/utils/WatchlistUtils.js"

const emptyStateEl = document.querySelector('.empty-state')
const populatedStateEl = document.getElementById('populated-state')

async function renderWatchList() {
    const watchlist = getWatchlist()
    if(getWatchListLength() !== 0) {
        emptyStateEl.style.display = "none"
        const htmlContent = await getMovieCardHtml(watchlist, 'watchlist')
        populatedStateEl.innerHTML = htmlContent
    } 
}

populatedStateEl.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove-btn')){
        const id = e.target.dataset.remove
        if(removeFromWatchList(id)) {
            const updatedWatchlist = getWatchlist()
            const htmlContent = getMovieCardHtml(updatedWatchlist, 'watchlist')
            populatedStateEl.innerHTML = htmlContent
        }
    } 
})

renderWatchList()