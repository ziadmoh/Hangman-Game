const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMsg = document.getElementById('final-msg');
const figurePatrts = document.querySelectorAll('.figure-part');


let words = [];
fetch('http://127.0.0.1:5500/words.json').then(res => res.json()).then(data => {
  
words = data.words;
selectedWord =  words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);
displayWord();
} );




let selectedWord =  words[Math.floor(Math.random() * words.length)];


const correctLetters = [];
const wrongLetters = [];

function displayWord(){
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(
            letter => 
            `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : '' } 
                </span> 
            `
            )
            .join('')
      } 
    `;
    const innerWord = wordEl.innerText.replace(/\n/g,'');
    if(innerWord === selectedWord ){
        finalMsg.innerText = 'Congrats! You have Won 🤗';
        popup.style.display = 'flex'
    }
}

function showNotification(){
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}
// Update wrong letter
function updateWrongLettersEl(){
  //display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>wrong</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>` )}
  `;
  //display parts 
  figurePatrts.forEach((part,index) => {
    const errs = wrongLetters.length;
    if(index <errs ){
      part.style.display = 'block';
    }else{
      part.style.display = 'none';
    }
  } );
  //Check If the parts is completed 
  if(wrongLetters.length === figurePatrts.length){
    finalMsg.innerText = 'unfortunately You Lost!  😓 ';
    popup.style.display = 'flex';
  }
}
// KEYDOWN
window.addEventListener('keydown', e =>{
    if(e.code >= 'KeyA' && e.code <= 'KeyZ'   ){
      const letter = e.key;
      if(selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)){
          correctLetters.push(letter);
          displayWord();
        }else{
          showNotification();
        }
      }else{
        if(!wrongLetters.includes(letter)){
          wrongLetters.push(letter);
          updateWrongLettersEl();
        }else{
          showNotification();
        }
      }
    }
   
} );
// Play again
playAgainBtn.addEventListener('click', () =>{
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  console.log(selectedWord);
  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none'
})
  
