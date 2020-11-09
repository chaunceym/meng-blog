const Footer = () => {
  return (<>
    <div className="footer-div">
      <p>It works on my machine!</p>
      <p><a href="http://www.mengxiangyu.top">mengxiangyu.top</a> | <a href="http://www.beian.miit.gov.cn/">晋ICP备20006602号</a></p>
    </div>
    <style jsx>{`
            .footer-div{
                text-align: center;
                width: 100%;
                padding: 1rem;
                color: #888;
            }
        `}
    </style>
  </>)
}

export default Footer
