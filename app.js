'use strict';
let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let rightImgEl = document.getElementById('rightImg');
let midImgEl = document.getElementById('midImg');
let ulEl = document.getElementById('results');
let goats = [];
let attempts = 1;
let maxAttempts = 25;

function GoatImage(goatName) {
    this.gName = goatName.split('.')[0];
    this.img = 'images/' + goatName;
    this.votes = 0;
    this.views = 0;
    goats.push(this);
}

let prodImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg',
'sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg' , 'bag.jpg', 'banana.jpg', 'bathroom.jpg'
,'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',];

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
    while (leftIndex === rightIndex || rightIndex === midIndex || leftIndex === midIndex ) {
        leftIndex = randomIndex();
        midIndex=randomIndex();
        rightIndex=randomIndex();
    }

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
        let ulEl = document.getElementById('results');
        for (let i = 0; i < goats.length; i++) {
            let liEl = document.createElement('li');
            liEl.textContent = `${goats[i].gName} has ${goats[i].votes} votes and ${goats[i].views} views .`
            ulEl.appendChild(liEl);
        }
        leftImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);
        midImgEl.removeEventListener('click', handelClicks);

    }
    attempts++;
}
