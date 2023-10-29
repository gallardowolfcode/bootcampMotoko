import { poll_backend } from "../../declarations/poll_backend";
const pollForm = document.getElementById("radioForm");
const pollForm2 = document.getElementById("radioForm2");
const resultsDiv = document.getElementById('results');
const resetButton = document.getElementById('reset');


//1. LOCAL DATA
const pollResults = {
    "Ciber Seguridad": 0,
    "Internet de las Cosas": 0,
    "Inteligencia Artificial": 0
};

const pollResults2 = {
  "Alumno": 0,
  "Maestro": 0
};

//2. EVENT LISTENERS

//Load the Simple Poll's question from the backend when the app loads
document.addEventListener('DOMContentLoaded', async (e) => {
   //note that this is at beginning of the submit callback, this is deliberate
  //This is so the default behavior is set BEFORE the awaits are called below
  e.preventDefault();
  // Query the question from the backend
  const question = await poll_backend.getQuestion();
  document.getElementById("question").innerText = question;

  //Query the vote counts for each option
  // Example JSON that the frontend will get using the values above
  // [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]
  const voteCounts = await poll_backend.getVotes();
  updateLocalVoteCounts(voteCounts);
  displayResults();
  return false;
}, false);

document.addEventListener('DOMContentLoaded', async (e) => {
  //note that this is at beginning of the submit callback, this is deliberate
 //This is so the default behavior is set BEFORE the awaits are called below
  e.preventDefault();
  // Query the question from the backend
  const question2 = await poll_backend.getQuestion();
  document.getElementById("question2").innerText = question2;

  //Query the vote counts for each option
  // Example JSON that the frontend will get using the values above
  // [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]
  const alumnosCounts = await poll_backend.getAlumnos();
  updateLocalVoteCounts(alumnosCountsCounts);
  displayResults();
  return false;
}, false);

//Event listener that listens for when the form is submitted.
//When the form is submitted with an option, it calls the backend canister
//via "await poll_backend.vote(selectedOption)"
pollForm.addEventListener('submit', async (e) => {
  //note that this is at beginning of the submit callback, this is deliberate
  //This is so the default behavior is set BEFORE the awaits are called below
  e.preventDefault(); 

  const formData = new FormData(pollForm);
  const checkedValue = formData.get("option");

  const updatedVoteCounts = await poll_backend.vote(checkedValue);
  console.log("Returning from await...")
  console.log(updatedVoteCounts);
  updateLocalVoteCounts(updatedVoteCounts);
  displayResults();
  return false;
}, false);

pollForm2.addEventListener('submit', async (e) => {
  //note that this is at beginning of the submit callback, this is deliberate
  //This is so the default behavior is set BEFORE the awaits are called below
  e.preventDefault(); 
  const formData = new FormData(pollForm2);
  const checkedValue = formData.get("option");

  const updatedAlumnoCounts = await poll_backend.alumno(checkedValue);
  console.log("Returning from await...")
  console.log(updatedAlumnoCounts);
  updateLocalAlumnoCounts(updatedAlumnoCounts);
  displayResults();
  return false;
}, false);

resetButton.addEventListener('click', async (e) => {

    e.preventDefault();
    
    //Reset the options in the backend
    await poll_backend.resetVotes();
    const voteCounts = await poll_backend.getVotes();
    updateLocalVoteCounts(voteCounts);

    //re-render the results once the votes are reset in the backend
    displayResults();
    return false;
}, false);

//3. HELPER FUNCTIONS

//Helper vanilla JS function to create the HTML to render the results of the poll
function displayResults() {
  let resultHTML = '<ul>';
  for (let key in pollResults) {
      resultHTML += '<li><strong>' + key + '</strong>: ' + pollResults[key] + '</li>';
  }
  resultHTML += '</ul>';
  resultsDiv.innerHTML = resultHTML;
};

function displayResults2() {
  let resultHTML = '<ul>';
  for (let key in pollResults2) {
      resultHTML += '<li><strong>' + key + '</strong>: ' + pollResults2[key] + '</li>';
  }
  resultHTML += '</ul>';
  resultsDiv.innerHTML = resultHTML;
};

//This helper updates the local JS object that the browser holds
// Example JSON that the frontend will get using the values above
  // [["Motoko","0"],["Python","0"],["Rust","0"],["TypeScript","0"]]
function updateLocalVoteCounts(arrayOfVoteArrays){

  for (let voteArray of arrayOfVoteArrays) {
    //Example voteArray -> ["Motoko","0"]
    let voteOption = voteArray[0];
    let voteCount = voteArray[1];
    pollResults[voteOption] = voteCount;
  }

};

function updateLocalAlumnoCounts(arrayOfAlumnoArrays){

  for (let alumnoArray of arrayOfAlumnoArrays) {
    let alumnoOption = alumnoArray[0];
    let alumnoCount = alumnoArray[1];
    pollResults2[alumnoOption] = alumnoCount;
  }

};