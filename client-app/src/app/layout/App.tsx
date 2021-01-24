import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
//import logo from './logo.svg';
//import { cars } from '../../demo';
//import CarItem from '../../CarItem';
import { Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';

const App = () => {
  const activityStore = useContext(ActivityStore)
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));

  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false));
  }

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activityStore.activities}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
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

export default observer(App);
