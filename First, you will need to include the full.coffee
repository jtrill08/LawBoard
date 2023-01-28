First, you will need to include the fullCalendar library in your HTML file. You can do this by adding the following line of code in the head of your HTML file:

Copy code
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css" />
Then, you will need to include the jQuery and fullCalendar JavaScript files at the bottom of your HTML file, before your own JavaScript file:

Copy code
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js"></script>
Then, you can initialize the fullCalendar on the element you want to use as calendar and bind events to it.

Copy code
$(document).ready(function() {
  $('#calendar').fullCalendar({
    events: [
      {
        title: 'Event1',
        start: '2022-01-01'
      },
      {
        title: 'Event2',
        start: '2022-01-05',
        end: '2022-01-07'
      }
    ]
  });
});
In your code, you will need to modify your fetch function to include the data in the events property of the fullCalendar.
fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        // Get the template
        console.log(data);
        const template = document.querySelector("#job-listing-template");
        const jobsContainer = document.querySelector("#upcoming");
        var events = []
        // Loop through the data starting from the second row (index 1)
        for (let i = 1; i < data.values.length; i++) {
            const job = data.values[i];
            // Clone the template
            const jobNode = template.content.cloneNode(true);

            // Fill in the template
            jobNode.querySelector(".job-company").innerText = job[0];
            jobNode.querySelector(".job-description").innerText = job[1];
            jobNode.querySelector(".job-deadline").innerText = job[2];
            jobNode.querySelector(".job-apply a").href = job[3];

            // Append the job to the container
            jobsContainer.appendChild(jobNode);

            // Add the job to the events array
            events.push({
              title: job[0],
              start: job[2]
            });
        }
        $('#calendar').fullCalendar({
          events: events
        });