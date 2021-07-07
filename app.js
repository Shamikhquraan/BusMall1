'use strict';


let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let rightImgEl = document.getElementById('rightImg');
let midImgEl = document.getElementById('midImg');
let ulEl = document.getElementById('results');
let prouDetails = [];
let views = [];
let votes = [];
let goats = [];
let namesChart =[];
let attempts = 1;
let maxAttempts = 25;


function GoatImage(goatName) {
    this.gName = goatName.split('.')[0];
    this.img = 'images/' + goatName;
    this.votes = 0;
    this.views = 0;
    namesChart.push(goatName.split('.')[0]);
    goats.push(this);
}


let prodImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg',
'sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg' ];

for (let i = 0; i < prodImages.length; i++) {
    new GoatImage(prodImages[i]);
}



function randomIndex() {


    return Math.floor(Math.random() * goats.length);
}
let leftIndex;
let rightIndex;
let midIndex;
function renderRandomImg() {

    leftIndex = randomIndex();
    rightIndex = randomIndex();
    midIndex = randomIndex();
    
    let itrIndx=[];


    while (leftIndex === rightIndex || rightIndex === midIndex || leftIndex ===midIndex || itrIndx.includes(leftIndex) || itrIndx.includes(rightIndex) || itrIndx.includes(midIndex)) {
     
   leftIndex=randomIndex();
    midIndex=randomIndex();
   rightIndex=randomIndex();
    
}


itrIndx.push(leftIndex);
itrIndx.push(rightIndex);
itrIndx.push(midIndex);


    leftImgEl.setAttribute('src', goats[leftIndex].img);
    rightImgEl.setAttribute('src', goats[rightIndex].img);
    midImgEl.setAttribute('src', goats[midIndex].img);
    leftImgEl.setAttribute('alt', goats[leftIndex].gName);
    rightImgEl.setAttribute('alt', goats[rightIndex].gName);
   midImgEl.setAttribute('alt', goats[midIndex].gName);
    leftImgEl.setAttribute('title', goats[leftIndex].gName);
    rightImgEl.setAttribute('title', goats[rightIndex].gName);
    midImgEl.setAttribute('title', goats[midIndex].gName);

    goats[leftIndex].views++;
    goats[rightIndex].views++;
    goats[midIndex].views++;


}


renderRandomImg();



leftImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);
midImgEl.addEventListener('click', handelClicks);


function handelClicks(event) {
    if (attempts <= maxAttempts) {
        let clickedImg = event.target.id;
        if (clickedImg === 'leftImg') {
            goats[leftIndex].votes++;
        }
        else if (clickedImg === 'rightImg') {
            goats[rightIndex].votes++;
        }else if(clickedImg === 'midImg'){
        goats[midIndex].votes++;
        }
        
        renderRandomImg();

    } 
    else {
        renderClicks();

        chartResult();

    }
    attempts++;
    saveTolocalStorage();

}
  



function renderClicks () {
    let ulEl = document.getElementById('results');
    for (let i = 0; i < goats.length; i++) {
        let liEl = document.createElement('li');
        liEl.textContent = `${goats[i].gName} has ${goats[i].votes} votes and ${goats[i].views} views .`
        ulEl.appendChild(liEl);
        views.push(goats[i].views);
        votes.push(goats[i].votes);

    
    }
          
    leftImgEl.removeEventListener('click', handelClicks);
    rightImgEl.removeEventListener('click', handelClicks);
    midImgEl.removeEventListener('click', handelClicks);
    };

    let myform = document.getElementById('myForm');
myForm.addEventListener('submit', addResult);
function addResult(event) {
    event.preventDefault();

    renderClicks();
    chartResult();
 
};


function saveTolocalStorage() {
    let data = JSON.stringify(goats);
    localStorage.setItem('goats', data);
}


function  readFromlocalStorage() {
    let stringObj = localStorage.getItem('goats');
    let normalObj = JSON.parse(stringObj);

    if (normalObj !== null) {
        goats = normalObj;
    }

}
readFromlocalStorage();


function chartResult(){
let ctx = document.getElementById('myChart').getContext('2d');

let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: namesChart,
        datasets: [{
            label: '# of Votes',
            data: votes ,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                
            ],
            borderWidth:3
        } ,  {
            label: '# of vewie',
            data: views ,
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                
                
            ],
            borderWidth:3
        } ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true 
                
            }
        }
    }
});}

