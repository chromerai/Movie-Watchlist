import { getAllMovieDetails } from "./js/api/getMovieData.js"
import {getMovieCardHtml} from "./js/utils/getMovieCardHtml.js"
import { addToWatchList } from "./js/utils/WatchlistUtils.js"

let populatedStateEl = document.getElementById('populated-state')
let searchBtn = document.getElementById('search-button')
let searchInputEl = document.getElementById('search-input')
let fullMoviesData = []

document.getElementById('populated-state__error').style.display = 'none';
searchBtn.addEventListener("click", async () => {
    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=be014527&s=${searchInputEl.value}&type=movie`)
        const data = await res.json()
        if(!data.Response){
            throw new Error(data.Error)
            return;
        }

        if(!data.Search) {
            throw new Error("No content found")
            return
        }

        fullMoviesData = await getAllMovieDetails(data.Search)
        const htmlContent = await getMovieCardHtml(fullMoviesData, 'search')
        document.querySelector(".empty-state").style.display = "none";
        populatedStateEl.innerHTML = htmlContent

    } catch (err)
    {
        console.log(err)
        document.querySelector(".empty-state").style.display = "none";
        document.getElementById('populated-state__error').style.display = 'block';
    }
    
})

populatedStateEl.addEventListener('click', (e) => {
    if(e.target.classList.contains('add-btn')){
        const id = e.target.dataset.add
        const watchlistItem = fullMoviesData.find(item => item.imdbID === id)
        if(addToWatchList(watchlistItem)) {
            e.target.parentElement.textContent = 'Added!'
            e.target.disabled = true;
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