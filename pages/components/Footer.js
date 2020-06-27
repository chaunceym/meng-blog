const Footer = () => {
  return (<>
    <div className="footer-div">
      <p>系统由 React + Node + Ant Design 驱动</p>
      <p>mengxiangyu.top</p>
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