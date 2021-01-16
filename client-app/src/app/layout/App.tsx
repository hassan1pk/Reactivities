import React, { useState, useEffect, Fragment } from 'react';
import logo from './logo.svg';
import { cars } from '../../demo';
import CarItem from '../../CarItem';
import axios from 'axios';
import { Container, Header, Icon, List } from 'semantic-ui-react'
import { IActivity } from '../models/activity'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity} />
      </Container>
    </Fragment>
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className='App-logo' alt='logo'/>
        <ul>
          {
            this.state.values.map((value:any) =>(
              <li key={value.id}>{value.name}</li>
            ))
          }
        </ul>
      </header>
    </div>*/
  );

}

/*function App(): JSX.Element {
  return (
    <div className="App">
      <ul>
        {
          cars.map((car) => (
            <li>{car.color}</li>
          ))
        }
      </ul>

      <ul>
        {
          cars.map((car) => (
            <CarItem car={car} />
          ))
        }
      </ul>
    </div>
  );
}*/

export default App;
