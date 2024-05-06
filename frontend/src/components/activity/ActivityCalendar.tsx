import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table';
import ActivityCell from "./ActivityCell";
import { useEffect, useState } from 'react';

interface ActivityType {
  day: number;
  month: number;
  year: number;
  studyTime: number;
}

export default function ActivityCalendar({activities}: {activities : ActivityType[]}) {
  const [calendar, setCalendar] = useState<any[]>([[]]);
  
  const daysOfWeek: string[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  useEffect(() => {
    loadActivities();
  }, [])

  async function loadActivities() {
    // Находим число строк у таблицы.
    let rows: number = 1;
    await activities.forEach(activity => {
      const dayNumber: number = getDayNumber(activity)
      if (dayNumber === 1)
        rows += 1;
    });
    if (getDayNumber(activities[0]) === 1 || getDayNumber(activities[activities.length - 1]) === 1)
      rows -= 1;
    
    let tempCalendar: any = [];

    // Заполняем матрицу null значениями.
    for(let row = 0; row < rows; row++) {
      tempCalendar.push([]);
      for(let day = 0; day < daysOfWeek.length; day++) {
        tempCalendar[row].push(null);
      }
    }

    // Заполяем календарь данными о времени активности.
    await activities.forEach((activity, index) => {
      let day: number = getDayNumber(activity) - 1;
      if (day < 0) day = 6;
      const row: number = Math.floor((day + index) / 7);

      tempCalendar[row][day] = activity.studyTime;
    });

    setCalendar(tempCalendar);
  }

  // Возвращает номер дня в недели.
  function getDayNumber(activity: ActivityType) {
    return new Date(activity.year, activity.month-1, activity.day).getDay()
  }

  return (
    <>
      <h5>Activity</h5>
      
      <Table>

        {/* Заголовок - дни недели. */}
        <thead>
          <tr>
            {daysOfWeek.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: calendar.length }).map((_, rowIndex) => (     
            <tr key={rowIndex}>

              {daysOfWeek.map((_, dayIndex) => (
                <th key={dayIndex}>

                  {calendar[rowIndex][dayIndex] !== null &&
                    <ActivityCell studyTime={calendar[rowIndex][dayIndex]} />}
                </th>
              ))}

            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}