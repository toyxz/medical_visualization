import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import checkAuth from '../../utils/checkAuth';
import {
  Card, Button, Box, Select,Icon
} from '@alifd/next';
import HomePage from '../homePage';
import './index.scss';

class DataList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option1: [],
      option2: [],
      value1: '',
      value2: '',
      classificationDisabled: true,
    }
  }

  componentDidMount() {
    // 获取订单截图
    const {dispatch, user} = this.props;
    const { appData: {userAccount } } = user;
    // 获取订单中已经重建数据的图片
    dispatch({
      type: 'data/getImgData',
      payload: {
        userAccount,
      },
    });
    // 重置stldata
    dispatch({
      type: 'data/setSTLData',
      payload: {
        stlData: [],
      },
    });
    // 获取分类搜索目标项目
    dispatch({
      type: 'data/getClassifyOption',
    });
  }

  componentDidUpdate() {
    // 拿到数据就刷新
    const { data, dispatch } = this.props;
    const {
      appData: {
        stlData,
      },
    } = data;
    if (data && data.appData && data.appData.stlData.length) {
      this.props.history.push('detailInfoShow');
    }
    // 更新分类option和value
  }

  toView(item) {
    const { dispatch } = this.props;
    dispatch({
      type: 'data/getSTL',
      payload: {
        orderNumber: item.order_number,
      },
    });
  }

  handleClassificationChange(option) {
    const { dispatch } = this.props;
     dispatch({
      type: 'data/getClassifyValue',
      payload: {
        classifyOption: option,
      },
     });
     this.setState({
      value1: option,
      classificationDisabled: false,
     });
  }

  handleValueChange(value) {
    const { dispatch } = this.props;
    this.setState({
      value2: value,
    });
  }

  resetClassifyValue() {
    this.setState({
      value2: '',
    });
  }

  getClassfyImgData() {
    const { dispatch } = this.props;
    dispatch({
     type: 'data/getClassfyImgData',
     payload: {
       classifyOption: this.state.value1,
       classifyValue: this.state.value2,
     },
    });
  }
  render() {
    const { data } = this.props;
    const { appData: { imgData, classifyOption, classifyValue } } = data;
    const {option1,option2,value1,value2, classificationDisabled} = this.state;
    return (
      <HomePage>
        <div className="list">
          <div className="classify">
            <Select
              onVisibleChange={()=>this.resetClassifyValue()}
              placeholder="选择分类目标" 
              dataSource={classifyOption} 
              value={value1} 
              onChange={(option) => this.handleClassificationChange(option)} />
            <Select 
              placeholder="选择目的值" 
              dataSource={classifyValue} 
              value={value2} 
              onChange={(value)=>this.handleValueChange(value)} disabled={classificationDisabled}/>
            <Button
              onClick={() => this.getClassfyImgData()}
              type="primary">
              <Icon type="search" />
            </Button>
          </div>
          <div className="list-item">
            {imgData.datas.length ?
                <Box
                spacing={50}
                wrap
                justify="center"
                margin={100}
                direction="row"
              >
                {imgData.datas.length ? 
                  imgData.datas.map((item, index) => {
                    return (
                      <div
                        className="box-180-50"
                        key={index}
                        onClick={() => this.toView(imgData.orders[index])}
                      >
                        <div>{imgData.orders[index].patient_part}</div>
                        <img
                          width='300'
                          height='240'
                          src={item.image.substring(65) }
                        />
                      </div>
                    );
                  }) :''}
              </Box> :
              <div><img width='400' height='400' src="public/static/null_data.png"></img></div>
            }

          </div>
        </div>
      </HomePage>

    );
  }
}

function mapStateToProps(state) {
  return { 
    data: state.data,
    user: state.user,
  };
}
export default withRouter(connect(mapStateToProps)(DataList));