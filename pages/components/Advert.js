import React from "react"

const Advert = () => {
  return (
    <>
      <div className="ad-div comm-box">
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
      <style jsx>
        {`
                .ad-div{
                    margin-top: .5rem;
                    background: red;
                    height: 100px;
                }
                `
        }
      </style>
    </>
  )
}

export default Advert