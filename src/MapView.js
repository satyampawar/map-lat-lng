import React from "react";
import "./map.css";
class MapView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.mapDraw();
  }
  mapDraw() {
    let _that = this;
    let { google } = this.props;
    var mapProp = {
      center: new google.maps.LatLng(51.508742, -0.12085),
      zoom: 5
    };
    var map = new google.maps.Map(
      document.getElementById("googleMap"),
      mapProp
    );
    google.maps.event.addListener(map, "click", function(event) {
      _that.props.getValue(event.latLng.lat(), event.latLng.lng());
    });
  }

  render() {
    let {
      options: { height, width }
    } = this.props;
    return (
      <li>
        <div className="row">
          <div className="col-md-12">
            <div id="googleMap" style={{ height: height, width: width }} />
          </div>
        </div>
      </li>
    );
  }
}

export default MapView;