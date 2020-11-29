import {Comment, Form, Button, List, Input, message} from 'antd'; 
import moment from 'moment'; 
import {useEffect, useState} from 'react' 
import axios from 'axios'
import servicePath from "../../urlconfig/config" 
const {TextArea} = Input; 
const CommentList = ({comments}) => (<List dataSource={comments} header={`${comments.length} 回复`} itemLayout="horizontal" renderItem={props => <Comment {...props} />} /> ); 
const Editor = ({onChange, onSubmit, submitting, value}) => (
   <> 
      <Form.Item>  
         <TextArea rows={4} onChange={onChange} value={value}/>  
      </Form.Item>  
      <Form.Item>  
         <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary"> 
           添加评论 
         </Button> 
      </Form.Item>   
   </> ); 
const CommentPart = (props) => {  
   const [comments, setComments] = useState([])  
   const [comment, setComment] = useState(null)  
   const [submitting, setSubmitting] = useState(false) 
   const [value, setValue] = useState('')  
   let flag = false   
   useEffect(() => {    
     if (!flag) {  
       axios.get(servicePath.getComments + props.id) 
         .then(data => {  
           const commentData = []  
           data.data.data.forEach(item => {  
             commentData.push({content: item.comment_content,datetime: item.datetime})    
           })   
           setComments(commentData)  
           flag = true
       })  
     }      
     setComment({article_id: props.id,comment_content: value.trim(),datetime: moment().format('YYYY年MM月DD日'),})
   }, [value]) 
   const handleSubmit = () => { 
      if (!value) { return; } 
      setSubmitting(true); 
      if (comment !== null) {   
       axios({     
        url: servicePath.putComment, 
        method: 'post',  
        data: comment,      
       })  
       .then((data) => {   
          if (data.data.message !== '修改成功') {     
            message.error('添加评论失败')     
          }     
       })   
      }  
      setTimeout(() => {     
         setSubmitting(false)  
         setComments([    
           {           
               content: <p>{value.trim()}</p>, 
               datetime: moment().format("YYYY年MM月DD日"),  
           },   
           ...comments,      
         ]) 
         setValue('') 
      }, 1000);  
   }; 
   const handleChange = e => {  
      setValue(e.target.value)  
   };    
   return (     
     <>  
       {comments.length > 0 && <CommentList comments={comments}/>}   
       <Comment content={<Editor onChange={handleChange}
                          onSubmit={handleSubmit} 
                          submitting={submitting} 
                          value={value}/>}
       />  
     </> 
    )
  }  

export default CommentPart
