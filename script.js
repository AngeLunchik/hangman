const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['картошка', 'кислота', 'стоп', 'кордон', 'літо', 'шипшина', 'тромбоцит', 'лілія', 'сокіл', 'футляр',
 'ховрах', 'непартійність', 'прокус', 'драгун', 'тлумачення', 'шана', 'захід', 'моноліт', 'канва', 'кисіль', 'патрон', 
 'вентилятор', 'ампула', 'автокомбінат', 'колобок', 'тютюн', 'дирижабль', 'локація', 'геральдика', 'вушанка', 'пергамент',
 'багор', 'пил', 'кактус', 'портмоне', 'джгут', 'жандармерія', 'авіаквиток', 'гвинтокрил', 'атлетика', 'бюлетень',
 'авоська', 'лоджія', 'лазарет',  'комікс', 'камера', 'барк', 'кріт', 'монітор', 'гиря', 'корпус', 'талон', 'млинець',
 'дим', 'ворожка', 'пілот',  'документ', 'шинка', 'крематорій', 'вішалка', 'брязкальце', 'майонез', 'плуг', 'слива',
 'рівнина', 'мародер', 'хлор', 'кольє', 'плед', 'арена', 'олово', 'пастор', 'нелюд', 'печиво', 'латаття', 'ландграф',
 'кольчуга', 'пансіонат', 'барахло', 'бляшка', 'готель', 'козак', 'емаль', 'цифра',  'канавка', 'корал', 'мереживо',
 'губернатор', 'дрозд', 'бурундук', 'макет', 'решето', 'геолог', 'торт', 'марихуана', 'долоня', 'каталізатор', 'бліндаж',
 'тренажер', 'каністра', 'жасмин', 'оптика', 'штамп', 'ставок', 'маятник', 'бульвар', 'шишка', 'гречка', 'газон',
 'подушка', 'алое', 'вексель',  'зліпок', 'камаз', 'гойдалка', 'каракатиця', 'блокнот', 'мак', 'вовкодав', 'контрабас',
 'козуб', 'веретено', 'медуза', 'пані', 'арбалет', 'герб', 'заповіт', 'бібліотека', 'храм', 'автовідповідач', 'немовля'];

let selectedWord = words[ Math.floor( Math.random() * words.length )];

let playable = true;

let correctLetters = [];
let wrongLetters = [];

// Show hidden word
function displayWord() {
	wordEl.innerHTML = `
		${selectedWord
			 .split('')
			 .map(letter => `<span class='letter'>
				 	${correctLetters.includes(letter) ? letter : ''}
				</span>`)
			 .join('')
		}
	`;

	// Add condition win
	const innerWord = wordEl.innerText.replace(/\n/g, '');
	
	if(innerWord == selectedWord) {
		finalMessage.innerHTML = 'Congratulations! You won! &#128512;';
		finalMessageRevealWord.innerText = '';
		popup.style.display = 'flex';

		playable = false;
	}
}
displayWord();
//split, map, replace, join
// Update the wrong letters
function updateWrongLettersEl() {
	wrongLettersEl.innerHTML = `
		${wrongLetters.length > 0 ? '<p>Wrong</p>' : ""}
		${wrongLetters.map(letter => `<span>${letter}</span>`)}
	`;

	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		// if(index < errors) {
		// 	part.style.display = 'block';
		// } else {
		// 	part.style.display = 'none';
		// }
		part.style.display = index < errors ? 'block' : 'none';
	});

	// Check if lost
	if(wrongLetters.length == figureParts.length) {
		finalMessage.innerHTML = 'Unfortunately you lost. &#128533;';
		finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
		popup.style.display = 'flex';

		playable = false;
	}
}

// Show notification
function showNotification() {
	notification.classList.add("show");

	setTimeout(() => {
		notification.classList.remove("show");
	}, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
	if (playable) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			const letter = e.key.toLowerCase();

			if (selectedWord.includes(letter)) {
				if (!correctLetters.includes(letter)) {
					correctLetters.push(letter);
					displayWord();
				} else {
					showNotification();
				}
			} else {
				if (!wrongLetters.includes(letter)) {
					wrongLetters.push(letter);
					updateWrongLettersEl();
				} else {
					showNotification();
				}
			}
		}
	}
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
	playable = true;
	correctLetters.splice(0);
	wrongLetters.splice(0);
	selectedWord = words[Math.floor(Math.random() * words.length)];
	displayWord();
	updateWrongLettersEl();
	popup.style.display = 'none';
});