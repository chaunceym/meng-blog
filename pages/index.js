import Head from 'next/head'
import React, {useState} from 'react'
import {Row, Col, message, Divider} from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
import Author from './components/Author'
import axios from "axios"
import {List} from "antd"
import ReactMarkdown from "react-markdown"
import 'markdown-navbar/dist/navbar.css'
import Link from "next/link"
import servicePath from "../urlconfig/config"
import {CalendarOutlined, EyeOutlined, TagOutlined} from "@ant-design/icons"

const Home = (list) => {
  const [myList, setMyList] = useState(list.data)
  useState(() => {
    setMyList(list.data)
  })
  return (
    <>
      <Head>
        <title>chauncey的个人博客</title>
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div style={{paddingLeft: '.5rem'}}>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item style={{padding: '.5rem'}}>
                <div className="list-title">
                  <Link href={{pathname: '/ArticleDetail', query: {id: item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined/> {item.addTime}</span>
                  <span style={{margin: '0 1rem'}}><TagOutlined/> {item.typeName}</span>
                  <span><EyeOutlined/> {item.view_count}</span>
                </div>
                <div className="list-context">
                  <ReactMarkdown source={item.introduce} escapeHtml={false} ordered={false}/>
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <div className="comm-box friend-link">
            <Divider>友情链接</Divider>
            <div>
              <a href="https://es6.ruanyifeng.com/">阮一峰的ES6</a>
            </div>
            <div>
              <a href="https://chaunceym.github.io/pointui/">Point UI</a>
            </div>
            <div>
              <a href="https://chaunceym.github.io/clock">土豆烧牛肉</a>
            </div>
            <div>
              <a href="https://chaunceym.github.io/myslide/">My Slide</a>
            </div>
          </div>
        </Col>
      </Row>
      <Footer/>
      <style jsx>
        {`
        .friend-link{
         text-align: center;
         padding: 0 1rem;
        }
         .list-title{
          font-size: 1.3rem;
         }
         .list-icon{
          padding: 1rem 0;
         }
        `}
      </style>
    </>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve, reject) => {
    axios.get(servicePath.getArticleList)
      .then(data => {
        resolve(data.data)
      })
      .catch(err => {
        message.error('文章获取失败,请稍后尝试');
        reject(err)
      })
  })
  return await promise
}
export default Home
