import Head from 'next/head'
import React, {useState} from 'react'
import {Row, Col} from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
import Author from './components/Author'
import axios from "axios"
import {List} from "antd"
import Link from "next/link"

const Home = (list) => {
  console.log(list)
  const [myList, setMyList] = useState(list.data)
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname: '/ArticleDetail', query: {id: item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>{item.addTime}</span>
                  <span>{item.typeName}</span>
                  <span>{item.view_count}人</span>
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
    </>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve, reject) => {
    axios.get('http://127.0.0.1:7001/default/getArticleList')
      .then(data => {
        resolve(data.data)
      })
      .catch(err => {
        reject(err)
      })
  })
  return await promise
}
export default Home
