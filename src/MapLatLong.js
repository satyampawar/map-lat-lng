import React from "react";
import "./map.css";
import MapView from "./MapView";
import $script from "scriptjs";
import _ from "lodash";
const DEFAULT_HEIGHT = "250px";
const DEFAULT_WIDTH = "300px";
const DEFAULT_ICON = "<i className='fa fa-globe'></i>";
class MapLatLong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: null,
      show: false,
      accessKey: this.props.accessKey,
      options: {
        height: this.props.height || DEFAULT_HEIGHT,
        width: this.props.width || DEFAULT_WIDTH
      },
      latitude: null,
      longitude: null,
      google: {}
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.recursiveCloneChildren = this.recursiveCloneChildren.bind(this);
  }

  componentWillMount() {
    let _that = this;
    $script(
      `https://maps.googleapis.com/maps/api/js?key=${
        _that.state.accessKey
      }&callback=myMap`,
      function() {
        _that.setState({ google: window.google });
      }
    );
    this.setState({ children: this.props.children });
  }

  handleToggle() {
    this.setState({ show: !this.state.show });
  }

  getValue(lat, long) {
    this.setState({ latitude: lat, longitude: long });
    this.props.getOnChange(lat, long);
  }

  recursiveCloneChildren(children) {
    return React.Children.map(children, child => {
      var childProps = {};
      if (child.type == "input" && child.props.name == "latitude")
        childProps = { value: this.state.latitude };
      if (child.type == "input" && child.props.name == "longitude")
        childProps = { value: this.state.longitude };
      if (!_.isObject(child)) return child;
      childProps.children = this.recursiveCloneChildren(child.props.children);
      return React.cloneElement(child, childProps);
    });
  }

  render() {
    let { children } = this.state;
    let renderToggleIcon = this.props.renderToggleIcon || DEFAULT_ICON;
    return (<div>
        {this.recursiveCloneChildren(children)}{" "}
        <button
          onClick={this.handleToggle}
          dangerouslySetInnerHTML={{ __html: renderToggleIcon }}
        />
        <div
          className="map-container"
          style={{ display: this.state.show ? "block" : "none" }}
        >
          <ul
            className="dropdown-menu"
            style={{ height: this.state.options.height }}
          >
            {this.state.show ? (
              <MapView
                {...this.state}
                getValue={(lat, long) => this.getValue(lat, long)}
              />
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default MapLatLong;
