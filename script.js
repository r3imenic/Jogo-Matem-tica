let score = 0;
let timeLeft = 30;
let timerId;
let correctAnswer;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 20);
    const num2 = Math.floor(Math.random() * 20);
    const operator = Math.random() > 0.5 ? '+' : (Math.random() > 0.5 ? '-' : '*');
    const question = `${num1} ${operator} ${num2}`;
    correctAnswer = eval(question);
    document.getElementById('question').textContent = question;
}

function handleAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById('score').textContent = `Pontuação: ${score}`;
        resetTimer();
        generateQuestion();
    } else {
        endGame();
    }
    document.getElementById('answer').value = ''; // Limpa o campo de resposta
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').style.width = `${(timeLeft / Math.max(30 - score, 1)) * 100}%`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function resetTimer() {
    timeLeft = Math.max(30 - score, 1);
    document.getElementById('timer').style.width = '100%';
}

function endGame() {
    clearInterval(timerId);
    document.getElementById('final-score').textContent = score;
    document.getElementById('end-screen').classList.remove('hidden');
    document.querySelector('.container').classList.add('hidden');
}

function restartGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById('score').textContent = `Pontuação: ${score}`;
    document.getElementById('end-screen').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
    generateQuestion();
    startTimer();
    document.getElementById('answer').value = ''; // Limpa o campo de resposta
}

// Evento para o botão de reiniciar
document.getElementById('restart-button').addEventListener('click', restartGame);

// Evento para o campo de resposta
document.getElementById('answer').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleAnswer();
    }
});

// Inicia o jogo
generateQuestion();
startTimer();
