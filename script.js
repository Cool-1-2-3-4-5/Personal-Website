document.addEventListener("DOMContentLoaded", () => {
  // Typer effect
  const words = ["Developer", "Archer", "Builder", "Engineer", "Robotics", "Soccer", "Runner"];
  const typerElement = document.querySelector(".typer p");
  let wordIndex = -1;

  function getRandomWord() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * words.length);
    } while (randomIndex === wordIndex);
    wordIndex = randomIndex;
    return words[randomIndex];
  }

  function typeWord(word, callback) {
    typerElement.textContent = "";
    let i = 0;

    const typeInterval = setInterval(() => {
      if (i < word.length) {
        typerElement.textContent += word[i];
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(callback, 1000);
      }
    }, 200);
  }

  function startTyping() {
    const nextWord = getRandomWord();
    typeWord(nextWord, startTyping);
  }

  if (typerElement) {
    startTyping();
  }

  // Fade-in animation for Home section
  const homeGrid = document.querySelector('.home-grid');
  if (homeGrid) {
    homeGrid.style.opacity = '0';
    homeGrid.style.transform = 'translateX(-80px)';
    homeGrid.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(.77,0,.18,1)';
    setTimeout(() => {
      homeGrid.style.opacity = '1';
      homeGrid.style.transform = 'translateX(0)';
    }, 100);
  }

  // Contact form submission
  document.getElementById('contact-Form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;

    fetch('YOUR_WEB_APP_URL', {
      method: 'POST',
      body: JSON.stringify({ name, email, comment }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.text())
    .then(data => {
      alert('Thank you! Your message has been sent.');
      document.getElementById('contact-Form').reset();
    })
    .catch(error => {
      alert('There was an error sending your message.');
      console.error(error);
    });
  });
});