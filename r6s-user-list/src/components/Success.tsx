import React from 'react';

type SuccessProps = {
  count: number;
}

export const Success: React.FC<SuccessProps> = ({ count }) => {
  return (
    <div className="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Успешно!</h3>
      <p>Всем {count} пользователям отправлено приглашение.</p>
      <a href="/">
      <button className="send-invite-btn">
        Назад
      </button>
      </a>
    </div>
  );
};
