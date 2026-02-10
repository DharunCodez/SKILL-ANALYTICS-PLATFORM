import React, { useState, useEffect } from 'react';

export default function SkillForm({ onSubmit, initial }) {
  const [skill, setSkill] = useState(initial?.skill_name || '');
  const [level, setLevel] = useState(initial?.level || 'Beginner');

  useEffect(()=>{ setSkill(initial?.skill_name || ''); setLevel(initial?.level || 'Beginner'); }, [initial]);

  function submit(e){
    e.preventDefault();
    if(!skill) return;
    onSubmit({ skill_name: skill, level });
    setSkill(''); setLevel('Beginner');
  }

  return (
    <form onSubmit={submit} className="skill-form">
      <input value={skill} onChange={e=>setSkill(e.target.value)} placeholder="Skill name" />
      <select value={level} onChange={e=>setLevel(e.target.value)}>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
}
