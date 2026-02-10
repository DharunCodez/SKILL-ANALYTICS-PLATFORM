import React, { useEffect, useState } from 'react';
import { getAnalytics, getSuggestions } from '../services/api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analytics(){
  const [data, setData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [goal, setGoal] = useState('');

  async function load(){
    try{
      const res = await getAnalytics();
      setData(res);
    }catch(e){ console.error(e); }
  }
  useEffect(()=>{ load(); }, []);

  async function loadSuggestions(){
    try{ const s = await getSuggestions(goal); setSuggestions(s.suggestions || []); }catch(e){ console.error(e); }
  }

  const chartData = data ? {
    labels: ['Beginner','Intermediate','Advanced'],
    datasets: [{ data: [data.distribution.Beginner||0, data.distribution.Intermediate||0, data.distribution.Advanced||0], backgroundColor: ['#f6c','skyblue','lightgreen'] }]
  } : null;

  return (
    <div>
      <h2>Analytics</h2>
      {data && (
        <>
          <p>Total skills: {data.total}</p>
          <div style={{width:300}}>
            <Pie data={chartData} />
          </div>
          <h3>Stale skills (not updated 90+ days)</h3>
          <ul>{data.stale_skills.map(s=> <li key={s.id}>{s.skill_name} (last: {s.last_updated})</li>)}</ul>
        </>
      )}

      <section>
        <h3>Suggestions / Goal mapping</h3>
        <div>
          <input placeholder="Optional goal (e.g., Full Stack Developer)" value={goal} onChange={e=>setGoal(e.target.value)} />
          <button onClick={loadSuggestions}>Get Suggestions</button>
        </div>
        <ul>
          {suggestions.map((s,i)=> <li key={i}><pre>{JSON.stringify(s,null,2)}</pre></li>)}
        </ul>
      </section>
    </div>
  );
}
