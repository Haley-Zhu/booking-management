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
      selectedSet: {}
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
    })
  }
  isButtonDisable = () => {
    console.log('----IsButtonDisable start----------------');
    const { currentStep, selectedSet} = this.state;
    let disable = true;
    console.log("----IsButtonDisable initail value", disable);
    switch (currentStep) {
      case 0:
        disable = !selectedSet.customerId;
        break;
      case 1:
        disable = !selectedSet.categoryId;
        break;
      case 2:
        disable = !selectedSet.businessId;
        break;
      case 3:
        disable = !selectedSet.customerId;
        break;
      default:
        break;
    }
    console.log('----IsButtonDisable', disable);
    return disable;
  }


  render() {
    const { currentStep, selectedSet } = this.state;
    
    const steps = [
      {
        title: 'Choose Customer',
        content: <ChooseCustomer onSelect={this.handleSelect}/>,
      },
      {
        title: 'Choose Service',
        content: <ChooseCategory onSelect={this.handleSelect}/>,
      },
      {
        title: 'Choose Business',
        content: <ChooseBusiness onSelect={this.handleSelect}/>,
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
            <Button type="primary" disabled={this.isButtonDisable()} onClick={() => this.next()}>
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