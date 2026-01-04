import { getMovieCardHtml } from "./js/utils/getMovieCardHtml.js"
import { getWatchlist, getWatchListLength, removeFromWatchList } from "./js/utils/WatchlistUtils.js"

const emptyStateEl = document.querySelector('.empty-state')
const populatedStateEl = document.getElementById('populated-state')

async function renderWatchList() {
    const watchlist = getWatchlist()
    if(getWatchListLength() !== 0) {
        emptyStateEl.style.display = "none"
        const htmlContent = await getMovieCardHtml(watchlist.reverse(), 'watchlist')
        populatedStateEl.innerHTML = htmlContent
    } else {
        emptyStateEl.style.display = 'block'
        populatedStateEl.style.display = 'none'
        populatedStateEl.innerHTML = ""
    }
}

populatedStateEl.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove-btn')){
        const id = e.target.dataset.remove
        if(removeFromWatchList(id)) {
            renderWatchList()

        }
    }

    if(e.target.classList.contains('read-more-btn')) {
        const btn = e.target
        const plotEl = btn.previousElementSibling;

        plotEl.classList.toggle('expanded')

        if(plotEl.classList.contains('expanded')) {
            plotEl.textContent = plotEl.dataset.full
            btn.textContent = 'Show less'
        } else {
            plotEl.textContent = plotEl.dataset.short
            btn.textContent = 'Read more'
        }
    }
})

renderWatchList()