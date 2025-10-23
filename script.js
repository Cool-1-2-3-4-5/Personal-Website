document.addEventListener("DOMContentLoaded", () => {
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

  const NAV_REMOVE_SCROLL = 400; // change this number to taste

  const nav = document.querySelector('nav');
  function checkNavVisibility() {
    if (!nav) return;
    if (window.scrollY > NAV_REMOVE_SCROLL) {
      if (!nav.classList.contains('hidden-by-scroll')) {
        // hide (acts like "removing" visually)
        nav.style.display = 'none';
        nav.classList.add('hidden-by-scroll');
      }
    } else {
      if (nav.classList.contains('hidden-by-scroll')) {
        // restore
        nav.style.display = '';
        nav.classList.remove('hidden-by-scroll');
      }
    }
  }

  window.addEventListener('scroll', checkNavVisibility, { passive: true });

  checkNavVisibility();

  const contactForm = document.getElementById('contact-Form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
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
        contactForm.reset();
      })
      .catch(error => {
        alert('There was an error sending your message.');
        console.error(error);
      });
    });
  }
});