import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteComments, getCommentsById } from '../../../services/Comments';
import { LegalToken } from '../../../services/Users';
import { Button, message, Tooltip, Pagination, Space, Tag, Empty } from 'antd';
import { DeleteOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { timestampToTime } from '../../../api/utils';
import "./index.css";
interface CommentsType {
	article_id: number
	article_name: string
	comments: string
	comments_id: number
	comments_reply: string
	comments_status: number
	comments_time: string
	user_id: number
}
interface UserType {
	user: {
		id: number
		username: string
		password: string
		avatar: string
	}
}
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const PageSize: number = 5; // 每页展示的数据条数

const MineComments = () => {
	const [commentsList, setCommentsList] = useState<Array<CommentsType>>([]);
	const { user } = useSelector((store: { user: UserType }) => store.user);
	const [currentPage, setCurrentPage] = useState<number>(1); // 当前页码
	const navigate = useNavigate();
	// 根据当前页码切片获取当前页要展示的数据
	const getCurrentPageData: () => Array<CommentsType> = (): Array<CommentsType> => {
		const startIndex: number = (currentPage - 1) * PageSize;
		const endIndex: number = startIndex + PageSize;
		return commentsList.slice(startIndex, endIndex);
	};
	const fetchComments = () => {
		getCommentsById({ id: user.id }).then(res => {
			if (res.code === '0000') {
				setCommentsList(res.data as Array<CommentsType>);
			} else {
				message.error(res.msg);
			}
		}).catch(_err => {
			message.error("出错了，请联系管理员");
		});
	};

	useEffect(() => {
		const token: string | null = localStorage.getItem("token");
		LegalToken({ token: token }).then(res => {
			// 身份信息过期
			if (res.code === '1111') {
				message.warning(res.msg);
				navigate("/login");
				// localStorage.removeItem("token");
			} else if (res.code === '2222') {
				// 尚未登录
				message.warning(res.msg);
				navigate("/home");
			}
		}).catch(_err => {
			message.error("出错了，请联系管理员");
		});
	}, [navigate]);

	useEffect(() => {
		user.id && fetchComments();
	}, [user]);

	// 删除代码
	const handleDelete = (id: number) => {
		return () => {
			deleteComments({ comments_id: id }).then(res => {
				if (res.code === '0000') {
					message.success(res.msg);
					// 删除成功后重新获取数据
					fetchComments();
				} else {
					message.error(res.msg);
				}
			});
		}
	};

	return (
		<div>
			<ul className='list' style={{ padding: 10 }}>
				{
					commentsList.length > 0 ?
						getCurrentPageData().map((item: CommentsType) => {
							return (
								<li key={item.comments_id}>
									<span className='message'>{item.comments}</span>
									<span className="reply">{item.comments_reply !== '请期待管理员的回复' ? "回复:" + item.comments_reply : <Tag color={"green"}>{item.comments_reply}</Tag>}</span>
									<span className="time">发布时间：{timestampToTime(item.comments_time, true)}</span>
									<Space className='status' size={[0, 8]} wrap>
										<Tag color={"cyan"}>{item.article_name}</Tag>
										{
											item.comments_status === 0 ?
												(
													<Tag icon={<CloseCircleOutlined />} color="error">
														未通过
													</Tag>
												) :
												(
													<Tag icon={<CheckCircleOutlined />} color="success">
														已通过
													</Tag>
												)
										}
									</Space>
									<Tooltip className='delete' title="delete">
										<Button onClick={handleDelete(item.comments_id)} danger shape="circle" icon={<DeleteOutlined />} />
									</Tooltip>
								</li>
							)
						}) : (
							<Empty />
						)
				}
			</ul>
			{commentsList.length > 0 && (
				<Pagination
					defaultCurrent={1}
					total={commentsList.length} // 这里设置总的数据条数
					pageSize={PageSize} // 每页展示的数据条数
					onChange={(page) => setCurrentPage(page)} // 监听页码变化
				/>
			)}
		</div>
	)
}
export default MineComments;