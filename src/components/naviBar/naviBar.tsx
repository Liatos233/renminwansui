import React, { useEffect, useState } from 'react';
import { Col, Row, Space } from 'antd';
import { HomeOutlined, ReadOutlined, BulbOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './naviBar.module.less';

const NaviBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: 'home', icon: <HomeOutlined />, title: 'Home' },
    { key: 'read', icon: <ReadOutlined />, title: 'Read' },
    { key: 'blog', icon: <BulbOutlined />, title: 'Blog' },
    { key: 'about', icon: <SmileOutlined />, title: 'About' },
  ];

  // 用于高亮导航栏
  const [active, setActive] = useState('home');


  // 点击导航栏时，改变active的值
  const onClickNavi = (e: string) => {
    setActive(e);
    // console.log('active', active);
    navigate(`/${e}`);
  }

  // 在组件挂载时，根据当前路由设置active
  useEffect(() => {
    const path = location.pathname.slice(1); // 去除路径前面的斜杠"/"
    if (path === '') {
      setActive('home');
    } else {
      setActive(path);
    }
  }, [location]);

  return (
    <div className={style.naviBar}>
      <Row className={style.rowMain} gutter={16} justify='center' align='middle'>
        {navItems.map((item) => (
          <Col
            key={item.key}
            className={`${style.colItem} ${active === item.key ? style.colItemActive : ''}`}
            span={6}
            onClick={() => onClickNavi(item.key)}
          >
            <Space direction='vertical' className='spaceBox'>
              <Row justify='center'>
                {React.cloneElement(item.icon, {
                  className: style.naviIcon,
                })}
              </Row>
              <Row>
                <span className={style.naviTitle}>{item.title}</span>
              </Row>
            </Space>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default NaviBar;