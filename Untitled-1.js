// tabs //
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

// Fetch data from Google Sheet

// Replace YOUR_API_KEY with your actual API key
const API_KEY = "AIzaSyDP84vegl-duWUlZbczls3BzV0bSzcVSYE";

// Replace SPREADSHEET_ID with the actual ID of the sheet
const SPREADSHEET_ID = "112NNivJwNKemao_GE8oqNnTe3bTH93pnIuAZmCKoGPg";





fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        // Get the template
        console.log(data);
        const template = document.querySelector("#job-listing-template");
        const jobsContainer = document.querySelector("#upcoming");


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
        }
    })
    .catch(error => console.log(error));

//search//
function searchJobs() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();
    let jobListings = document.getElementsByClassName("job-listing");
    for (let i = 0; i < jobListings.length; i++) {
        let jobCompany = jobListings[i].getElementsByClassName("job-company")[0].innerHTML.toLowerCase();
        let jobDeadline = jobListings[i].getElementsByClassName("job-deadline")[0].innerHTML.toLowerCase();
        let jobDescription = jobListings[i].getElementsByClassName("job-description")[0].innerHTML.toLowerCase();
        if (jobCompany.includes(searchValue) || jobDeadline.includes(searchValue) || jobDescription.includes(searchValue)) {
            jobListings[i].style.display = "block";
        } else {
            jobListings[i].style.display = "none";
        }
    }
}

//notifications//

let notifiedJobs = [];

function notify(jobNode) {
    // Get the job's unique ID
    let jobId = jobNode.id;
    // Check if the job has already been notified
    if (!notifiedJobs.includes(jobId)) {
        // Add the job's ID to the notifiedJobs array
        notifiedJobs.push(jobId);
        // Get the job listing element
        let jobListing = jobNode.parentElement.parentElement;
        // Get the "Notifications" tab content element
        let notificationsTab = document.getElementById("notifications");
        // Append the job listing element to the "Notifications" tab content element
        notificationsTab.appendChild(jobListing);
    }
}
