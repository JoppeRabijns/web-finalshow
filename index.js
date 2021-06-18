const notifyForm = document.getElementById("notify-form");
const responseEl = document.getElementById("response-el");

const checkSubmit = (email) => {
    if (sessionStorage.getItem("submit")) {
        //check if there is a value. Only then do a fetch
        if (document.getElementById('notify').value) {
            console.log(document.getElementById('notify').value);
            fetch('http://193.191.183.48:3000/add-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                }) // body data type must match "Content-Type" header
            }).then(
                result => {
                    notifyForm.style.display = 'none';
                    responseEl.style.display = "block";
                },
                error => {
                    document.getElementById('notify').setAttribute('placeholder', 'Error, please try again!');
                    document.getElementById('notify').classList.add('error');
                    document.getElementById('notify').value = '';
                }
            );
        }

    }
};

checkSubmit();

notifyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sessionStorage.setItem("submit", "true");
    const email = document.getElementById('notify').value;
    checkSubmit(email);
});


// REF: https://www.w3schools.com/howto/howto_js_countdown.asp

const countDownDate = new Date("Jun 25, 2021 18:00:00").getTime();
// Update the count down every 1 second
setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - now
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " +
        minutes + "m " + seconds + "s ";
})