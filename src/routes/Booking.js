import {Component} from 'react';
import {connect} from 'dva';

class Booking extends Component {
  render() {
    return (
      <div>
        {JSON.stringify(this.props)}
      </div>
    );
  }

};

export default connect(({booking}) => booking)(Booking);
