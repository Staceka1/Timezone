// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    // Use the id in the containing time-block as a key to save the user input in local storage.
    // 'this' references the clicked button, and we use DOM traversal to get the parent time-block's id.
    const timeBlockId = $(this).parent().attr("id");
    const userDescription = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userDescription);
  });

  // Add code to apply the past, present, or future class to each time block.
  function updateHourClasses() {
    const currentHour = dayjs().hour();

    $(".time-block").each(function () {
      const hourBlock = parseInt($(this).attr("id").split("-")[1]);

      if (hourBlock < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (hourBlock === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Call the function to apply initial classes.
  updateHourClasses();

  // Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  $(".time-block").each(function () {
    const timeBlockId = $(this).attr("id");
    const storedDescription = localStorage.getItem(timeBlockId);
    if (storedDescription) {
      $(this).find(".description").val(storedDescription);
    }
  });

  // Add code to display the current date in the header of the page.
  const currentDate = dayjs().format("MMMM DD, YYYY");
  $("#currentDay").text(currentDate);

  // Update time block classes every minute to account for the current hour changing.
  setInterval(updateHourClasses, 60000);
});
