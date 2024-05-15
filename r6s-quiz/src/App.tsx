import React from 'react';

import './App.scss';

type QuestionType = {
	title: string;
	variants: string[];
	correct: number;
};

const questions: QuestionType[] = [
	{
		title: 'React - это ... ?',
		variants: ['библиотека', 'фреймворк', 'приложение'],
		correct: 0,
	},
	{
		title: 'Компонент - это ... ',
		variants: [
			'приложение',
			'часть приложения или страницы',
			'то, что я не знаю что такое',
		],
		correct: 1,
	},
	{
		title: 'Что такое JSX?',
		variants: [
			'Это простой HTML',
			'Это функция',
			'Это тот же HTML, но с возможностью выполнять JS-код',
		],
		correct: 2,
	},
	{
		title: 'Что такое useState?',
		variants: [
			'Это функция для хранения данных компонента',
			'Это глобальный стейт',
			'Это когда ты никому не нужен',
		],
		correct: 0,
	},
];

interface ResultProps {
	count: number;
}

const Result: React.FC<ResultProps> = ({ count }) => {
	return (
		<div className="result">
			<img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
			<h2>
				Вы отгадали {count} ответа из {questions.length}
			</h2>
			<button>
				<a className='try-again' href="/">Попробовать еще раз</a>
			</button>
		</div>
	);
};

interface GameProps {
  step: number;
	question: QuestionType;
	onNextStep: (index: number) => void;
}

const Game: React.FC<GameProps> = ({ step, question, onNextStep }) => {
  const percent: number = Math.round((step / questions.length) * 100);

	return (
		<>
			<div className="progress">
				<div style={{ width: `${percent}%` }} className="progress__inner"></div>
			</div>
			<h1>{question.title}</h1>
			<ul>
				{question.variants.map((text, index) => {
					return (
						<li key={index} onClick={() => onNextStep(index)}>
							{text}
						</li>
					);
				})}
			</ul>
		</>
	);
};

export const App: React.FC = () => {
	const [count, setCount] = React.useState<number>(0);
	const [step, setStep] = React.useState<number>(0);
	const question: QuestionType = questions[step];

	const onNextStep = (index: number) => {
		if (index === question.correct) {
			setCount((prev) => prev + 1);
		}
		setStep((prev) => prev + 1);
	};

	return (
		<div className="App">
			{step === questions.length ? (
				<Result count={count} />
			) : (
				<Game 
          step={step} 
          question={question} 
          onNextStep={onNextStep} 
        />
			)}
		</div>
	);
};
