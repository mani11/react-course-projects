class MakeDecision extends React.Component {

  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveOption = this.handleRemoveOption.bind(this);
    this.state = {
      options: []
    }
  }

  componentDidMount() {
    console.log("Component did mount");
    try {
      const jsonData = JSON.parse(localStorage.getItem('options'));
      if (jsonData) {
       
        this.setState(() => {
          return {
            options: jsonData
          }
        })
      }
    } catch (e) {

    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update");

    if (prevState.options.length !== this.state.options.length) {
      console.log("Component did mount and state did changed");
      const jsonData = JSON.stringify(this.state.options);
      localStorage.setItem('options', jsonData);
    }

  }
  handleRemoveOption(optionToRemove) {
    this.setState((prevState) => {
      return {
        options: prevState.options.filter(option => option !== optionToRemove)
      }
    })

  }
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      }
    });
  }
  handlePick() {
    const item = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[item]);
  }
  handleAddOption(option) {
    if (!option) {
      return "Enter a valid option";
    }
    else if (this.state.options.indexOf(option) > -1) {
      return "Option already exists";
    }
    this.setState((prevState) => ({ options: prevState.options.concat(option) }))

  }
  render() {
    const title = "Make My Decision";
    const subtitle = "Let the computer decide my day";
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick} />
        <Options
          handleDeleteOptions={this.handleDeleteOptions}
          handleRemoveOption={this.handleRemoveOption}
          options={this.state.options}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>

    );
  }
}
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  )
}
const Action = (props) => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.handlePick}>What Should I Do?</button>
    </div>
  );
}
const Options = (props) => {
  return (

    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      <ol>
        {
          props.options.map((option) => {
            return <Option handleRemoveOption={props.handleRemoveOption} key={option} optionText={option}></Option>;
          })
        }
      </ol>
    </div>

  );

}
const Option = (props) => {
  return (
    <div>
      {<li>{props.optionText}</li>}
      <button onClick={() => {
        props.handleRemoveOption(props.optionText)
      }}
      >
        Remove
      </button>
    </div>

  );
}

class AddOption extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }

  handleAddOption(e) {
    e.preventDefault();
    const value = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(value);
    this.setState(() => ({ error }))

    if(!error){
      e.target.elements.option.value = "";
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option"></input>
          <button>Add Option</button>
        </form>
      </div>
    )
  }

}

ReactDOM.render(<MakeDecision />, document.getElementById("app-root"));