import { poll_backend } from "../../declarations/poll_backend";
const pollForm = document.getElementById("radioForm");
const pollForm2 = document.getElementById("radioForm2");
const resultsDiv = document.getElementById('results');
const resultsDiv2 = document.getElementById('results2');
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

document.addEventListener('DOMContentLoaded', async (e) => {
  e.preventDefault();

  const question = await poll_backend.getQuestion();
  document.getElementById("question").innerText = question;

  const voteCounts = await poll_backend.getVotes();
  updateLocalVoteCounts(voteCounts);
  displayResults();
  displayResults2();
  return false;
}, false);

document.addEventListener('DOMContentLoaded', async (e) => {
  e.preventDefault();

  const question2 = await poll_backend.getQuestion2();
  document.getElementById("question2").innerText = question2;
  
  const vote2Counts = await poll_backend.getVotes2();
  updateLocalVote2Counts(vote2Counts);
  displayResults();
  displayResults2();
  return false;
}, false);


pollForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const formData = new FormData(pollForm);
  const checkedValue = formData.get("option");

  const updatedVoteCounts = await poll_backend.vote(checkedValue);
  console.log("Returning from await...")
  console.log(updatedVoteCounts);
  updateLocalVoteCounts(updatedVoteCounts);
  displayResults();
  displayResults2();
  return false;
}, false);

pollForm2.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  const formData2 = new FormData(pollForm2);
  const checkedValue2 = formData2.get("option2");

  const updatedVote2Counts = await poll_backend.vote2(checkedValue2);
  console.log("Returning from await...")
  console.log(updatedVote2Counts);
  updateLocalVote2Counts(updatedVote2Counts);
  displayResults2();
  console.log(updatedVote2Counts);
  return false;
}, false);

resetButton.addEventListener('click', async (e) => {
    e.preventDefault();
    
    //Reset the options in the backend
    await poll_backend.resetVotes();
    await poll_backend.resetVotes2();
    const voteCounts = await poll_backend.getVotes();
    updateLocalVoteCounts(voteCounts);
    const voteCounts2 = await poll_backend.getVotes2();
    updateLocalVote2Counts(voteCounts2);

    //re-render the results once the votes are reset in the backend
    displayResults();
    displayResults2();
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
  let resultHTML2 = '<ul>';
  for (let key in pollResults2) {
      resultHTML2 += '<li><strong>' + key + '</strong>: ' + pollResults2[key] + '</li>';
  }
  resultHTML2 += '</ul>';
  resultsDiv2.innerHTML = resultHTML2;
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

function updateLocalVote2Counts(arrayOfVote2Arrays){

  for (let vote2Array of arrayOfVote2Arrays) {
    let vote2Option = vote2Array[0];
    let vote2Count = vote2Array[1];
    pollResults2[vote2Option] = vote2Count;
  }

};