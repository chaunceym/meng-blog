import React from 'react'
import { HomeOutlined, BookOutlined, CoffeeOutlined } from '@ant-design/icons';


import { Row, Col, Menu, Icon } from 'antd'

const Header = () => (
    <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">
                    <img src="https://chaunceym.github.io/notes/logo.png" />
                </span>
                <span className="header-text">自由之丘</span>
            </Col>
            <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal">
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        首页
                    </Menu.Item>
                    <Menu.Item key="video" icon={<BookOutlined />}>
                        视频
                    </Menu.Item>
                    <Menu.Item key="life" icon={<CoffeeOutlined />}>
                        生活
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>

        <style jsx>{`
        .header{
            background: #fff;
            padding-top: .5rem;
        }
        .header-logo img{
            width: 3rem;
        }
        .header-text{
            font-size: .3rem;
            display: inline-block;
        }
`}</style>
    </div>
)
export default Header