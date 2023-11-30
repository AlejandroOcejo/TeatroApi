document.addEventListener("DOMContentLoaded", function () {
    var seats = document.getElementsByClassName("seat");

    function handleSeatClick(event) {
        var seatIndex = Array.from(seats).indexOf(event.currentTarget);
        fetch('/reservedSeats')
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
                        body: JSON.stringify(data),
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
                    alert("El asiento ya esta reservado");
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