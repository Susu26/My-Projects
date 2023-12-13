let images1 = ['../pics/Player/Halloween1/Idle/0.png', '../pics/Player/Halloween1/Idle/1.png', '../pics/Player/Halloween1/Idle/2.png', '../pics/Player/Halloween1/Idle/3.png', '../pics/Player/Halloween1/Idle/4.png', '../pics/Player/Halloween1/Idle/5.png', '../pics/Player/Halloween1/Idle/6.png', '../pics/Player/Halloween1/Idle/7.png', '../pics/Player/Halloween1/Idle/8.png', '../pics/Player/Halloween1/Idle/9.png', '../pics/Player/Halloween1/Idle/10.png', '../pics/Player/Halloween1/Idle/11.png', '../pics/Player/Halloween1/Idle/12.png', '../pics/Player/Halloween1/Idle/13.png', '../pics/Player/Halloween1/Idle/14.png', '../pics/Player/Halloween1/Idle/15.png', '../pics/Player/Halloween1/Idle/16.png', '../pics/Player/Halloween1/Idle/17.png',

];

let images2 = ['../pics/Player/Halloween2/Idle/0.png', '../pics/Player/Halloween2/Idle/1.png', '../pics/Player/Halloween2/Idle/2.png', '../pics/Player/Halloween2/Idle/3.png', '../pics/Player/Halloween2/Idle/4.png', '../pics/Player/Halloween2/Idle/5.png', '../pics/Player/Halloween2/Idle/6.png', '../pics/Player/Halloween2/Idle/7.png', '../pics/Player/Halloween2/Idle/8.png', '../pics/Player/Halloween2/Idle/9.png', '../pics/Player/Halloween2/Idle/10.png', '../pics/Player/Halloween2/Idle/11.png', '../pics/Player/Halloween2/Idle/12.png', '../pics/Player/Halloween2/Idle/13.png', '../pics/Player/Halloween2/Idle/14.png', '../pics/Player/Halloween2/Idle/15.png', '../pics/Player/Halloween2/Idle/16.png', '../pics/Player/Halloween2/Idle/17.png',

];

let images3 = ['../pics/Player/Halloween3/Idle/0.png', '../pics/Player/Halloween3/Idle/1.png', '../pics/Player/Halloween3/Idle/2.png', '../pics/Player/Halloween3/Idle/3.png', '../pics/Player/Halloween3/Idle/4.png', '../pics/Player/Halloween3/Idle/5.png', '../pics/Player/Halloween3/Idle/6.png', '../pics/Player/Halloween3/Idle/7.png', '../pics/Player/Halloween3/Idle/8.png', '../pics/Player/Halloween3/Idle/9.png', '../pics/Player/Halloween3/Idle/10.png', '../pics/Player/Halloween3/Idle/11.png', '../pics/Player/Halloween3/Idle/12.png', '../pics/Player/Halloween3/Idle/13.png', '../pics/Player/Halloween3/Idle/14.png', '../pics/Player/Halloween3/Idle/15.png', '../pics/Player/Halloween3/Idle/16.png', '../pics/Player/Halloween3/Idle/17.png',

];

let imageIndex = 0;
let imageIndex2 = 0;
let imageIndex3 = 0;


function updateCardInnerImage() {
	document.querySelector('.card-inner1').style.backgroundImage = `url(${images1[imageIndex]})`;
	imageIndex = (imageIndex + 1) % images1.length;


	document.querySelector('.card-inner2').style.backgroundImage = `url(${images2[imageIndex2]})`;
	imageIndex2 = (imageIndex2 + 1) % images2.length;

	document.querySelector('.card-inner3').style.backgroundImage = `url(${images3[imageIndex3]})`;
	imageIndex3 = (imageIndex3 + 1) % images3.length;

	setTimeout(updateCardInnerImage, 44);
	clearTimeout();
}

updateCardInnerImage();




function toggleGlow(id) {

	let cards = document.querySelectorAll('.card')
	let selectedCard1 = cards[id - 1];
	sessionStorage.setItem('playermodel', id);

	for (let i = 0; i < cards.length; i++) {
		if (cards[i] === selectedCard1) {
			cards[i].classList.add("glow")
		} else {
			cards[i].classList.remove("glow")
		}
	}
}

function toggleOtherGlow(layer, id) {
	console.log('hallo2')

	let cards = document.querySelectorAll('.mapcard')
	let selectedCard = cards[id - 1];
	sessionStorage.setItem('layer', layer);
	sessionStorage.setItem('id', id);

	for (let i = 0; i < cards.length; i++) {
		if (cards[i] === selectedCard) {
			cards[i].classList.add("otherGlow")
		} else {
			cards[i].classList.remove("otherGlow")
		}
	}
}



