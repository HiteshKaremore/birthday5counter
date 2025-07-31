let timer = null;

document.getElementById('start').addEventListener('click', function() {
    // Clear any running timer
    if (timer) clearInterval(timer);

    const birthdateInput = document.getElementById('birthdate').value;
    if (!birthdateInput) {
        alert('Please choose your birthdate!');
        return;
    }

    // Parse the input date parts (YYYY-MM-DD)
    const [year, month, day] = birthdateInput.split('-');
    // Create a Date object for birthdate in LOCAL time at midnight
    const birth = new Date(year, month - 1, day);

    // Initial call to start countdown immediately
    runCountdown(birth);
    // Repeat every second
    timer = setInterval(() => runCountdown(birth), 1000);
});

function runCountdown(birth) {
    const now = new Date();

    // Create next birthday date with current year in local time
    let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());

    // If birthday this year already passed or is today but earlier time, use next year
    if (now > nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    // Calculate difference in milliseconds
    const diff = nextBirthday.getTime() - now.getTime();

    if (diff <= 0) {
        // Birthday reached
        updateDisplay(0,0,0,0);
        document.getElementById('message').textContent = "Happy Birthday! 🎉";
        clearInterval(timer);
        return;
    } else {
        document.getElementById('message').textContent = "";
    }

    // Convert diff to time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    updateDisplay(days, hours, minutes, seconds);
}

function updateDisplay(days, hours, minutes, seconds) {
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}