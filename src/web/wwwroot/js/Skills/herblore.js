var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Loading from '../loading.js';

var Herblore = function (_React$Component) {
    _inherits(Herblore, _React$Component);

    function Herblore(props) {
        _classCallCheck(this, Herblore);

        var _this = _possibleConstructorReturn(this, (Herblore.__proto__ || Object.getPrototypeOf(Herblore)).call(this, props));

        _this.state = {
            potions: []
        };
        _this.getPotions = _this.getPotions.bind(_this);

        _this.getPotions();
        return _this;
    }

    _createClass(Herblore, [{
        key: "getPotions",
        value: function getPotions() {
            var _this2 = this;

            fetch(this.props.url).then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log(json);
                _this2.setState({ potions: json });
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.potions.length > 0) {
                return React.createElement(
                    "span",
                    null,
                    "Done. There are ",
                    this.state.potions.length,
                    " Potions."
                );
            } else {
                return React.createElement(Loading, null);
            }
        }
    }]);

    return Herblore;
}(React.Component);

var container = document.getElementById("herblore-container");
var url = container.dataset.url;
ReactDOM.render(React.createElement(Herblore, { url: url }), container);