import {Button, Card, Form} from 'antd';
import {connect} from 'dva';
import Map from '../../components/Map/Map';
import {phone} from "../../utils/rules";
import {COL_2 as COL, formatMinute, mapPropsToForm, submit} from "../../components/Form/FormHelper";
import TagCheck from '../../components/Form/TagCheck';
import Show from "../../components/Form/Show";
import FNumber from "../../components/Form/FNumber";
import CellDictRender from "../../components/TableEdit/CellDictRender";
import {DictCategory} from "../../components/TableEdit/CellHelp";

const FormItem = Form.Item;

const tags = [
  {value: 'bathing', label: '洗浴中心',},
  {value: 'sauna', label: '桑拿',},
  {value: 'airSystem', label: '新风系统',},
  {value: 'physicalTesting', label: '体能测试',},
  {value: 'chain', label: '连锁经营',},
];

class ShopForm extends React.Component {

  state = {
    basePrice: undefined,
    position: undefined,
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'pubShop/getShopPosition',
      shopId: this.props.values.id,
    }).then(position => {
      this.setState({
        ...this.state,
        position,
      });
    });

  }

  render() {
    const {form, onSubmit, setBasePrice, goBack, values} = this.props, {getFieldDecorator} = form;
    const {status, expectPrice, basePrice} = values;
    this.state.basePrice = basePrice;
    const {position} = this.state;
    const location = position && [position.lng, position.lat];
    return (
      <div>
        <div style={{margin: '16px 0px', textAlign: 'right'}}>
          <span style={{marginRight: '16px'}}/>
          {
            status == 21 ? <Button.Group>
              <Button type='primary' onClick={() => onSubmit(31)}>通过审核</Button>
              <Button type='primary' onClick={() => onSubmit(22)}>拒绝通过</Button>
            </Button.Group> : (status == 32 || status == 41 || status == 42) && <span>
              <span style={{marginRight: '16px'}}>{`期望价：${expectPrice}`}</span>
              <span>基础价：</span><FNumber value={this.state.basePrice} onChange={val => {
              this.state.basePrice = val;
            }}/><Button type='primary' onClick={() => {
              setBasePrice(this.state.basePrice)
            }}>设置</Button>
            </span>
          }
          <Button onClick={goBack}>返回</Button>
        </div>
        <Form layout='inline' onSubmit={(e) => {
          submit(e, form, onSubmit);
        }}>
          <Card bordered={false} title='评估信息'>
            <FormItem label='店铺状态' {...COL}>
              {getFieldDecorator('status')(
                <CellDictRender categoryId={DictCategory.shopStatus}/>
              )}
            </FormItem>
            <FormItem label='当前门店价' {...COL}>
              {getFieldDecorator('price')(
                <Show/>
              )}
            </FormItem>
            <FormItem label='期望门店价' {...COL}>
              {getFieldDecorator('expectPrice')(
                <Show/>
              )}
            </FormItem>
            <FormItem label='基础门店价' {...COL}>
              {getFieldDecorator('basePrice')(
                <Show/>
              )}
            </FormItem>
            <FormItem label='最近评估分数' {...COL}>
              {getFieldDecorator('score')(
                <Show/>
              )}
            </FormItem>
            <FormItem label='最近评估级别' {...COL}>
              {getFieldDecorator('level')(
                <Show/>
              )}
            </FormItem>
            <FormItem label='店铺封面' {...COL}>
              {getFieldDecorator('imgId')(
                <Show/>
              )}
            </FormItem>
            <FormItem label='二维码' {...COL}>
              {getFieldDecorator('matrixCodeId')(
                <Show/>
              )}
            </FormItem>
          </Card>
          <Card title='基本信息' bordered={false}>
            <FormItem label='店铺名称' {...COL}>
              {getFieldDecorator('name')(
                <Show/>
              )}
            </FormItem>
            <FormItem label='电话' {...COL}>
              {getFieldDecorator('tellphone')(
                <Show/>
              )}
            </FormItem>
            <FormItem label='经理姓名' {...COL}>
              {getFieldDecorator('manager')(
                <Show/>
              )}
            </FormItem>
            <FormItem label='经理电话' {...COL}>
              {getFieldDecorator('managerPhone', {
                rules: [phone],
              })(
                <Show/>
              )}
            </FormItem>
            <FormItem label='营业开始时间' {...COL}>
              {getFieldDecorator('businessBegin')(
                <Show format={formatMinute}/>
              )}
            </FormItem>
            <FormItem label='营业结束时间' {...COL}>
              {getFieldDecorator('businessEnd')(
                <Show format={formatMinute}/>
              )}
            </FormItem>
            <FormItem label='占地面积（平米）' {...COL}>
              {getFieldDecorator('area')(
                <Show/>
              )}
            </FormItem>
            <FormItem label='店铺标签' {...COL}>
              {getFieldDecorator('feature')(
                <TagCheck tags={tags} enabled={false}/>
              )}
            </FormItem>
            <FormItem label='地址' {...COL}>
              {getFieldDecorator('address')(
                <Show/>
              )}
            </FormItem>
            <div style={{marginTop: '16px', height: '500px'}}>
              <Map location={location}/>
            </div>
          </Card>
        </Form>
      </div>)
  }
}

export default connect(({pubShop}) => ({pubShop}))(Form.create(mapPropsToForm)(ShopForm));
