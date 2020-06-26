import React, {useEffect, useState} from 'react'
import {HomeOutlined, BookOutlined, CoffeeOutlined} from '@ant-design/icons';
import {Row, Col, Menu} from 'antd'
import axios from "axios"
import servicePath from "../../config/config"
import Router from "next/router"

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
    console.log(typeof e.key)
    if (e.key === '0') {
      Router.push('/index')
    } else {
      Router.push(`/ArticleList?id=${e.key}`)
    }
  }
  console.log(typeof navArray)
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <span className="header-logo">
                    <img src="https://chaunceym.github.io/notes/logo.png"/>
                </span>
          <span className="header-text">自由之丘</span>
        </Col>
        <Col className="menu-div" xs={0} sm={0} md={14} lg={13} xl={8}>
          <Menu mode="horizontal" onClick={toList}>
            <Menu.Item key="0">
              首页
            </Menu.Item>
            {
              navArray.map(item => {
                return (
                  <Menu.Item key={item.id} icon={<HomeOutlined/>}>
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
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
}

export default Header