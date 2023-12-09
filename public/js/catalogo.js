
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function load() {
    if (!localStorage.getItem("user")) {
        document.getElementById('logoutLink').style.display = 'none';
    }

    if (localStorage.getItem("user")) {
        document.getElementById('loginLink').style.display = 'none';
    }
}
let obrasArray = [];

function fetchObras() {
    return fetch("/obrasJSON")
        .then(response => response.json())
        .then(data => {
            return data.map(obraInfo => ({
                imgRoute: obraInfo.imgRoute,
                nameForURL: obraInfo.nameForUrl,
                genre: obraInfo.genre
            }));
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}

fetchObras().then(obraData => {
    const groupedObras = groupObrasByGenre(obraData);
    displayGroupedObras(groupedObras);
});

function groupObrasByGenre(obraData) {
    const groupedObras = {};

    obraData.forEach(obra => {
        const { genre } = obra;
        if (!groupedObras[genre]) {
            groupedObras[genre] = [];
        }
        groupedObras[genre].push(obra);
    });

    return groupedObras;
}

function displayGroupedObras(groupedObras) {
    const outputElement = document.getElementById("output");
    outputElement.innerHTML = '';

    const allObrasDiv = document.createElement('div');
    allObrasDiv.classList.add('all-obras');

    for (const genre in groupedObras) {
        const genreObras = groupedObras[genre];

        const genreDiv = document.createElement('div');
        genreDiv.classList.add('genre-container');
        genreDiv.innerHTML = `<h2 class="genreTittle">${genre}</h2>`;

        const genreObrasDiv = document.createElement('div');
        genreObrasDiv.classList.add('genre-obras');

        genreObras.forEach(obra => {
            const obraDiv = document.createElement('div');
            obraDiv.classList.add('obraimgDiv');
            obraDiv.innerHTML = `
                <img style="
                border: 1;
                border: #7E1034 3px solid;"
             src="${obra.imgRoute}" alt="${obra.nameForURL}">
            `;
            genreObrasDiv.appendChild(obraDiv);
            obraDiv.querySelector('img').addEventListener('click', () => {
                let clickedImg = obra.nameForURL
                window.location.href = `/obra/${clickedImg}`; console.log(clickedImg);
            });
        });


        genreDiv.appendChild(genreObrasDiv);
        allObrasDiv.appendChild(genreDiv);
    }

    outputElement.appendChild(allObrasDiv);
}

window.addEventListener('load', load);