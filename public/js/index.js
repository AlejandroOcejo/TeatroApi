
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function fetchImages() {
    return fetch("/obrasJSON")
        .then(response => response.json())
        .then(data => data.map(obra => ({
            imgRoute: obra.imgRoute,
            nameForUrl: obra.nameForUrl
        })))
        .catch(error => {
            console.error('Error fetching images:', error);
            throw error;
        });
}


function genObras() {
    fetchImages()
        .then(obrasArray => {
            var obrasDiv = document.getElementById('obrasDiv');
            obrasDiv.innerHTML = '';
            var usedNumbers = [];
            for (var i = 0; i < 3; i++) {
                var imagen = document.createElement('img');
                let obra = getRandomObra(obrasArray, usedNumbers);
                usedNumbers.push(obra.imgRoute);
                imagen.src = obra.imgRoute;
                imagen.classList.add('img-responsive');

                imagen.addEventListener('click', () => {
                    let clickedImg = obra.nameForUrl;
                    window.location.href = `/obra/${clickedImg}`;
                    console.log(clickedImg);
                });

                obrasDiv.appendChild(imagen);
            }
        })
        .catch(error => {
            console.error('Error generating obras:', error);
        });
}

function getRandomObra(obrasArray, usedNumbers) {
    let obra = obrasArray[Math.floor(Math.random() * obrasArray.length)];
    while (usedNumbers.includes(obra.imgRoute)) {
        obra = obrasArray[Math.floor(Math.random() * obrasArray.length)];
    }
    return obra;
}


function getRandomImage(imgPathArray, usedNumbers) {
    let imgRandomSrc = imgPathArray[Math.floor(Math.random() * imgPathArray.length)];
    while (usedNumbers.includes(imgRandomSrc)) {
        imgRandomSrc = imgPathArray[Math.floor(Math.random() * imgPathArray.length)];
    }
    return imgRandomSrc;
}
function load() {
    if (!localStorage.getItem("user")) {
        document.getElementById('logoutLink').style.display = 'none';
    }

    if (localStorage.getItem("user")) {
        document.getElementById('loginLink').style.display = 'none';
    }
}


window.addEventListener('load', genObras);
window.addEventListener('load', load);