import {getMovieCardHtml} from "./utils/getMovieCardHtml.js"

let populatedStateEl = document.getElementById('populated-state')
let searchBtn = document.getElementById('search-button')
let searchInputEl = document.getElementById('search-input')
let watchlist = JSON.parse(localStorage.getItem("watchlist"))

document.getElementById('populated-state__error').style.display = 'none';
searchBtn.addEventListener("click", async () => {
    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=be014527&s=${searchInputEl.value}&type=movie`)
        const data = await res.json()
        if(!data.Response){
            throw new Error(data.Error)
            return;
        }

        const searchList = data.Search
        const htmlContent = await getMovieCardHtml(searchList)
        populatedStateEl.innerHTML = htmlContent

    } catch (err)
    {
        console.log(err)
        document.getElementById('populated-state__error').style.display = 'block';
    }
    
})

const Btns = document.querySelectorAll('.add-btn')
Btns.forEach(btn => {addEventListener('click', (e) => {
    const id = e.target.dataset.add
    const watchlistItem = searchList.filter(item => item.imdbID === id)[0]

    watchlist.push(watchlistItem)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
})})
