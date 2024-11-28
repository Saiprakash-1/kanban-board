import React from 'react';
import './styles/card.css'

const Card = ({ task }) => {
  // Destructure properties from the task object
  const { id, title, category, avatar } = task;

  return (
    <div className="task-card">
      <div className="task-header">
        <span className="task-id">{id}</span>
        {avatar && <span className="task-avatar">{avatar}</span>}
      </div>
      <h4 className="task-title">{title}</h4>
      <p className="task-category">{category}</p>
    </div>
  );
};

export default Card;
