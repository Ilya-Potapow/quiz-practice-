const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

let score = 0;
let questionIndex = 0;

const headerContainer = document.querySelector('#header');
const quizList = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

clearPage();
renderQuestion();
submitBtn.onclick = checkAnswers;

function clearPage() {
	headerContainer.innerHTML = '';
	quizList.innerHTML = '';
}

function renderQuestion() {
	// Создаем шаблон разметки с вопросами
	const questionHTML = `<h2 class="title">${(questions[questionIndex]['question'])}</h2>`;
	headerContainer.innerHTML = questionHTML;


	// обходим массив с ответами и рендерим их
	let answerNumber = 1;
	for (answerText of (questions[questionIndex]['answers'])) {

		const answersHTML = `
			<li>
				<label>
					<input value="${answerNumber}" type="radio" class="answer" name="answer" />
					<span>${answerText}</span>
				</label>
			</li>
		`;
		quizList.innerHTML += answersHTML;
		answerNumber++;
	}

}

function checkAnswers() {
	// Ищем выбраный ответ 
	const checkedRadio = quizList.querySelector('input[type = radio]:checked');
	submitBtn.blur();
	// Если такого нет выходим из функции
	if (!checkedRadio) {
		return
	}
	// Ищем номер выбранного ответа / номер правильного ответа
	const answerValue = Number(checkedRadio.value);
	const correctAnswerValue = (questions[questionIndex]['correct']);
	// 
	if (answerValue === correctAnswerValue) {
		score++;
	};

	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		renderQuestion();
	} else {
		clearPage();
		showResults();
	}
}

function showResults() {

	let message, title;
	let result = `${score} из ${questions.length}`;

	if (score === questions.length) {
		title = "Поздравляем! 🎉"
		message = "Вы ответили верно на все вопросы! 👍"
	} else if ((score * 100) / questions.length >= 50) {
		title = "Неплохой результ! 👌"
		message = "Вы дали более половины правильных ответов. 😎"
	} else {
		title = "Кринж... 🤦‍♂️"
		message = "Пока у вас меньше половины правильных ответов. 😒"
	};

	const resultHTML = `
		<h2 class="title">${title}</h2>
		<h3 class="summary">${message}</h3>
		<p class="result">${result}</p>
	`;

	headerContainer.innerHTML = resultHTML;

	submitBtn.innerText = "Попробовать еще раз"
	submitBtn.onclick = () => history.go();
}	