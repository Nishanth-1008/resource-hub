import React, { useEffect, useState } from 'react';
import './styles/Calender.css';

const Calendar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://resourcehub.rf.gd/fetch_schedule.php') // use your API endpoint here
      .then(res => res.json())
      .then(setData)
      .then(data => {
        console.log("API response:", data);
        setData(data);
      })
   
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const subjects = ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS'];

  return (
    <div className="page-container">
      <h1>📅 Today's Schedule</h1>

      {data.length === 0 ? (
        <p>No data available for today.</p>
      ) : (
        <div className="card-container">
          {subjects.map(subject => (
            <div key={subject} className="card">
              <h2>{subject}</h2>
              <p>{data[0][subject]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
