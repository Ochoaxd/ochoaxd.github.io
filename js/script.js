// Variables globales
let currentPage = 'intro';
let gameScore = 0;
let gameAttempts = 0;
let quizScore = 0;
let currentQuizQuestion = 0;

// Datos del juego
const wasteItems = [
  { name: 'Cáscara de plátano', emoji: '🍌', type: 'organico' },
  { name: 'Botella plástica', emoji: '🍼', type: 'reciclable' },
  { name: 'Pañal', emoji: '👶', type: 'no-reciclable' },
  { name: 'Pila', emoji: '🔋', type: 'peligroso' },
  { name: 'Papel', emoji: '📄', type: 'reciclable' },
  { name: 'Restos de comida', emoji: '🍽️', type: 'organico' },
  { name: 'Lata de aluminio', emoji: '🥤', type: 'reciclable' },
  { name: 'Medicamento', emoji: '💊', type: 'peligroso' },
  { name: 'Hojas secas', emoji: '🍂', type: 'organico' },
  { name: 'Chicle', emoji: '🍬', type: 'no-reciclable' },
  { name: 'Vidrio', emoji: '🍶', type: 'reciclable' },
  { name: 'Bombilla', emoji: '💡', type: 'peligroso' }
];

// Preguntas del quiz
const quizQuestions = [
  { question: "¿Cuál de estos residuos es orgánico?", options: ["Botella plástica", "Cáscara de naranja", "Pila", "Papel higiénico"], correct: 1, explanation: "Las cáscaras de frutas son residuos orgánicos que se pueden compostar." },
  { question: "¿Qué significa la primera R de las 3 R's?", options: ["Reciclar", "Reducir", "Reutilizar", "Renovar"], correct: 1, explanation: "Reducir significa usar menos productos desechables y elegir opciones más duraderas." },
  { question: "¿Dónde NO debes arrojar los residuos?", options: ["En el contenedor", "En el río", "En el punto de acopio", "En la bolsa de basura"], correct: 1, explanation: "Nunca debemos arrojar basura a los ríos porque contamina el agua y daña la vida acuática." },
  { question: "¿Qué tipo de residuo es una pila usada?", options: ["Orgánico", "Reciclable", "Peligroso", "No reciclable"], correct: 2, explanation: "Las pilas son residuos peligrosos que deben llevarse a puntos especiales de recolección." },
  { question: "¿Cuál es un beneficio del compostaje?", options: ["Contamina el suelo", "Crea abono natural", "Atrae plagas", "Ocupa mucho espacio"], correct: 1, explanation: "El compostaje transforma los residuos orgánicos en abono natural para las plantas." }
];

// Funciones de navegación
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
  document.getElementById(pageId + '-page').classList.remove('hidden');
  currentPage = pageId;
  if (pageId === 'game') initGame();
  else if (pageId === 'quiz') initQuiz();
}

// ------------------ Juego ------------------ //
function initGame() {
  gameScore = 0;
  gameAttempts = 0;
  updateGameScore();
  generateWasteItems();
  setupDragAndDrop();
}

function generateWasteItems() {
  const container = document.getElementById('waste-items');
  container.innerHTML = '';
  const selectedItems = wasteItems.sort(() => 0.5 - Math.random()).slice(0, 6);
  selectedItems.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'drag-item bg-white rounded-lg p-4 shadow-md cursor-grab text-center border-2 border-gray-200 hover:border-gray-300 transition-colors';
    itemElement.draggable = true;
    itemElement.dataset.type = item.type;
    itemElement.dataset.id = index;
    itemElement.innerHTML = `<div class="text-3xl mb-2">${item.emoji}</div><p class="text-sm font-medium text-gray-700">${item.name}</p>`;
    container.appendChild(itemElement);
  });
}

function setupDragAndDrop() {
  document.querySelectorAll('.drag-item').forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
  });
  document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragover', e => e.preventDefault());
    zone.addEventListener('dragenter', e => e.target.classList.add('drag-over'));
    zone.addEventListener('dragleave', e => e.target.classList.remove('drag-over'));
    zone.addEventListener('drop', handleDrop);
  });
}

