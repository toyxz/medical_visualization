import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';

import {
  Card, Button, Box,
} from '@alifd/next';
import HomePage from '../homePage';
import './index.scss';

class DataList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    // 拿到数据就刷新
    const { data, dispatch } = this.props;
    const {
      appData: {
        stlData,
      },
    } = data;
    if (data && data.appData && data.appData.stlData) {
      this.props.history.push('detailInfoShow');
    }
  }

  toView(item) {
    const { dispatch } = this.props;
    dispatch({
      type: 'data/getSTL',
      payload: item.id,
    });
  }

  render() {
    return (
      <HomePage>
        <div className="list">
          <div className="list-item">
            <Box
              spacing={50}
              wrap
              justify="center"
              margin={100}
              direction="row"
            >
              { mockData.map((item, index) => {
                return (
                  <div
                    className="box-180-50"
                    key={index}
                    onClick={() => this.toView(item)}
                  >
                    <div>{item.name}</div>
                    <img
                      src={item.img}
                    />
                  </div>
                );
              })}
            </Box>
          </div>
        </div>
      </HomePage>

    );
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}
export default withRouter(connect(mapStateToProps)(DataList));


const mockData = [{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  id: '1',
}, {
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  id: '2',
}, {
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  id: '3',
},
{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  id: '4',
},
{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  id: '5',
},
{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  id: '6',
},
{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  id: '7',
},
{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  id: '8',
},
];
