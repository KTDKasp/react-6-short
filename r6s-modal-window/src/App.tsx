import React from 'react';
import './App.scss';

interface ModalProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
	isModalOpen,
	setIsModalOpen,
	children,
}) => {
	return (
		<div className={`overlay animated ${isModalOpen ? 'show' : ''}`}>
			<div className="modal">
				<svg
					height="200"
					viewBox="0 0 200 200"
					width="200"
					onClick={() => setIsModalOpen(false)}
				>
					<title />
					<path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
				</svg>
				{children}
			</div>
		</div>
	);
};

export const App: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

	return (
		<div className="App">
			<button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
				✨ Открыть окно
			</button>

			{/* without animation */}
			{/* {isModalOpen ? (
				<div className="overlay">
					<div className="modal">
						<svg height="200" viewBox="0 0 200 200" width="200" onClick={() => setIsModalOpen(false)}>
							<title />
							<path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
						</svg>
						<img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" />
					</div>
				</div>
			) : null} */}

			{/* with animation */}
			<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
				<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHhtaTBxaGdhZDRzYmxnaWIxejZvNjdiNmk4azlkMW5ncnB2bHo5ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uiMIJMFYgRaAz5Pcb7/giphy.gif" />
				<h3>Ты открыл окно</h3>
			</Modal>
		</div>
	);
};
