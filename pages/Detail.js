import React from 'react'
import Head from 'next/head'
import { Row, Col } from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
const Detailed = () => (
    <>
        <Head>
            <title>Detailed</title>
        </Head>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                <div>
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                            <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div>
                        <div className="detailed-title">
                            React实战视频教程-技术胖Blog开发(更新08集)
                        </div>

                        <div className="list-icon center">
                            <span>2019-06-28</span>
                            <span>视频教程</span>
                            <span>5498人</span>
                        </div>

                        <div className="detailed-content" >
                            详细内容，下节课编写
                        </div>

                    </div>

                </div>
            </Col>

            <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                <Author />
                <Advert />
            </Col>
        </Row>
        <Footer />
        <style jsx>
            {`
            .bread-div{
    padding: .5rem;
    border-bottom:1px solid #eee;
    background-color: #e1f0ff;
}
.detailed-title{
    font-size: 1.8rem;
    text-align: center;
    padding: 1rem;
}
.center{
    text-align: center;
}
.detailed-content{
    padding: 1.3rem;
    font-size: 1rem;
}
code {
    display: block ;
     background-color:#f3f3f3;
     padding: .5rem !important;
     overflow-y: auto;
     font-weight: 300;
     font-family: Menlo, monospace;
     border-radius: .3rem;
}

.title-anchor{
    color:#888 !important;
    padding:4px !important;
    margin: 0rem !important;
    height: auto !important;
    line-height: 1.2rem !important;
    font-size: .9rem !important;
    border-bottom: 1px dashed #eee;
}
.active{
    color:rgb(30, 144, 255) !important;
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

export default Detailed