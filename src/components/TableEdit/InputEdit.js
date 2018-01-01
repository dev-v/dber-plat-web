import {Input} from 'antd';
import React from 'react';

export default class InputEdit extends React.Component {
  state = {
    value: '',
  };

  constructor(props) {
    super(props);
    const {value = '', onChange = () => {}} = props;
    this.state.value = value;
    this.onChange = onChange;
  }

  setValue(value) {
    this.setState({value});
    this.onChange(value);
  }

  render() {
    return (<Input {...this.props} value={this.state.value} onChange={(e) => {
      this.setValue(e.target.value);
    }}/>);
  }
};
