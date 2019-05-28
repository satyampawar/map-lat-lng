import React from 'react';
import logo from './logo.svg';
import './App.css';
import MapLatLong from './MapLatLong'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      latitude: null,
      longitude: null
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(lat,long){
  
    this.setState({latitude: "fsafdasf",longitude: long})
  }

 
  render(){
    return (
      <div className="App">
        <MapLatLong
          height="250px"
          width="340px"
          accessKey="xxxxxxxxxxxxxxxxx"
          renderToggleIcon="<i className='fa fa-globe'></i>"
          getOnChange={(latitude,longitude) => this.handleChange(latitude,longitude)} >
          <div>
          <input type="text" value={this.state.latitude} name="latitude" /><label>latitude</label></div>
           <div><label>longitude</label><input type="text" value={this.state.longitude} name="longitude" /></div>
          
        </MapLatLong>
      </div>
    );
  }

}

export default App;
