


/***********Open/Close the info***********/

function toggle() {
        
    let settingPopup = document.getElementById('Popup');
    settingPopup.classList.toggle('active')
}




let Popup2 = document.getElementById('Popup2');

function hide() {
    
    Popup2.classList.toggle('remove');    
    Popup2.classList.remove('active');
}



/*******Generate the Calender divs*******/

var container = document.getElementById('gridContainer');
        
    for (var i = 0; i < firstDesignDivs.length; i++) {
        var div = document.createElement('div');
        div.className = 'item ' + firstDesignDivs[i].size;
        div.style.backgroundColor = firstDesignDivs[i].bgColor;
        div.innerHTML = firstDesignDivs[i].content;

        div.setAttribute('onclick', 'loadDoor(' + firstDesignDivs[i].content + ')');

        container.appendChild(div);
    }


/************FOR BACKGROUND MUSIC******************/

    let x = document.querySelector('audio');

    function play(){
        x.play();
    }



/************GETTING DATA FROM API******************/


let currentOpenDoor = 0;
let code = "";

function loadDoor(id) {
    // Überprüfen, ob das geklickte Türchen in der richtigen Reihenfolge liegt
    if (id <= currentOpenDoor + 1) {
        currentOpenDoor = Math.max(currentOpenDoor, id);

        Popup2.classList.remove('remove');
        Popup2.classList.toggle('active');

        fetch(`./api/doors/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                if (data.code == 200) {
                    if (id == 23) {
                        code = data.result[0].code;
                        document.getElementById('Popup2').innerHTML =
                            `
                            <div class="wrapper">
                                <div class="main_card">
                                    <div class="card_left">
                                        <div class="card_datails">
                                            <h1>${data.result[0].title}</h1>
                                            <div class="card_cat">
                                                <p class="disc">${data.result[0].description}</p>
                                            </div>
                                            <p style="cursor:pointer; color : blue" onclick="kopiereText()">Copy Code to Clipboard</p>
                                        </div>
                                        <button onclick="hide()" id="spanCard">Exit</button>
                                    </div>
                                </div>
                            </div>
                            `
                    } else if (id == 2) {
                        // Behandlung für Türchen mit content 2
                    } else {
                        document.getElementById('Popup2').innerHTML =
                            `<div class="wrapper">
                                <div class="main_card">
                                    <div class="card_left">
                                        <div class="card_datails">
                                            <h1>${data.result[0].title}</h1>
                                            <div class="card_cat">
                                                <p class="year">${data.result[0].year}</p>
                                                <p class="genre">${data.result[0].Genre}</p>
                                                <p class="time">${data.result[0].duration}min</p>
                                            </div>
                                            <p class="disc">${data.result[0].description}</p>
                                        </div>
                                        <button onclick="hide()" id="spanCard">Exit</button>
                                    </div>

                                    <div class="card_right">
                                        <div class="img_container">
                                            <img src="${data.result[0].img}" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                    }
                } else {
                    document.getElementById('Popup2').innerHTML = "<h2>Fehler beim Laden des Buches</h2>";
                }
            })
            .catch((error) => {
                console.log(error);
            })
    } else {

         alert('You have to open the doors in the correct order!');
       
    }
}



function kopiereText() {
  
  var textToCopy = code;

  
  var textarea = document.createElement('textarea');
  textarea.value = textToCopy;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';

 
  document.body.appendChild(textarea);

  
  textarea.select();
  document.execCommand('copy');

  
  document.body.removeChild(textarea);

  
  alert('The text has been copied to the Clipboard: ' + textToCopy);
}


