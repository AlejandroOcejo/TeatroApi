
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function fetchImages() {
    return fetch("http://localhost:3000/obrasJSON")
        .then(response => response.json())
        .then(data => data.map(imgRoute => imgRoute.imgRoute))
        .catch(error => {
            console.error('Error fetching images:', error);
            throw error;
        });
}

function genObras() {
    fetchImages()
        .then(imgPathArray => {
            var obrasDiv = document.getElementById('obrasDiv');
            obrasDiv.innerHTML = '';
            var usedNumbers = [];
            for (var i = 0; i < 3; i++) {
                var imagen = document.createElement('img');
                let imgRandomSrc = getRandomImage(imgPathArray, usedNumbers);
                usedNumbers.push(imgRandomSrc);
                imagen.src = imgRandomSrc;

                imagen.classList.add('img-responsive');
                obrasDiv.appendChild(imagen);
            }
        })
        .catch(error => {
            console.error('Error generating obras:', error);
        });
}

function getRandomImage(imgPathArray, usedNumbers) {
    let imgRandomSrc = imgPathArray[Math.floor(Math.random() * imgPathArray.length)];
    while (usedNumbers.includes(imgRandomSrc)) {
        imgRandomSrc = imgPathArray[Math.floor(Math.random() * imgPathArray.length)];
    }
    return imgRandomSrc;
}


window.onload = genObras;