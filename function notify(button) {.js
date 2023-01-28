function notify(button) {
    // check if button is already clicked
    if(button.classList.contains("clicked")) {
        alert("You have already notified for this job!");
        return;
    }

    // get the job id
    const jobId = button.id;

    // get the job container
    const jobContainer = button.closest(".job-listing");

    // get the job company, deadline and description
    const jobCompany = jobContainer.querySelector(".job-company").innerText;
    const jobDeadline = jobContainer.querySelector(".job-deadline").innerText;
    const jobDescription = jobContainer.querySelector(".job-description").innerText;

    // create the notification node
    const notificationNode = document.createElement("div");
    notificationNode.classList.add("notification");
    notificationNode.innerHTML = `<div class="notification-job-company">${jobCompany}</div>
                                  <div class="notification-job-deadline">${jobDeadline}</div>
                                  <div class="notification-job-description">${jobDescription}</div>
                                  <button class="apply-button">Apply</button>
                                  <button class="delete-button">Delete</button>
                                  <button class="done-button">Done</button>`;

    // add the notification to the container
    const notificationsContainer = document.querySelector(".notifications-container");
    notificationsContainer.appendChild(notificationNode);

    // add the clicked class to the button
    button.classList.add("clicked");
    
    // check if done button is clicked
    const doneButton = notificationNode.querySelector(".done-button");
    doneButton.addEventListener("click", function() {
        if (doneButton.classList.contains("done")) {
            alert("You have already marked this job as done!");
            return;
        }
        doneButton.classList.add("done");
        alert("Job marked as done!");
    });
    
    // add a click event listener for the apply button
    const applyButton = notificationNode.querySelector(".apply-button");
    applyButton.addEventListener("click", function() {
        alert("Job applied!");
    });
    
    // add a click event listener for the delete button
    const deleteButton = notificationNode.querySelector(".delete-button");
    deleteButton.addEventListener("click", function() {
        notificationNode.remove();
        alert("Job deleted from notifications!");
    });
}
