import {connect} from 'dva';
import RowContentRoute from './Content/RowContentRoute';
import CellHelp, {DictCategory} from '../components/TableEdit/CellHelp';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
  },
  {
    title: '所属系统',
    dataIndex: 'system',
    categoryId: DictCategory.system,
    editable: CellHelp.dictSelect,
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '触发类型',
    dataIndex: 'triggerType',
    categoryId: DictCategory.jobTriggerType,
    editable: CellHelp.dictSelect,
  },
  {
    title: '周期表达式',
    dataIndex: 'triggerExpression',
  },
  {
    title: '任务类型',
    dataIndex: 'taskType',
    categoryId: DictCategory.jobTaskType,
    editable: CellHelp.dictSelect,
  },
  {
    title: '任务（url|class|msgKey）',
    dataIndex: 'task',
  },
  {
    title: '状态',
    dataIndex: 'status',
    categoryId: DictCategory.jobStatus,
    editable: CellHelp.dictSelect,
  },
  {
    title: '描述',
    dataIndex: 'des',
    width:'200px',
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
    editable: false,
  },];

class Job extends RowContentRoute {
  constructor(props) {
    super(props, 'job', columns);
  }

};

export default connect(({job}) => {
  return job;
})(Job);
