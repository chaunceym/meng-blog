import React, {useEffect, useState} from 'react'
import {Row, Col, Menu} from 'antd'
import axios from "axios"
import servicePath from "../../urlconfig/config"
import Router from "next/router"
import {MenuFoldOutlined} from '@ant-design/icons'

const Header = () => {
  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo)
      setNavArray(result.data.data)
    }
    fetchData()
  }, [])
  const toList = (e) => {
    if (e.key === '0') {
      Router.push('/index')
    } else {
      Router.push(`/ArticleList?id=${e.key}`)
    }
  }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={20} sm={20} md={10} lg={10} xl={8}>
                <span className="header-logo">
                    <img src="https://chaunceym.gitee.io/notes/logo.png"/>
                </span>
          <span className="header-text">chauncey的个人博客</span>
        </Col>
        <Col className="menu-div" xs={2} sm={2} md={13} lg={13} xl={10}>
          <Menu mode="horizontal" overflowedIndicator={<MenuFoldOutlined/>} onClick={toList}>
            <Menu.Item key="0">
              首页
            </Menu.Item>
            {
              navArray.map(item => {
                return (
                  <Menu.Item key={item.id}>
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>

      <style jsx>{`
        .menu-div{
          text-align: right;
        }
        .header{
            background: #fff;
            padding-top: .5rem;
        }
        .header-logo img{
            width: 3rem;
        }
        .header-text{
            font-size: .3rem;
            vertical-align: bottom; 
            display: inline-block;
            padding-left: .3rem;
        }
`}</style>
    </div>
  )
}

export default Header
