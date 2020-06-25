import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { Button } from 'antd'
export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div><Button>我是按钮</Button></div>
    </>
  )
}
