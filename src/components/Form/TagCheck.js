import {Tag} from 'antd';

export default class TagCheck extends React.Component {

  initCheckedValues() {
    const {tags, value, filter, checkedVal, notCheckedVal} = this.state;
    const checkedValues = this.state.checkedValues = [];
    tags.map((tag) => {
      if (value[tag.value] == checkedVal) {
        checkedValues.push(tag.value);
      }
    });
  }

  constructor(props) {
    super(props);
    const {tags = [], value = {}, checkedVal = 1, notCheckedVal = 2, labelField = 'label'} = props;
    this.state = {tags, value, checkedVal, notCheckedVal, labelField};
    this.initCheckedValues();
  }

  componentWillReceiveProps(nextProps) {
    this.state.value = nextProps.value || this.state.value;
    this.initCheckedValues();
  }

  handleChange = (tag) => {//tag为变化的数据
    const curIsChecked = this.toogleChecked(tag);
    this.setState({
      ...this.state,
    });
    const {value, checkedVal, notCheckedVal} = this.state;
    value[tag.value] = curIsChecked ? checkedVal : notCheckedVal;
    const {onChange} = this.props;
    if (onChange) {
      onChange({...this.state.value}, {...tag});
    }
  }

  //返回当前是否选中的状态
  toogleChecked = (tag) => {
    const {checkedValues} = this.state, idx = checkedValues.indexOf(tag.value);
    const curIsChecked = idx > -1;
    if (curIsChecked) {
      checkedValues.splice(idx, 1);
    } else {
      checkedValues.push(tag.value);
    }
    return !curIsChecked;
  }

  isChecked = (tag) => {
    return this.state.checkedValues.indexOf(tag.value) > -1;
  }

  render() {
    return <div>
      {
        this.state.tags.map((tag) => {
          const checked = this.isChecked(tag);
          return <Tag key={tag.value} color={checked ? '#108ee9' : '#bfbfbf'} onClick={() => {
            this.handleChange(tag);
          }}>{tag[this.state.labelField]}</Tag>;
        })
      }
    </div>;
  }
}
