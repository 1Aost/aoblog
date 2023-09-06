import React from 'react'
import MySlider from '../../../components/MySlider';
import "./index.css"
  
const Feeling:React.FC=()=>{
    return (
        <div className='feeling'>
            <div className="feeling-left font-style">
                <div className="top">
                    <div className="avatar"></div>
                    <div className="name">Aoyuru</div>
                </div>
                <div className="content">欢迎大家来到AoBlog！有任何问题可以去留言板留言</div>
            </div>
            <MySlider></MySlider>
        </div>
    )
}
export default Feeling;