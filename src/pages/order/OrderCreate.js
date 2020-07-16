import React, { Component } from 'react';
import { Steps, Button, Card } from 'antd';
import ChooseCustomer from './ChooseCustomer';
import ChooseBusiness from './ChooseBusiness';
import ChooseCategory from './ChooseCategory';
import BookFinished from './BookFinished';
const { Step } = Steps;

class OrderCreate extends Component {
  constructor() {
    super();
    this.state = {
      currentStep: 0,
      selectedSet: {},
      nextBtnDisable: true
    }
  }

  next() {
    const currentStep = this.state.currentStep + 1;
    this.setState({ currentStep });
  }

  prev() {
    const currentStep = this.state.currentStep - 1;
    this.setState({ currentStep });
  }
  handleSelect = (value) => {
    console.log('----handleSelect', value);
    const { selectedSet } = this.state;
    this.setState({
      selectedSet: {
        ...selectedSet,
        ...value
      }
    }, () => {console.log('----handleSelect, callback selectedSet: ', this.state.selectedSet);})
    console.log('----handleSelect, NOT selectedSet: ', this.state.selectedSet);
  }
  isButtonDisable = (isDisable) => {
    this.setState({
      nextBtnDisable: isDisable
    })
  }


  render() {
    const { currentStep, selectedSet, nextBtnDisable } = this.state;
    
    const steps = [
      {
        title: 'Choose Customer',
        content: <ChooseCustomer onSelect={this.handleSelect} isButtonDisable={this.isButtonDisable} />,
      },
      {
        title: 'Choose Service',
        content: <ChooseCategory onSelect={this.handleSelect} isButtonDisable={this.isButtonDisable}/>,
      },
      {
        title: 'Choose Business',
        content: <ChooseBusiness onSelect={this.handleSelect} isButtonDisable={this.isButtonDisable} selectedSet={selectedSet}/>,
      },
      {
        title: 'Confirm Order',
        content: <BookFinished />,
      },
    ];
    console.log('render again')
    return(
      <Card>
        <Steps size='small' current={currentStep}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[currentStep].content}</div>
        <div className="steps-action">
          {currentStep < steps.length - 1 && (
            <Button type="primary" disabled={nextBtnDisable} onClick={() => this.next()}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={() => console.log('Processing complete!')}>
              Done
            </Button>
          )}
          {currentStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </Card>
    )
  }
}

export default OrderCreate;