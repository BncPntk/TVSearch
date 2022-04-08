





// Elements
const form = document.querySelector('#searchForm');
const container = document.querySelector('.container');
const row = document.querySelector('.row-for-images');
// const searchBtn = document.querySelector('#searchBtn');
// End of Elements
let dataArr = [];
let dataObj = {
    id: '',
    name: '',
    genre: '',
    rating: '',
    status: ''
};

let dataStr = '';
let showInfo = '';
let showName = '';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = form.elements.searchField.value;
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${inputValue}`)

    row.innerHTML = '';
    displayResults(res.data);
    form.elements.searchField.value = '';
    dataArr = [];
    getData(res);
    showDetails();
})

const getData = function (res) {

    for (let i = 0; i < res.data.length; i++) {
        showName = (res.data[i].show.name);
        idStr = `${res.data[i].show.id}`;
        nameStr = `${res.data[i].show.name}`;
        genreStr = `${res.data[i].show.genres}`;
        ratingStr = `${typeof res.data[i].show.rating.average === 'number' ? res.data[i].show.rating.average : 'No ratings available'}`;
        statusStr = `${res.data[i].show.status === 'Running' ? 'Yes' : 'No'}`;
        dataStr = `${idStr} ${nameStr} ${genreStr} ${ratingStr} ${statusStr}`;
        // console.log(dataStr);

        // dataObj = dataStr;
        // pusg show datas to an array
        dataArr.push(dataStr)

        // console.log(dataArr);
    }
}




const displayResults = (show) => {
    for (let result of show) {
        if (result.show.image) {
            let img = document.createElement('img');
            img.src = result.show.image.medium;
            // console.log(result.show);
            // showInfo = (`Name of the show: ${result.show.name} Genre: ${result.show.genres} Rating: ${result.show.rating.average} Still running? ${result.show.status === 'Running' ? 'Yes' : 'No'} `);
            img.classList.add('imageTile', 'col-6', 'col-md-4', 'col-lg-3', 'my-3');
            row.append(img)
            // console.log(result.show);


        }

    }
}

const showDetails = function () {
    if (document.getElementsByClassName('imageTile')) {

        const imageTile = document.querySelectorAll('img');

        for (let i = 0; i < imageTile.length; i++) {
            imageTile[i].addEventListener('click', () => {
                console.log(dataArr[i]);
            })
        }
    }
}