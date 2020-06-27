import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import {Row, Col, List} from 'antd'
import servicePath from "../urlconfig/config"
import axios from "axios"
import Author from './components/Author'
import Header from './components/Header'
import Footer from "./components/Footer"
import Link from "next/link"
import {CalendarOutlined, EyeOutlined, TagOutlined} from "@ant-design/icons"

const ArticleList = (list) => {
  const [myList, setMyList] = useState(list.data)
  useEffect(() => {
    setMyList(list.data)
  })
  return (
    <>
      <Head>
        <title>{myList[0] && myList[0].typeName || '文章列表'}</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname: '/ArticleDetail', query: {id: item.id}}}>
                    <a> {item.title} </a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined/> {item.addTime}</span>
                  <span><TagOutlined/> {item.typeName}</span>
                  <span><EyeOutlined/> {item.view_count}</span>
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
        </Col>
      </Row>
      <Footer/>
      <style jsx>
        {`
                .list-title{
                    font-size:1.3rem;
                    color: #1e90ff;
                    padding: 0 0.5rem;
                }
                .list-context{
                    color:#777;
                    padding:.5rem;
                }
                .list-icon{
                    padding:.5rem 0;
                    color:#AAA;
                }
                .list-icon span{
                    display: inline-block;
                    padding: 0 10px;
                }
                `}
      </style>
    </>
  )
}

ArticleList.getInitialProps = async (context) => {
  const {id} = context.query
  return await new Promise((resolve, reject) => {
    axios(servicePath.getListById + id)
      .then(data => {
        resolve(data.data)
      })
      .catch(err => {
        message.error('文章列表渲染失败, 请稍后尝试')
      })
  })
}
export default ArticleList