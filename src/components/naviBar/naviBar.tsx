import React, { useState } from 'react';
import { Col, Row, Space } from 'antd';
import { HomeTwoTone, BulbTwoTone, SmileTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './naviBar.less';

const NaviBar: React.FC = () => {
  const navigate = useNavigate();

  // 用于高亮导航栏
  const [active, setActive] = useState('home');

  // 点击导航栏时，改变active的值
  const onClickNavi = (e: string) => {
    setActive(e);
    navigate(`/${e}`);
  }

  return (
    <>
      <Row className='rowMain' gutter={16} justify="center" align="middle">
        <Col
          className={`colItem ${active === 'home' ? 'colItemActive' : ''}`}
          span={8}
          onClick={() => onClickNavi('home')}
        >
          <Space direction='vertical' className='spaceBox'>
            <Row justify="center">
              <HomeTwoTone className='naviIcon' twoToneColor={active === 'home' ? '' : '#848484'} />
            </Row>
            <Row>
              <span className='naviTitle'>Home</span>
            </Row>
          </Space>
        </Col>
        <Col
          className={`colItem ${active === 'user' ? 'colItemActive' : ''}`}
          span={8}
          onClick={() => onClickNavi('user')}>
          <Space direction='vertical' className='spaceBox'>
            <Row justify="center">
              <BulbTwoTone className='naviIcon' twoToneColor={active === 'user' ? '' : '#848484'} />
            </Row>
            <Row>
              <span className='naviTitle' >User</span>
            </Row>
          </Space>
        </Col>
        <Col
          className={`colItem ${active === 'about' ? 'colItemActive' : ''}`}
          span={8}
          onClick={() => onClickNavi('about')}>
          <Space direction='vertical' className='spaceBox'>
            <Row justify="center">
              <SmileTwoTone className='naviIcon' twoToneColor={active === 'about' ? '' : '#848484'} />
            </Row>
            <Row>
              <span className='naviTitle' >About</span>
            </Row>
          </Space>
        </Col>
      </Row>
    </>
  )
}

export default NaviBar;