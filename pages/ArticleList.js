import React, {useState} from 'react'
import Head from 'next/head'
import {Row, Col, List, Breadcrumb} from 'antd'
import servicePath from "../config/config"
import axios from "axios"
import Author from './components/Author'
import Header from './components/Header'
import Footer from "./components/Footer"

const ArticleList = (list) => {
  const [myList, setMyList] = useState(list.data)
  console.log(myList)
  return (
    <>
      <Head>
        <title>List</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                文章列表
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List header={<div>最新日志</div>}
                itemLayout="vertical"
                dataSource={myList}
                renderItem={item => (
                  <List.Item>
                    <div className="list-title">{item.title}</div>
                    <div className="list-icon">
                      <span> {item.addTime} </span>
                      <span> {item.typeName} </span>
                      <span> {item.view_count} </span>
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
        console.log(err)
        message.error('获取文章列表失败, 请稍后尝试')
      })
  })
}
export default ArticleList