import React from 'react';
import {
  Card, Button, Box,
} from '@alifd/next';
import HomePage from '../homePage';
import './index.scss';

class DataList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HomePage className="data-wrapper">
        <Box
          spacing={200}
          wrap="true"
          direction="row"
          style={{ padding: '100px' }}
        >
          { mockData.map((item) => {
            return (
              <Card
                free
                style={{ width: '200px' }}
              >
                <Card.Media style={{ width: '100', height: '100' }}>
                  <img src={item.img} />
                </Card.Media>
                <Card.Header
                  title={item.title}
                  extra={[
                    <Button type="primary" key="action1" text>查看</Button>,
                  ]}
                />
                <Card.Content>
                  { item.discribtion }
                </Card.Content>
              </Card>
            );
          })}

        </Box>
      </HomePage>
    );
  }
}

export default DataList;


const mockData = [{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  title: 'Title',
  discribtion: 'Ne petentium quaerendum nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus. Ius feugiat pertinacia an, cu verterem praesent quo.',
}, {
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  discribtion: 'Ne petentium quaerendum nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus. Ius feugiat pertinacia an, cu verterem praesent quo.',
}, {
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  discribtion: 'Ne petentium quaerendum nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus. Ius feugiat pertinacia an, cu verterem praesent quo.',
},
{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  discribtion: 'Ne petentium quaerendum nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus. Ius feugiat pertinacia an, cu verterem praesent quo.',
},
{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  discribtion: 'Ne petentium quaerendum nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus. Ius feugiat pertinacia an, cu verterem praesent quo.',
},
{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  discribtion: 'Ne petentium quaerendum nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus. Ius feugiat pertinacia an, cu verterem praesent quo.',
},
{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  discribtion: 'Ne petentium quaerendum nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus. Ius feugiat pertinacia an, cu verterem praesent quo.',
},
{
  img: 'https://img.alicdn.com/tfs/TB1FNIOSFXXXXaWXXXXXXXXXXXX-260-188.png',
  name: 'Title',
  discribtion: 'Ne petentium quaerendum nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus. Ius feugiat pertinacia an, cu verterem praesent quo.',
},
];
