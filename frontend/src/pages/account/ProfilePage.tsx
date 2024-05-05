import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from "../../store/userSlice";
import { useNavigate } from 'react-router-dom';

import UserType from '../../Types/UserType';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import ActivityCalendar from '../../components/activity/ActivityCalendar';
import "./Profile.css"
import { getActivities } from '../../api/requests';

interface ActivityType {
  day: number;
  month: number;
  year: number;
  studyTime: number;
}

export default function ProfilePage() {
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const user = useSelector<any, UserType>(state => state.user);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login");
      return;
    }
    loadActivities();
  }, []);

  function loadActivities() {
    getActivities(user)
    .then((response) => {
      setActivities(response.data);
    });
  }

  const logout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <>
      <h3 className="title">Profile</h3>

      <div className="header-container">
        <h4>Name: {user.name}</h4>
        <Button className="log-out-btn" variant="outline-primary" onClick={logout}>Log out</Button>
      </div>

      {activities.length > 0 &&
        <div className="activity">
          <ActivityCalendar activities={activities}/>
        </div>}
    </>
  );
}