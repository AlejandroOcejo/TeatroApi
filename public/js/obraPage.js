function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function navigateToReserve() {
    window.location.href = "/reserve";
}



document.addEventListener('DOMContentLoaded', function () {
    var obraName = document.getElementById('obraName').innerText;
    console.log(obraName);
    fetch("/obrasJSON")
        .then(response => response.json())
        .then(data => {
            const obraData = data.find(nameUrl => nameUrl.name === obraName);

            if (obraData) {
                localStorage.setItem('obra', obraData.nameForUrl);
            } else {
                console.error('obra not found:', obraName);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
});