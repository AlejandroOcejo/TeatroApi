document.addEventListener("DOMContentLoaded", function () {

    fetch('/initSeats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));


    var seats = document.getElementsByClassName("seat");

    function handleSeatClick(event) {
        var seatIndex = Array.from(seats).indexOf(event.currentTarget);

        alert("Seat clicked! Index: " + seatIndex);
    }

    for (var i = 0; i < seats.length; i++) {
        seats[i].addEventListener("click", handleSeatClick);
    }
});