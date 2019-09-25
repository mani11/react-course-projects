
import React from 'react';

import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';

import OptionModal from './OptionModal';

class MakeDecision extends React.Component {

  state = {
    options: [],
    selectedOption: undefined
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
  handleRemoveSelection = () => {
    this.setState(() => {
      return {
        selectedOption: undefined
      }
    })
  };
  handleRemoveOption = (optionToRemove) => {
    this.setState((prevState) => {
      return {
        options: prevState.options.filter(option => option !== optionToRemove)
      }
    })

  };
  handleDeleteOptions = () => {
    this.setState(() => {
      return {
        options: []
      }
    });
  };
  handlePick = () => {
    const item = Math.floor(Math.random() * this.state.options.length);
    this.setState(() => {
      return {
        selectedOption: this.state.options[item]
      }
    })
  };
  handleAddOption = (option) => {
    if (!option) {
      return "Enter a valid option";
    }
    else if (this.state.options.indexOf(option) > -1) {
      return "Option already exists";
    }
    this.setState((prevState) => ({ options: prevState.options.concat(option) }))

  };
  render() {
    const title = "Make My Decision";
    const subtitle = "Let the computer decide my day";
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick} />
          <div className="widget">
            <Options
              handleDeleteOptions={this.handleDeleteOptions}
              handleRemoveOption={this.handleRemoveOption}
              options={this.state.options}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleRemoveSelection={this.handleRemoveSelection}
        />
      </div>
    );
  }
}

export default MakeDecision;