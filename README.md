# map-lat-lng


It's simple component that will be use for render map with the help of getting lat and long into chidern text element

## Install

'npm install map-lat-long'

## Usage basic

```jsx
import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import MapLatLong from 'map-lat-long'


class TestComponent extends Component {

  render () {
    return (
      <MapLatLong
		    height="250px"
		    width="340px"
		    accessKey="XXXXXXXXXXXX"
		    renderToggleIcon="<i className='fa fa-globe'></i>"
		    getOnChange={(latitude,longitude) => console.log(latitude,longitude)} >
			    <div>
			    	><label>latitude</label><input type="text"  name="latitude" /</div>
			     <div><label>longitude</label><input type="text"  name="longitude" />
			    </div>    
  		</MapLatLong>
    )
  }
}

ReactDOM.render( <TestComponent />, document.getElementById('root'))
```


## Props

#### `accessKey` (required)

enter google map access key id 

#### renderToggleIcon 
pass icon element as string for map toggle 

### getOnChange

getOnChange(lat,long) 

you will be get latitude and longitude 
click on map anywere and you will get.

after getting cords you can toggled map 


## License
[MIT]