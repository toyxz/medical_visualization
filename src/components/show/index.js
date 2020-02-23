/* jshint esversion: 6 */
import React from 'react';
import { Nav, Radio } from '@alifd/next';

const { Item, SubNav } = Nav;

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openMode: 'single',
    };
  }


  setValue(openMode) {
    this.setState({
      openMode,
    });
  }

  render() {
    const { openMode } = this.state;

    return (
      <div>
        <div className="demo-ctl">
          <Radio.Group shape="button" size="medium" value={openMode} onChange={this.setValue.bind(this)}>
            <Radio value="single">单选</Radio>
            <Radio value="multiple">openMode=multiple</Radio>
          </Radio.Group>
        </div>
        <Nav style={{ width: 240 }} openMode={openMode}>
          <SubNav label="Sub Nav 1">
            <Item>Item 1</Item>
          </SubNav>
          <SubNav label="Sub Nav 2">
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <SubNav label="Sub Nav 1">
              <Item>Item 1</Item>
              <Item>Item 2</Item>
            </SubNav>
            <SubNav label="Sub Nav 2">
              <Item>Item 1</Item>
              <Item>Item 2</Item>
            </SubNav>
          </SubNav>
          <SubNav label="Sub Nav 3">
            <Item>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
            <SubNav label="Sub Nav 1">
              <Item>Item 1</Item>
              <Item>Item 2</Item>
              <Item>Item 3</Item>
            </SubNav>
            <SubNav label="Sub Nav 2">
              <Item>Item 1</Item>
              <Item>Item 2</Item>
              <Item>Item 3</Item>
            </SubNav>
            <SubNav label="Sub Nav 3">
              <Item>Item 1</Item>
              <Item>Item 2</Item>
              <Item>Item 3</Item>
            </SubNav>
          </SubNav>
        </Nav>
      </div>
    );
  }
}

export default Show;
