document.addEventListener("DOMContentLoaded", function () {

    if (localStorage) {

    }
    var seats = document.getElementsByClassName("seat");

    let obra = localStorage.getItem('obra');

    function handleSeatClick(event) {
        var seatIndex = Array.from(seats).indexOf(event.currentTarget);
        fetch(`/reservedSeats?obra=${obra}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! ${response}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data[seatIndex].isReserved) {
                    data[seatIndex].isReserved = true;
                    alert("Asiento reservado!!!");
                    fetch('/updateReservedSeats', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ obra: obra, data: data }),
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! ${response.status}`);
                            }
                        })
                        .catch(error => {
                            console.log('Error updating data on the server:', error);
                        });
                } else {
                    alert("El asiento ya está reservado");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    for (var i = 0; i < seats.length; i++) {
        seats[i].addEventListener("click", handleSeatClick);
    }
});
