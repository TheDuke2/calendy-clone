document.addEventListener("DOMContentLoaded", () => {
  const daysContainer = document.querySelector(".days");
  const monthDisplay = document.querySelector(".month p");
  const prevButton = document.querySelector(".nav-button:first-child");
  const nextButton = document.querySelector(".nav-button:last-child");
  const timeSlotsContainer = document.querySelector(".time-slots");
  const timeSlotsSection = document.querySelector(".time-slots-container");
  const timeSlotsTitle = document.querySelector(".time-slots-container h3");

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  // Utility function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Utility function to get the starting weekday of the month
  const getStartDay = (year, month) => {
    return (new Date(year, month, 1).getDay() + 6) % 7; // Shift so Monday is 0 and Sunday is 6
  };

  // Update the calendar
  const updateCalendar = (month, year) => {
    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getStartDay(year, month);

    // Update month and year display
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    monthDisplay.textContent = `${monthNames[month]} ${year}`;

    // Clear previous days
    daysContainer.innerHTML = "";

    // Add empty slots for days before the first of the month
    for (let i = 0; i < startDay; i++) {
      const emptySlot = document.createElement("div");
      emptySlot.classList.add("empty");
      daysContainer.appendChild(emptySlot);
    }

    // Generate days for the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = (date.getDay() + 6) % 7; // Adjust the day of the week (shifted)

      const dayButton = document.createElement("button");
      dayButton.textContent = day;

      // Disable Saturday (6) and Sunday (0) based on the new setup
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        dayButton.disabled = true; // Prevent interaction on weekends (now Friday and Saturday)
      } else {
        dayButton.classList.add("available");
        dayButton.addEventListener("click", () =>
          selectDate(dayButton, year, month, day)
        );
      }

      daysContainer.appendChild(dayButton);
    }
  };

  const generateTimeSlots = () => {
    timeSlotsContainer.innerHTML = "";

    let startTime = 9 * 60; // Start time in minutes (9:00 AM)
    let endTime = 16 * 60 + 30; // End time in minutes (4:30 PM)
    while (startTime <= endTime) {
      const hour = Math.floor(startTime / 60);
      const minutes = startTime % 60;
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour;
      const time = `${displayHour}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;

      const timeButton = document.createElement("button");
      timeButton.textContent = time;
      timeButton.addEventListener("click", () => alert(`You selected ${time}`));
      timeSlotsContainer.appendChild(timeButton);

      startTime += 30;
    }
  };

  const selectDate = (button, year, month, day) => {
    document.querySelectorAll(".days button").forEach((btn) => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const displayDate = `${monthNames[month]} ${day}, ${year}`;
    timeSlotsTitle.textContent = `${displayDate}`;
    timeSlotsSection.style.display = "block";
    generateTimeSlots();
  };

  prevButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateCalendar(currentMonth, currentYear);
  });

  nextButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateCalendar(currentMonth, currentYear);
  });

  updateCalendar(currentMonth, currentYear);
});
