import React from 'react';
import {Modal} from 'antd';
import {connect} from 'dva';

const modelName = 'dict';

class EditCategory extends React.PureComponent {

  render() {
    const {visible, data} = this.props;
    return (<Modal
      title="编辑字典类型"
      visible={visible == 1}
      onOk={() => {}}
      onCancel={() => {
        this.props.dispatch({
          type: `${modelName}/cancelCategory`,
        });
      }}
    >
    </Modal>);
  }
}

export default connect(({dict}) => {
  return dict.editCategory;
})(EditCategory);
