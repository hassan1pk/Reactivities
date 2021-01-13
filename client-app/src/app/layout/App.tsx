import React, {Component} from 'react';
import logo from './logo.svg';
import { cars } from './demo';
import CarItem from './CarItem';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react'

class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/values')
      .then((response) =>{
        this.setState({
          values: response.data
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
            this.state.values.map((value:any) =>(
              <List.Item key={value.id}>{value.name}</List.Item>
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
