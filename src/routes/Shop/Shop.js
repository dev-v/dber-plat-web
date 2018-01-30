import {connect} from 'dva';
import {PureComponent} from 'react';
import {DictCategory} from '../../components/TableEdit/CellHelp';
import CellDictRender from '../../components/TableEdit/CellDictRender';
import {formatDate} from "../../components/Form/FormHelper";
import RowContent from "../../components/Content/RowContent";
import ShopForm from './ShopForm';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '电话',
    dataIndex: 'tellphone',
  },
  {
    title: '店铺经理',
    dataIndex: 'manager',
  },
  {
    title: '经理电话',
    dataIndex: 'managerPhone',
  },
  {
    title: '最近评分',
    dataIndex: 'score',
  },
  {
    title: '门店价格',
    dataIndex: 'price',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (value) => {
      return <CellDictRender value={value} categoryId={DictCategory.shopStatus}/>;
    },
  },
  {
    title: '创建日期',
    dataIndex: 'createTime',
    render: formatDate,
  },];

class Shop extends PureComponent {
  state = {
    isList: true,
    shop: {},
  }
  query = (page) => {
    return this.props.dispatch({
      type: `shop/query`,
      page: page,
    });
  };

  detail = (shop) => {
    this.setState({
      isList: false,
      shop: {...shop, feature: shop},
    });
  }

  onSubmit = (status) => {
    const data = {...this.state.shop, status, feature: null};
    this.props.dispatch({
      type: 'shop/save',
      data,
    }).then(res => {
      this.state.shop = res;
      this.showList();
    });
  }

  setBasePrice = (basePrice) => {
    const data = {...this.state.shop, basePrice, feature: null};
    this.props.dispatch({
      type: 'shop/setBasePrice',
      data,
    }).then(res => {
      this.state.shop = res;
      this.showList();
    });
  }

  showList = () => {
    this.setState({
      ...this.state,
      isList: true
    });
  }

  render() {
    const {isList, shop} = this.state;
    return (
      isList ? <RowContent
        query={this.query}
        columns={columns}
        operations={[{
          text: '查看处理',
          onClick: this.detail,
        }]}
      /> : <ShopForm
        values={shop}
        onSubmit={this.onSubmit}
        setBasePrice={this.setBasePrice}
        goBack={this.showList}/>);
  };
};

export default connect(({shop}) => ({shop}))(Shop);
