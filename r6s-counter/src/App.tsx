import React from 'react';
import './App.scss';

export const App: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);

  const onClickMinus = () => {
    setCount((prev) => prev - 1);
  };

  const onClickPlus = () => {
    setCount((prev) => prev + 1);
  };

	return (
		<div className="App">
			<div>
				<h2>Счетчик:</h2>
				<h1>{count}</h1>
				<button className="minus" onClick={onClickMinus}>- Минус</button>
				<button className="plus" onClick={onClickPlus}>Плюс +</button>
			</div>
		</div>
	);
};
