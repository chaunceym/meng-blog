import React, {useState} from 'react'
import Head from 'next/head'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import {Affix, Breadcrumb, Col, Row} from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
import ReactMarkdown from "react-markdown"
import {TagOutlined, EyeOutlined, CalendarOutlined} from '@ant-design/icons'
import axios from "axios"

const ArticleDetail = (list) => {
  const [article, setArticle] = useState(list.data[0])
  return (
    <>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{article.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{article.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                {article.title}
              </div>
              <div className="list-icon center">
                <span><CalendarOutlined/>  {article.addTime}</span>
                <span><TagOutlined/>  {article.typeName}</span>
                <span><EyeOutlined/>  {article.view_count}</span>
              </div>
              <div className="detailed-content">
                <ReactMarkdown source={article.article_content} escapeHtml={false} ordered={false}/>
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <MarkNav className="article-menu" source={article.article_content} ordered={false}/>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>
      <style jsx>
        {`
      .bread-div{
          padding: .5rem;
          border-bottom:1px solid #eee;
      }
      .detailed-title{
          font-size: 1.8rem;
          text-align: center;
          padding: 1rem;
      }
      .center{
          text-align: center;
      }
      .center > span{
        padding: 3rem;
      }
      .detailed-content{
          padding: 1.3rem;
          font-size: 1rem;
      }
      code {
          display: block ;
           background-color:#f3f3f3;
           padding: .5rem; 
           overflow-y: auto;
           font-weight: 300;
           font-family: Menlo, monospace;
           border-radius: .3rem;
      }

      .title-anchor{
          color:#888 ;
          padding:4px ;
          margin: 0rem ;
          height: auto ;
          line-height: 1.2rem ;
          font-size: .9rem ;
          border-bottom: 1px dashed #eee;
      }
      .active{
          color:rgb(30, 144, 255);
      }
      .nav-title{
          text-align: center;
          color: #888;
          border-bottom: 1px solid rgb(30, 144, 255);

      }
            `}
      </style>
    </>
  )
}

ArticleDetail.getInitialProps = async (context) => {
  console.log(context)

  const {id} = context.query
  return new Promise((resolve, reject) => {
    axios(`http://localhost:7001/default/getArticleById/${id}`)
      .then(data => {
        resolve(data.data)
        console.log(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default ArticleDetail