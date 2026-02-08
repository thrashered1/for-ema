const moments = [
  {
    text: "if we could spend valentine's together in lisbon, what would matter most?",
    choices: [
      "finding the perfect spot to watch the sunset",
      "getting lost in conversation at some random café",
      "just being in the same place, breathing the same air",
      "making each other laugh until our faces hurt"
    ]
  },
  {
    text: "what do you think i appreciate most about you?",
    choices: [
      "how you see the world differently",
      "how comfortable silence feels with you",
      "the way you make ordinary moments feel special",
      "all of it, honestly"
    ]
  },
  {
    text: "when we finally see each other again, what do you think happens first?",
    choices: [
      "THE BEST SEX",
      "THE BEST SEX",
      "THE BEST SEX",
      "probably all three at once"
    ]
  },
  {
    text: "what makes this distance bearable?",
    choices: [
      "knowing it's temporary",
      "our late-night conversations",
      "the anticipation of seeing you again",
      "the certainty that some things are worth waiting for"
    ]
  },
  {
    text: "you know what the best part is?",
    choices: [
      "that even 2,700 km away, you still feel close",
      "that we can be ourselves completely",
      "that this is just the beginning",
      "that it's you"
    ]
  }
];

let currentMoment = 0;

// важно: оставям функциите глобални, защото ги викаш с onclick=""
function startExperience() {
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';
  showMoment();
}

function showMoment() {
  const moment = moments[currentMoment];
  document.getElementById('momentNumber').textContent = `MOMENT ${String(currentMoment + 1).padStart(2, '0')}/05`;
  document.getElementById('momentText').textContent = moment.text;

  const container = document.getElementById('choicesContainer');
  container.innerHTML = '';

  moment.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = choice;
    btn.onclick = () => selectChoice(index);
    container.appendChild(btn);
  });
}

function selectChoice(index) {
  createParticles(null);

  currentMoment++;

  if (currentMoment < moments.length) {
    setTimeout(() => {
      showMoment();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  } else {
    setTimeout(() => {
      showMessage();
    }, 600);
  }
}

function showMessage() {
  document.getElementById('gameScreen').style.display = 'none';
  document.getElementById('messageScreen').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Subtle particle celebration
  for (let i = 0; i < 10; i++) {
    setTimeout(() => createParticles(null), i * 200);
  }
}

function createParticles(event) {
  const count = event ? 8 : 15;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.className = 'particle';

      if (event) {
        particle.style.left = event.pageX + (Math.random() - 0.5) * 100 + 'px';
        particle.style.top = event.pageY + 'px';
      } else {
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
      }

      document.body.appendChild(particle);

      setTimeout(() => particle.remove(), 8000);
    }, i * 50);
  }
}

function createManyParticles() {
  // Show photo modal
  showPhoto();

  // Also create particles
  for (let i = 0; i < 30; i++) {
    setTimeout(() => createParticles(null), i * 100);
  }
}

function showPhoto() {
  document.getElementById('photoModal').classList.add('active');
}

function closePhoto() {
  document.getElementById('photoModal').classList.remove('active');
}

// Ambient particles on load
setInterval(() => {
  if (Math.random() > 0.7) {
    createParticles(null);
  }
}, 3000);
