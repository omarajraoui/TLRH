import React from 'react';

import {IoCaretBackCircleOutline} from 'react-icons/io5'
import {BsBell} from 'react-icons/bs'
import './header.css';

const Header = () =>{
    return (
        <div className="tlrh__header">
            <IoCaretBackCircleOutline size="20px"/>
            <div className="tlrh__header_right">
                <div className="tlrh__header_right-search">
                    <input type="text" placeholder="Search"/>
                </div>
                <BsBell size="20px"/>
            </div>
        </div>

    )
}
export default Header