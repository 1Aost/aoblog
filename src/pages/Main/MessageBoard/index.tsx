import React, { useEffect, useState } from 'react';
import { LegalToken } from '../../../services/Users';
import { getReviews, submitReview } from '../../../services/Reviews';
import { Button, Form, Input, Pagination, message } from 'antd';
import { timestampToTime } from '../../../api/utils';
import MySlider from '../../../components/MySlider';
import "./index.css";
// 接口返回评论数据信息
interface ReviewType {
  id: number,
  user_id1: number,
  user_name: string,
  review_time: string,
  review_email: string,
  review_message: string,
  review_reply: string,
  review_status: number,
};
interface FinishType {
  user: UserType,
};
interface UserType {
  review_message: string,
  review_email: string,
};
interface LayoutType {
  labelCol: {
    span: number;
  };
  wrapperCol: {
    span: number;
  }
};

const layout: LayoutType = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages: object = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const PageSize: number = 5; // 每页展示的数据条数
// const {TextArea}=Input;
const MessageBoard = () => {
  // const [articlesList,setArticlesList]=useState([]);
  const [form] = Form.useForm();
  const [reviews, setReviews] = useState<Array<ReviewType>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页码
  // const {articleList}=useSelector((store:any)=>store.article);
  // 根据当前页码切片获取当前页要展示的数据
  const getCurrentPageData: () => Array<ReviewType> = (): Array<ReviewType> => {
    const startIndex: number = (currentPage - 1) * PageSize;
    const endIndex: number = startIndex + PageSize;
    return reviews.slice(startIndex, endIndex);
  };
  const emailPattern = /^[1-9][0-9]{4,10}$/g;

  const fn1 = () => {
    getReviews().then(res => {
      // 判断：当留言的状态为通过的时候，才会展示出来
      const statusData: Array<ReviewType> = (res.data).filter((item: any) => {
        return item.review_status === 1;
      })
      setReviews(statusData);
    }).catch(_err => {
      message.error("出错啦，请联系管理员");
    });
  };

  const onFinish = (values: FinishType) => {
    if (values) {
      const reviews: UserType = values.user;
      if (!emailPattern.test(reviews.review_email)) {
        message.warning("输入的邮箱号格式不正确");
        return;
      }
      LegalToken({ token: localStorage.getItem("token") }).then(() => {
        submitReview({ review_message: reviews.review_message, review_email: reviews.review_email, token: localStorage.getItem("token") })
          .then(res => {
            message.success(res.msg);
            setTimeout(() => {
              message.destroy();
              form.resetFields();
              fn1();
            }, 1000)
          });
      }).catch(_err => {
        message.error("出错了，请稍后重试");
      });
    }
  };

  useEffect(() => {
    fn1();
  }, []);

  return (
    <div className='board'>
      <div className="board-left">
        <div className='card'>
          <div className="card-top">
            <h2>留言板</h2>
          </div>
          <div className="card-content">
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              style={{ maxWidth: 1000, width: 1000 }}
              validateMessages={validateMessages}
              form={form}
            >
              <Form.Item name={['user', 'review_message']} label="评价（不能为空）">
                <Input />
              </Form.Item>
              <Form.Item name={['user', 'review_email']} label="邮箱（不能为空）" rules={[{ type: 'email' }]}>
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  提交留言
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className='card-mess'>
          <div className="card-top">
            <h2>所有留言</h2>
          </div>
          {
            getCurrentPageData().map((review: ReviewType) => {
              return (
                <div key={review.id} className="card-message font-style">
                  <div className="c-content">
                    <div className="cc-1">
                      <div className="cc-title">{review.user_name}</div>
                      <div className="cc-time">{timestampToTime(review.review_time, true)}</div>
                    </div>
                    <div className="cc-2">{review.review_message}</div>
                  </div>
                </div>
              );
            })
          }
        </div>
        <Pagination
          defaultCurrent={1}
          total={reviews.length} // 这里设置总的数据条数
          pageSize={PageSize} // 每页展示的数据条数
          onChange={(page) => setCurrentPage(page)} // 监听页码变化
        />
      </div>
      <MySlider></MySlider>
    </div>
  )
}
export default MessageBoard;