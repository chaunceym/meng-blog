import { Avatar, Divider } from 'antd'
import { GithubOutlined, ZhihuOutlined, MailOutlined } from '@ant-design/icons'

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://chaunceym.github.io/notes/logo.png" />
            </div>
            <div className="author-introduction">
                前端萌新
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account" />
                <Avatar size={28} icon={<ZhihuOutlined />} style={{
                    margin: '0 .5rem'
                }}
                    className="account" />
                <Avatar size={28} icon={<MailOutlined />} className="account" />
            </div>
            <style jsx>
                {`
                .author-div{
                    text-align: center;
                    padding: 1rem;
                }
                .author-div div{
                    margin-bottom: 1rem;

                }
                .author-introduction{
                    font-size:.8rem;
                    color: #999;
                }
                .account{
                    margin: 0 .5rem
                }
                `}
            </style>
        </div>
    )
}
export default Author