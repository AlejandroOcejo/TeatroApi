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
        if (!selectedSeats.includes(seatIndex)) {
            selectedSeats.push(seatIndex); 
        } else {
            selectedSeats = selectedSeats.filter(seat => seat !== seatIndex);
        }
        updateSeatColors([]); 
    }

    for (var i = 0; i < seats.length; i++) {
        seats[i].addEventListener("click", handleSeatClick);
    }

    document.getElementById("reserveButton").addEventListener("click", function () {
        if (selectedSeats.length === 0) {
            alert("Select at least one seat before reserving.");
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
                    if (!data[seatIndex].isReserved) {
                        data[seatIndex].isReserved = true;
                        data[seatIndex].seatOwner = user;
                    }
                });

                alert("Asientos reservados!!!");
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