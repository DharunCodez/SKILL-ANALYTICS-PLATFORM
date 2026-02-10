import React from 'react';

export default function SkillList({ skills, onEdit, onDelete }) {
  return (
    <div>
      <h3>Your skills</h3>
      <ul>
        {skills.map(s => (
          <li key={s.id}>
            <strong>{s.skill_name}</strong> - {s.level} - last updated: {s.last_updated}
            <button onClick={() => onEdit(s)}>Edit</button>
            <button onClick={() => onDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
