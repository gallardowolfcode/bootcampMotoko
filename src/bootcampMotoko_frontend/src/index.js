import { bootcampMotoko_backend } from "../../declarations/bootcampMotoko_backend";
const bootcampMotokoForm = document.getElementById("radioForm");
const bootcampMotokoForm2 = document.getElementById("radioForm2");
const resultsDiv = document.getElementById('results');
const resultsDiv2 = document.getElementById('results2');
const resetButton = document.getElementById('reset');


//1. LOCAL DATA
const bootcampMotokoResults = {
    "Ciber Seguridad": 0,
    "Internet de las Cosas": 0,
    "Inteligencia Artificial": 0
};

const bootcampMotokoResults2 = {
  "Alumno": 0,
  "Maestro": 0
};

document.addEventListener('DOMContentLoaded', async (e) => {
  e.preventDefault();

  const question = await bootcampMotoko_backend.getQuestion();
  document.getElementById("question").innerText = question;

  const voteCounts = await bootcampMotoko_backend.getVotes();
  updateLocalVoteCounts(voteCounts);
  displayResults();
  displayResults2();
  return false;
}, false);

document.addEventListener('DOMContentLoaded', async (e) => {
  e.preventDefault();

  const question2 = await bootcampMotoko_backend.getQuestion2();
  document.getElementById("question2").innerText = question2;
  
  const vote2Counts = await bootcampMotoko_backend.getVotes2();
  updateLocalVote2Counts(vote2Counts);
  displayResults();
  displayResults2();
  return false;
}, false);


bootcampMotokoForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const formData = new FormData(bootcampMotokoForm);
  const checkedValue = formData.get("option");

  const updatedVoteCounts = await bootcampMotoko_backend.vote(checkedValue);
  console.log("Returning from await...")
  console.log(updatedVoteCounts);
  updateLocalVoteCounts(updatedVoteCounts);
  displayResults();
  displayResults2();
  return false;
}, false);

bootcampMotokoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData3 = new FormData(bootcampMotokoForm3);
  const innerText = formData.get("text");
  const updatedData =await bootcampMotoko_backend.data(updatedData);
  console.log("Returning from await...")
  console.log(updatedData);
  updatedData(updatedData);
})

bootcampMotokoForm2.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  const formData2 = new FormData(bootcampMotokoForm2);
  const checkedValue2 = formData2.get("option2");

  const updatedVote2Counts = await bootcampMotoko_backend.vote2(checkedValue2);
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
    await bootcampMotoko_backend.resetVotes();
    await bootcampMotoko_backend.resetVotes2();
    const voteCounts = await bootcampMotoko_backend.getVotes();
    updateLocalVoteCounts(voteCounts);
    const voteCounts2 = await bootcampMotoko_backend.getVotes2();
    updateLocalVote2Counts(voteCounts2);

    displayResults();
    displayResults2();
    return false;
}, false);

//3. HELPER FUNCTIONS

function displayResults() {
  let resultHTML = '<ul>';
  for (let key in bootcampMotokoResults) {
      resultHTML += '<li><strong>' + key + '</strong>: ' + bootcampMotokoResults[key] + '</li>';
  }
  resultHTML += '</ul>';
  resultsDiv.innerHTML = resultHTML;
};

function displayResults2() {
  let resultHTML2 = '<ul>';
  for (let key in bootcampMotokoResults2) {
      resultHTML2 += '<li><strong>' + key + '</strong>: ' + bootcampMotokoResults2[key] + '</li>';
  }
  resultHTML2 += '</ul>';
  resultsDiv2.innerHTML = resultHTML2;
};

function updateLocalVoteCounts(arrayOfVoteArrays){
  for (let voteArray of arrayOfVoteArrays) {
    //Example voteArray -> ["Motoko","0"]
    let voteOption = voteArray[0];
    let voteCount = voteArray[1];
    bootcampMotokoResults[voteOption] = voteCount;
  }
};

function updateLocalVote2Counts(arrayOfVote2Arrays){
  for (let vote2Array of arrayOfVote2Arrays) {
    let vote2Option = vote2Array[0];
    let vote2Count = vote2Array[1];
    bootcampMotokoResults2[vote2Option] = vote2Count;
  }
};