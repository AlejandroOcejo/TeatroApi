document.addEventListener("DOMContentLoaded", function () {
    var seats = document.getElementsByClassName("seat");
    let obra = localStorage.getItem('obra');
    let user = localStorage.getItem('user');
    let selectedSeats = [];

    function updateSeatColors(data) {
        for (var i = 0; i < seats.length; i++) {
            if (data && data[i] && data[i].isReserved) {
                seats[i].style.backgroundColor = 'red';
            } else if (selectedSeats.includes(i)) {
                seats[i].style.backgroundColor = 'blue';
            } else {
                seats[i].style.backgroundColor = 'green';
            }
        }
    }

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
                if (data && data[seatIndex] && data[seatIndex].isReserved) {
                    alert("Este asiento ya está reservado. Seleccione otro asiento.");
                    return;
                }
                if (!selectedSeats.includes(seatIndex)) {
                    selectedSeats.push(seatIndex);
                } else {
                    selectedSeats = selectedSeats.filter(seat => seat !== seatIndex);
                }
                updateSeatColors(data);
                console.log("Asientos seleccionados:", selectedSeats);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    for (var i = 0; i < seats.length; i++) {
        seats[i].addEventListener("click", handleSeatClick);
    }

    fetch(`/reservedSeats?obra=${obra}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! ${response}`);
            }
            return response.json();
        })
        .then(data => {
            updateSeatColors(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    document.getElementById("reserveButton").addEventListener("click", function () {
        if (selectedSeats.length === 0) {
            alert("Seleccione al menos un asiento antes de reservar.");
            return;
        }

        fetch(`/reservedSeats?obra=${obra}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! ${response}`);
                }
                return response.json();
            })
            .then(data => {
                selectedSeats.forEach(seatIndex => {
                    if (data && data[seatIndex] && !data[seatIndex].isReserved) {
                        data[seatIndex].isReserved = true;
                        data[seatIndex].seatOwner = user;
                    }
                });

                alert("¡Asientos reservados!");
                updateSeatColors(data);
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
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});