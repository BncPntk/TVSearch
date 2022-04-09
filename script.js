
// Elements
const TvSearch = document.querySelector('#TvSearch');
const form = document.querySelector('#searchForm');
const container = document.querySelector('.container');
const row = document.querySelector('.row-for-images');
const collapse = document.querySelector('#collapse');

const pBodyTitle = document.querySelector('#pBodyTitle');
const pBodyGenre = document.querySelector('#pBodyGenre');
const pBodyRating = document.querySelector('#pBodyRating');
const pBodyRunning = document.querySelector('#pBodyRunning');
// End of Elements
let dataArr = [];
let dataStr = '';

let res = '';
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = form.elements.searchField.value;
    res = await axios.get(`https://api.tvmaze.com/search/shows?q=${inputValue}`)

    // reset data array
    dataArr = [];
    row.innerHTML = '';
    deleteData();
    displayResults(res.data);
    form.elements.searchField.value = '';
    getData(res);
    showDetails();


})

// Delete show data from container on body click
document.body.addEventListener('click', () => {
    deleteData();
});

const getData = function (res) {

    for (let i = 0; i < res.data.length; i++) {
        showName = (res.data[i].show.name);
        idStr = `${res.data[i].show.id}`;
        nameStr = `${res.data[i].show.name}`;
        genreStr = `${res.data[i].show.genres}`;
        ratingStr = `${typeof res.data[i].show.rating.average === 'number' ? res.data[i].show.rating.average : 'No ratings available'}`;
        statusStr = `${res.data[i].show.status === 'Running' ? 'Running' : 'Ended'}`;
        dataStr = `${idStr};${nameStr};${genreStr};${ratingStr};${statusStr}`;
        // push show datas to an array
        dataArr.push(dataStr)
    }
}


const displayResults = (show) => {
    for (let result of show) {
        if (result.show.image) {
            let img = document.createElement('img');
            img.src = result.show.image.medium;

            img.classList.add('imageTile', 'col-6', 'col-md-4', 'col-lg-3', 'my-3');
            img.setAttribute('data-bs-toggle', 'collapse')
            img.setAttribute('data-bs-target', '#collapseWidthExample')
            row.append(img)
        }
    }
}
const showDetails = function () {
    if (document.getElementsByClassName('imageTile')) {
        const imageTile = document.querySelectorAll('img');
        for (let i = 0; i < imageTile.length; i++) {


            imageTile[i].addEventListener('click', () => {
                deleteData();
                let showData = dataArr[i].split(';');

                // TODO replace , to ' ' in genres
                appendData(showData[1], showData[2], showData[3], showData[4]);

                TvSearch.scrollIntoView({ behavior: "smooth", inline: "start" });

            })
        }

    }
}




const appendData = (stitle, sgenre, srating, srunning) => {
    let title = document.createElement('span')
    let genre = document.createElement('span')
    let rating = document.createElement('span')
    let running = document.createElement('span')
    title.classList.add('pTitle');
    genre.classList.add('pGenre');
    rating.classList.add('pRating');
    running.classList.add('pRunning');
    // title.innerHTML = stitle;
    // genre.innerHTML = sgenre;
    rating.innerHTML = srating;
    running.innerHTML = srunning;
    // adding space to categs

    pBodyTitle.innerHTML = `Title: ${title.innerHTML = stitle}`;
    pBodyGenre.innerHTML = `Genre: ${genre.innerHTML = sgenre}`;
    pBodyRating.innerHTML = `Average Rating: ${rating.innerHTML = srating}`;
    pBodyRunning.innerHTML = `Status: ${running.innerHTML = srunning}`;
    // title.classList.add('addedShowData', 'collapse', 'collapse-horizontal');


}

const deleteData = () => {
    const collapseDiv = document.querySelector('#collapseWidthExample');
    const DeleteTitle = document.querySelector('.pTitle');
    const DeleteGenre = document.querySelector('.pGenre');
    const DeleteRating = document.querySelector('.pRating');
    const DeleteRunning = document.querySelector('.pRunning');
    collapseDiv.classList.remove('show');
    DeleteTitle?.remove();
    DeleteGenre?.remove();
    DeleteRating?.remove();
    DeleteRunning?.remove();
}


