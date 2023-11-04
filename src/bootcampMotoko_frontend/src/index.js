import { bootcampMotoko_backend } from "../../declarations/bootcampMotoko_backend";
const bootcampMotokoForm = document.getElementById("radioForm");
const bootcampMotokoForm2 = document.getElementById("radioForm2");
const resultsDiv = document.getElementById('results');
const resultsDiv2 = document.getElementById('results2');
const resetButton = document.getElementById('reset');


/* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 380,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


/* ---- stats.js config ---- */

var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);


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

