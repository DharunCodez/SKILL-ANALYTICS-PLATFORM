import React, { useEffect, useState } from 'react';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../services/api';
import SkillForm from '../components/SkillForm';
import SkillList from '../components/SkillList';

export default function Dashboard(){
  const [skills, setSkills] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  async function load(){
    try{ const res = await getSkills(); setSkills(res.skills); }catch(e){ setError(e.message); }
  }

  useEffect(()=>{ load(); }, []);

  async function handleAdd(payload){
    try{ await addSkill(payload); await load(); }catch(e){ setError(e.message); }
  }
  async function handleUpdate(payload){
    try{ await updateSkill(editing.id, payload); setEditing(null); await load(); }catch(e){ setError(e.message); }
  }
  async function handleDelete(id){ if(!confirm('Delete skill?')) return; try{ await deleteSkill(id); await load(); }catch(e){ setError(e.message); } }

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{display:'flex',gap:20}}>
        <div style={{flex:1}}>
          <h3>{editing? 'Edit Skill' : 'Add Skill'}</h3>
          <SkillForm onSubmit={editing? handleUpdate : handleAdd} initial={editing} />
          {error && <p className="error">{error}</p>}
        </div>
        <div style={{flex:2}}>
          <SkillList skills={skills} onEdit={setEditing} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
