const cardcontainer = document.getElementById('cardcontainer')


function createCards() {


    for (let i = 0; i < 10; i++) {
      let cardHTML = `
      <div class="cardmodel">
      <div class="innerCard" onclick="flipCards(this)">
          <div class="cardFace front">
              <img src="${charactersKarasuno[i].img2}" style="height: 280px;  object-fit: contain;">
          </div>
          <div class="cardFace back">
              <div class="cardContent">
                  <div class="headerCard">
                      <img src="${charactersKarasuno[i].img}" alt="" class="pp" />
                  </div>
                  <div class="mainPart">
                    <h2>${charactersKarasuno[i].nameInKanji}</h2>
                   <h1>${charactersKarasuno[i].nameNormal}</h1>
                    <h3>${charactersKarasuno[i].position}</h3>
                    <img src="./img/trikot.png" width="50%">
                    <h4>${charactersKarasuno[i].number}</h4>
                  </div>
              </div>
          </div>
      </div>
  </div>

      `;


      cardcontainer.innerHTML += cardHTML;


  }
}
createCards();


function flipCards(el) {
  el.classList.toggle("is-flipped");
  el.classList.toggle("theChosenOne")
}

