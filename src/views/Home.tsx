import React from 'react';
import { Col, Row, Space } from 'antd';
import { HomeOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import './home.less';

const Home: React.FC = () => {
    return (
        <div className='layout'>
            <div className='content' >
                content
            </div>
            <Row className='bar' gutter={16} justify="center" align="middle">
                <Col className="colItem" span={8}>
                    <Space direction='vertical' className='spaceBox'>
                        <Row justify="center">
                            <HomeOutlined />
                        </Row>
                        <Row>Home</Row>
                    </Space>
                </Col>
                <Col className="colItem" span={8}>
                    <Space direction='vertical' className='spaceBox'>
                        <Row justify="center">
                            <UserOutlined />
                        </Row>
                        <Row>User</Row>
                    </Space>
                </Col>
                <Col className="colItem" span={8}>
                    <Space direction='vertical' className='spaceBox'>
                        <Row justify="center">
                            <SmileOutlined />
                        </Row>
                        <Row>About</Row>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}
export default Home;