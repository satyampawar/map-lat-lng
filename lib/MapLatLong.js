"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./map.css");

var _MapView = _interopRequireDefault(require("./MapView"));

var _scriptjs = _interopRequireDefault(require("scriptjs"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT_HEIGHT = "250px";
var DEFAULT_WIDTH = "300px";
var DEFAULT_ICON = "<i className='fa fa-globe'></i>";

var MapLatLong =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MapLatLong, _React$Component);

  function MapLatLong(props) {
    var _this;

    _classCallCheck(this, MapLatLong);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapLatLong).call(this, props));
    _this.state = {
      children: null,
      show: false,
      accessKey: _this.props.accessKey,
      options: {
        height: _this.props.height || DEFAULT_HEIGHT,
        width: _this.props.width || DEFAULT_WIDTH
      },
      latitude: null,
      longitude: null,
      google: {}
    };
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.recursiveCloneChildren = _this.recursiveCloneChildren.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MapLatLong, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _that = this;

      (0, _scriptjs.default)("https://maps.googleapis.com/maps/api/js?key=".concat(_that.state.accessKey, "&callback=myMap"), function () {
        _that.setState({
          google: window.google
        });
      });
      this.setState({
        children: this.props.children
      });
    }
  }, {
    key: "handleToggle",
    value: function handleToggle() {
      this.setState({
        show: !this.state.show
      });
    }
  }, {
    key: "getValue",
    value: function getValue(lat, long) {
      this.setState({
        latitude: lat,
        longitude: long
      });
      this.props.getOnChange(lat, long);
    }
  }, {
    key: "recursiveCloneChildren",
    value: function recursiveCloneChildren(children) {
      var _this2 = this;

      return _react.default.Children.map(children, function (child) {
        var childProps = {};
        if (child.type == "input" && child.props.name == "latitude") childProps = {
          value: _this2.state.latitude
        };
        if (child.type == "input" && child.props.name == "longitude") childProps = {
          value: _this2.state.longitude
        };
        if (!_lodash.default.isObject(child)) return child;
        childProps.children = _this2.recursiveCloneChildren(child.props.children);
        return _react.default.cloneElement(child, childProps);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var children = this.state.children;
      var renderToggleIcon = this.props.renderToggleIcon || DEFAULT_ICON;
      return _react.default.createElement("div", null, this.recursiveCloneChildren(children), " ", _react.default.createElement("button", {
        onClick: this.handleToggle,
        dangerouslySetInnerHTML: {
          __html: renderToggleIcon
        }
      }), _react.default.createElement("div", {
        className: "map-container",
        style: {
          display: this.state.show ? "block" : "none"
        }
      }, _react.default.createElement("ul", {
        className: "dropdown-menu",
        style: {
          height: this.state.options.height
        }
      }, this.state.show ? _react.default.createElement(_MapView.default, _extends({}, this.state, {
        getValue: function getValue(lat, long) {
          return _this3.getValue(lat, long);
        }
      })) : null)));
    }
  }]);

  return MapLatLong;
}(_react.default.Component);

var _default = MapLatLong;
exports.default = _default;