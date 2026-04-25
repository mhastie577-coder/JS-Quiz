const quizData = [
  {
    question: "What is JavaScript mainly used for?",
    answers: [
      { text: "Creating websites", correct: false },
      { text: "Building mobile apps", correct: false },
      { text: "Developing desktop applications", correct: false },
      { text: "Adding interactivity to web pages", correct: true }
    ]
  },
  {
    question: "What will console.log(typeof null) output?",
    answers: [
      { text: "object", correct: true },
      { text: "null", correct: false },
      { text: "undefined", correct: false },
      { text: "boolean", correct: false }
    ]
  },
  {
    question: "Which of the following is NOT a loop in JavaScript?",
    answers: [
      { text: "for", correct: false },
      { text: "while", correct: false },
      { text: "do-while", correct: false },
      { text: "foreach", correct: true }
    ]
  },
  {
    question: "Which keyword is used to create a constant value in JavaScript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "static", correct: false }
    ]
  }
];
let currentIndex = 0;
let score = 0;

function displayQuestion(index) {
  const questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = ''; // this is to show only one question at a time
  const q = quizData[index];

  const container = document.createElement('div');
  container.className = 'question';

  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = q.question;
  fieldset.appendChild(legend);

  q.answers.forEach((answer, i) => {
    const id = `q${index}a${i}`;
    const label = document.createElement('label');
    label.htmlFor = id;
    label.style.display = 'block';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question${index}`;
    input.id = id;
    input.value = i;

    label.appendChild(input);
    label.appendChild(document.createTextNode(' ' + answer.text));
    fieldset.appendChild(label);
  });

  container.appendChild(fieldset);
  questionContainer.appendChild(container);

  const nextBtn = document.getElementById('submit');
  nextBtn.textContent = index === quizData.length - 1 ? 'Finish' : 'Next';
}

function handleNext() {
  const selected = document.querySelector(`input[name="question${currentIndex}"]:checked`);
  if (!selected) {
    alert('Please select an answer before continuing.');
    return;
  }

  // this locks inputs so answer can't be changed
  document.querySelectorAll(`input[name="question${currentIndex}"]`).forEach(i => i.disabled = true);

  // score update
  const chosen = parseInt(selected.value, 10);
  if (quizData[currentIndex].answers[chosen].correct) score++;

  // move on or finish
  if (currentIndex < quizData.length - 1) {
    currentIndex++;
    displayQuestion(currentIndex);
  } else {
    showFinalResults();
  }
}

function showFinalResults() {
  document.getElementById('question-container').innerHTML = '';
  const resultsEl = document.getElementById('results');
  resultsEl.classList.remove('hidden');
  resultsEl.textContent = `You scored ${score} out of ${quizData.length}`;
  document.getElementById('submit').classList.add('hidden');
  document.getElementById('restart-button').classList.remove('hidden');
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  const resultsEl = document.getElementById('results');
  resultsEl.classList.add('hidden');
  resultsEl.textContent = '';           // clear previous score text
  document.getElementById('restart-button').classList.add('hidden');
  document.getElementById('submit').classList.remove('hidden');
  displayQuestion(currentIndex);
}


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('submit').addEventListener('click', handleNext);
  document.getElementById('restart-button').addEventListener('click', restartQuiz);
  displayQuestion(currentIndex);
});

displayQuestion(currentIndex);

