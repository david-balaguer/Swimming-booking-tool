document.getElementById("bookingForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const confirmation = document.getElementById("confirmation");
    confirmation.textContent = `✅ Thanks, ${name}! Your lesson is requested for ${date} at ${time}. you will receive an email at ${email} confirming the details.`;

    this.reset();

});