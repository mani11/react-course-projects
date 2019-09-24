"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MakeDecision = function (_React$Component) {
  _inherits(MakeDecision, _React$Component);

  function MakeDecision(props) {
    _classCallCheck(this, MakeDecision);

    var _this = _possibleConstructorReturn(this, (MakeDecision.__proto__ || Object.getPrototypeOf(MakeDecision)).call(this, props));

    _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);
    _this.handleRemoveOption = _this.handleRemoveOption.bind(_this);
    _this.state = {
      options: []
    };
    return _this;
  }

  _createClass(MakeDecision, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("Component did mount");
      try {
        var jsonData = JSON.parse(localStorage.getItem('options'));
        if (jsonData) {

          this.setState(function () {
            return {
              options: jsonData
            };
          });
        }
      } catch (e) {}
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      console.log("Component did update");

      if (prevState.options.length !== this.state.options.length) {
        console.log("Component did mount and state did changed");
        var jsonData = JSON.stringify(this.state.options);
        localStorage.setItem('options', jsonData);
      }
    }
  }, {
    key: "handleRemoveOption",
    value: function handleRemoveOption(optionToRemove) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (option) {
            return option !== optionToRemove;
          })
        };
      });
    }
  }, {
    key: "handleDeleteOptions",
    value: function handleDeleteOptions() {
      this.setState(function () {
        return {
          options: []
        };
      });
    }
  }, {
    key: "handlePick",
    value: function handlePick() {
      var item = Math.floor(Math.random() * this.state.options.length);
      alert(this.state.options[item]);
    }
  }, {
    key: "handleAddOption",
    value: function handleAddOption(option) {
      if (!option) {
        return "Enter a valid option";
      } else if (this.state.options.indexOf(option) > -1) {
        return "Option already exists";
      }
      this.setState(function (prevState) {
        return { options: prevState.options.concat(option) };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var title = "Make My Decision";
      var subtitle = "Let the computer decide my day";
      return React.createElement(
        "div",
        null,
        React.createElement(Header, { title: title, subtitle: subtitle }),
        React.createElement(Action, {
          hasOptions: this.state.options.length > 0,
          handlePick: this.handlePick }),
        React.createElement(Options, {
          handleDeleteOptions: this.handleDeleteOptions,
          handleRemoveOption: this.handleRemoveOption,
          options: this.state.options
        }),
        React.createElement(AddOption, {
          handleAddOption: this.handleAddOption
        })
      );
    }
  }]);

  return MakeDecision;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      props.title
    ),
    React.createElement(
      "h2",
      null,
      props.subtitle
    )
  );
};
var Action = function Action(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { disabled: !props.hasOptions, onClick: props.handlePick },
      "What Should I Do?"
    )
  );
};
var Options = function Options(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: props.handleDeleteOptions },
      "Remove All"
    ),
    React.createElement(
      "ol",
      null,
      props.options.map(function (option) {
        return React.createElement(Option, { handleRemoveOption: props.handleRemoveOption, key: option, optionText: option });
      })
    )
  );
};
var Option = function Option(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "li",
      null,
      props.optionText
    ),
    React.createElement(
      "button",
      { onClick: function onClick() {
          props.handleRemoveOption(props.optionText);
        }
      },
      "Remove"
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: "handleAddOption",
    value: function handleAddOption(e) {
      e.preventDefault();
      var value = e.target.elements.option.value.trim();
      var error = this.props.handleAddOption(value);
      this.setState(function () {
        return { error: error };
      });

      if (!error) {
        e.target.elements.option.value = "";
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.state.error && React.createElement(
          "p",
          null,
          this.state.error
        ),
        React.createElement(
          "form",
          { onSubmit: this.handleAddOption },
          React.createElement("input", { type: "text", name: "option" }),
          React.createElement(
            "button",
            null,
            "Add Option"
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(MakeDecision, null), document.getElementById("app-root"));
