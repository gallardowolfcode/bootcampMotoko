import { bootcampMotoko_backend } from "../../declarations/bootcampMotoko_backend";
import { bootcampMotoko_frontend } from "../../declarations/bootcampMotoko_frontend";
const bootcampMotokoForm = document.getElementById("radioForm");
const bootcampMotokoForm2 = document.getElementById("radioForm2");
const resultsDiv = document.getElementById('results');
const resultsDiv2 = document.getElementById('results2');
const resetButton = document.getElementById('reset');


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

    //re-render the results once the votes are reset in the backend
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

// First we have to create and AuthClient.
const authClient = await AuthClient.create();

// Call authClient.login(...) to login with Internet Identity. This will open a new tab
// with the login prompt. The code has to wait for the login process to complete.
// We can either use the callback functions directly or wrap in a promise.
await new Promise((resolve, reject) => {
  authClient.login({
    onSuccess: resolve,
    onError: reject,
  });
});

// Get the identity from the auth client:
const identity = authClient.getIdentity();
// Using the identity obtained from the auth client, we can create an agent to interact with the IC.
const agent = new HttpAgent({ identity });
// Using the interface description of our webapp, we create an Actor that we use to call the service methods.
const webapp = Actor.createActor(bootcampMotoko_frontend, {
  agent,
  canisterId: bd3sg-teaaa-aaaaa-qaaba-cai,
});
// Call whoami which returns the principal (user id) of the current user.
const principal = await webapp.whoami();