function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.id);
  e.target.style.opacity = '0.5';
}
function handleDragEnd(e) { e.target.style.opacity = '1'; }

function handleDrop(e) {
  e.preventDefault();
  e.target.classList.remove('drag-over');
  const draggedId = e.dataTransfer.getData('text/plain');
  const draggedElement = document.querySelector(`[data-id="${draggedId}"]`);
  const dropZone = e.target.closest('.drop-zone');
  if (draggedElement && dropZone) {
    gameAttempts++;
    if (draggedElement.dataset.type === dropZone.dataset.type) {
      gameScore++;
      dropZone.classList.add('correct-drop');
      draggedElement.remove();
      setTimeout(() => dropZone.classList.remove('correct-drop'), 600);
      if (document.querySelectorAll('.drag-item').length === 1) {
        setTimeout(() => {
          alert(`¡Excelente! Has completado el juego con ${gameScore} de ${gameAttempts} intentos correctos.`);
          initGame();
        }, 700);
      }
    } else {
      dropZone.classList.add('wrong-drop');
      setTimeout(() => dropZone.classList.remove('wrong-drop'), 600);
    }
    updateGameScore();
  }
}
function updateGameScore() {
  document.getElementById('score').textContent = gameScore;
  document.getElementById('attempts').textContent = gameAttempts;
}
function resetGame() { initGame(); }

// ------------------ Quiz ------------------ //
function initQuiz() {
  quizScore = 0;
  currentQuizQuestion = 0;
  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  showQuizQuestion();
}
function showQuizQuestion() {
  const question = quizQuestions[currentQuizQuestion];
  const container = document.getElementById('quiz-container');
  document.getElementById('current-question').textContent = currentQuizQuestion + 1;
  document.getElementById('total-questions').textContent = quizQuestions.length;
  document.getElementById('quiz-score').textContent = quizScore;
  container.innerHTML = `
    <h3 class="text-xl font-semibold text-gray-800 mb-6">${question.question}</h3>
    <div class="space-y-3">
      ${question.options.map((opt, i) => `<button onclick="selectAnswer(${i})" class="quiz-option w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">${opt}</button>`).join('')}
    </div>
  `;
}
function selectAnswer(selectedIndex) {
  const question = quizQuestions[currentQuizQuestion];
  const options = document.querySelectorAll('.quiz-option');
  options.forEach(opt => opt.disabled = true);
  options.forEach((opt, i) => {
    if (i === question.correct) opt.classList.add('bg-green-100', 'border-green-500', 'text-green-800');
    else if (i === selectedIndex && i !== question.correct) opt.classList.add('bg-red-100', 'border-red-500', 'text-red-800');
  });
  if (selectedIndex === question.correct) quizScore++;
  setTimeout(() => {
    document.getElementById('quiz-container').innerHTML += `
      <div class="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p class="text-blue-800"><strong>Explicación:</strong> ${question.explanation}</p>
      </div>
      <div class="text-center mt-6">
        <button onclick="nextQuestion()" class="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
          ${currentQuizQuestion < quizQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'} →
        </button>
      </div>
    `;
  }, 1000);
}
function nextQuestion() {
  currentQuizQuestion++;
  if (currentQuizQuestion < quizQuestions.length) showQuizQuestion();
  else showQuizResults();
}
function showQuizResults() {
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('quiz-result').classList.remove('hidden');
  document.getElementById('final-score').textContent = quizScore;
  const msg = quizScore === 5 ? '¡Perfecto! Eres un experto en manejo de residuos sólidos. 🌟' :
              quizScore >= 3 ? '¡Muy bien! Tienes buenos conocimientos, sigue aprendiendo. 👍' :
              'Puedes mejorar. Te recomendamos revisar la sección de aprendizaje. 📚';
  document.getElementById('quiz-message').textContent = msg;
}
function restartQuiz() { initQuiz(); }

// Inicializar
document.addEventListener('DOMContentLoaded', () => showPage('intro'));
