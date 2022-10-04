const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

// Getting New Date, Current Year & Month
let date = new Date(),
    today = date.getDate(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// Storing Full Name of All Months In Array
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const renderCalendar = () => {

    // Getting First Day Of Month
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),

        // Getting Last Date Of Month
        lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),

        // Getting Last Day Of Month
        lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),

        // Getting Last Date Of Previous Month
        lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

    let liTag = "";

    // Creating li for previous month last Days
    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    // Creating li for all days of current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
        // adding active class to li if the current day, month and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear ? "active" : "";

        liTag += `<li class="${isToday}">${i}</li>`;
    }

    // Creating li of next month first days
    for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    // Passing CurrentMonth & Current Year as Current Date Text
    currentDate.innerText = `${months[currMonth]} - ${today},  ${currYear}`;

    daysTag.innerHTML = liTag;
}

renderCalendar();

// Getting Previous & Next Icons
prevNextIcon.forEach(icon => {

    // Adding click events on both icons
    icon.addEventListener("click", () => {

        // Condition : if clicked icon is previous icon then decrease current month by 1 else increase current month by 1...
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            // Creating a new date of current year & month then pass it as date value
            date = new Date(currYear, currMonth);

            // Updating Current Year with new date year
            currYear = date.getFullYear();

            // Updating Current Month with new date month
            currMonth = date.getMonth();
        } else {
            date = new Date(); // Pass the current date as date value
        }

        // Calling renderCalendar function
        renderCalendar();
    });
});