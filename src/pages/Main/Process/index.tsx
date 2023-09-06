import React from 'react'
import { Timeline } from 'antd';
import MySlider from '../../../components/MySlider';
import "./index.css"
const Process:React.FC=()=>{
    return (
        <div className='process'>
            <div className="process-left">
            <Timeline
                mode="alternate"
                pending="进行中..."
                items={[
                    {
                        children: '创建服务站点 2023-07-15',
                    },
                    {
                        children: '初步完成网站制作 2023-08-05',
                        color: 'green',
                    },
                    {
                        children: '优化代码,以及页面展示 2023-08-06',
                        color: 'green',
                    },
                    {
                        color: 'red',
                        children: '修改用户尚存在问题 2023-08-07',
                    },
                ]}
            />
            </div>
            <MySlider></MySlider>
        </div>
    )
}
export default Process;