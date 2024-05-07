import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from "../../store/userSlice";
import { useNavigate } from 'react-router-dom';
import { getActivities } from '../../api/requests';

import IUser from '../../types/IUser';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import ActivityCalendar from '../../components/activity/ActivityCalendar';
import "./Profile.css"

interface ActivityType {
  day: number;
  month: number;
  year: number;
  studyTime: number;
}

export default function ProfilePage() {
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const user = useSelector<any, IUser>(state => state.user);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login");
      return;
    }
    loadActivities();
  }, []);

  // Загрузка активностей.
  function loadActivities() {
    getActivities(user)
    .then((response) => {
      setActivities(response.data);
    });
  }

  // Выход из аккаунта.
  const logout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <>
      <h3 className="title">Profile</h3>

      {/* Имя пользователя. */}
      <div className="header-container">
        <h4>Name: {user.name}</h4>
        <Button className="profile-logout-btn" variant="outline-primary" onClick={logout}>Log out</Button>
      </div>

      {/* Календарь активностей. */}
      <div className="activity-calendar">
        {activities.length > 0 &&
          <ActivityCalendar activities={activities}/>}
        {activities.length === 0 && 
          <span>You haven't studied anything yet.</span>}
      </div>
    </>
  );
}