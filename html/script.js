const config = {
  backendUrl: "http://localhost:8000/", // Default backend URL
};
const port = 8000;

// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");

  if (names.length !== 2) {
    errorElement.textContent = "Please enter both your Firstname and Lastname.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^\d{10}$/;
  const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test(studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)) {
    errorElement.textContent =
      "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateStudentID();
  validateEmail();
}

function validateWorkTitle() {
  const workTitleInput = document.getElementById("workTitle");
  const errorElement = document.getElementById("workTitleError");

  if (workTitleInput.value.length > 20) {
    errorElement.textContent = "Work/Activity Title should not exceed 20 characters.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}
document.getElementById("workTitle").addEventListener("input", validateWorkTitle);


function validateDescription() {
  const descriptionInput = document.getElementById("description");
  const errorElement = document.getElementById("descriptionError");

  if (descriptionInput.value.length < 10) {
    errorElement.textContent = "Description should be at least 10 characters.";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}


// Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});
function validateDescription() {
  const descriptionInput = document.getElementById("description");
  const errorElement = document.getElementById("descriptionError");

  if (descriptionInput.value.length < 10) {
    errorElement.textContent = "Description should be at least 10 characters.";
    return false;
  } else {
    errorElement.textContent = "";
  }
  return true;
}
async function submitForm(event) {
  event.preventDefault();

  if (!validateName() || !validateStudentID() || !validateEmail() || !validateDescription()) {
    alert("Please fill out all required fields correctly.");
    return;
  }


  displaySubmittedData();
}

function displaySubmittedData() {
  const formData = document.getElementById("myForm");

  const submittedData = {
    "Fullname": formData.elements.fullname.value,
    "Student ID": formData.elements.studentID.value,
    "University Email": formData.elements.email.value,
    "Work/Activity Title": formData.elements.workTitle.value,
    "Type of Work/Activity": formData.elements.activityType.value,
    "Academic Year": formData.elements.academicYear.value,
    "Semester": formData.elements.semester.value,
    "Start Date/Time": formData.elements.startDate.value,
    "End Date/Time": formData.elements.endDate.value,
    "Location": formData.elements.location.value,
    "Description": formData.elements.description.value,
  };

  let displayHTML = "<div class='submitted-data-container'><h2>Submitted Data</h2><ul>";
  for (const [key, value] of Object.entries(submittedData)) {
    displayHTML += `<li><strong>${key}:</strong> ${value}</li>`;
  }
  displayHTML += "</ul></div>";

  const displayDiv = document.getElementById("displayData");
  displayDiv.innerHTML = displayHTML;
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document
  .getElementById("studentID")
  .addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);

function clearForm() {
  document.getElementById("myForm").reset();
}
