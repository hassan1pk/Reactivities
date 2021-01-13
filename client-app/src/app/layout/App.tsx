import React, {Component} from 'react';
import logo from './logo.svg';
import { cars } from './demo';
import CarItem from './CarItem';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react'
import {IActivity} from '../models/activity'

interface IState {
  activities : IActivity[];
}

class App extends Component<{}, IState> {
  readonly state: IState = {
    activities: []
  }

  componentDidMount() {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) =>{
        this.setState({
          activities: response.data
        });
      });
  }

  render(){
    return(
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>   
        <List>
          {
            this.state.activities.map((activity) =>(
              <List.Item key={activity.id}>{activity.title}</List.Item>
            ))
          }
        </List>
      </div>
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
