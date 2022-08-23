import React, {useState} from 'react';
import {GrUserManager, GrUserWorker} from 'react-icons/gr'
import {AiOutlineHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import {HiOutlineDocumentReport} from 'react-icons/hi'
import {Profile} from '../../../assets'
import './sidebar.css';

const Sidebar = () => {
    const [actif, setActif] = useState(1);
    const history = useHistory();

    const routes = ["/", "/", "manager", "/reports"]

    const onClickF = (ac)=>{
        setActif(ac)
        history.push(routes[ac -1])
    }
    return (
        <div className="tlrh__sidebar">
            <div className="tlrh__sidebar-title">
                <div className="line"/>
                <h1>TLRH Manager</h1>
            </div>
            <div className="tlrh__sidebar-profile">
                <img src={Profile} alt="profile.png"/>
                <h3>Anas Farhane</h3>
                <h4>Admin</h4>
            </div>
            <div className="tlrh__sidebar-links">
                    {actif === 1? <div id="tlrh__sidebar-links_active"><Link to="/">
                    <AiOutlineHome size={20}/>
                    <p>Home</p> </Link>
                </div>: <div  onClick={()=>onClickF(1)}><Link to="/">
                    <AiOutlineHome size={20}/>
                    <p>Home</p></Link>
                </div>
                }
                {actif === 2 ? (<div id="tlrh__sidebar-links_active" ><Link to="/">
                    <GrUserWorker size={20}/>
                    <p>Collaborateurs</p>
                </Link></div>):(<div onClick={()=>onClickF(2)}>
                    <Link to="/">
                        <GrUserWorker size={20}/>
                        <p>Collaborateurs</p>
                    </Link></div>)
                }
                {actif === 3 ? (<div id="tlrh__sidebar-links_active"><Link to="/manager">
                    <GrUserManager size={20}/>
                    <p>Manageurs RH</p>
                </Link></div>):(<div onClick={()=>onClickF(3)}>
                    <Link to="/manager">
                        <GrUserManager size={20}/>
                        <p>Manageurs RH</p>
                    </Link></div>)
                }
                {actif === 4 ? (<div id="tlrh__sidebar-links_active"> <Link to="/reports"><HiOutlineDocumentReport size={20}/>
                    <p>Report</p>
                </Link></div>) : (<div onClick={()=>onClickF(4)}> <Link to="/reports"><HiOutlineDocumentReport size={20}/>
                    <p>Report</p>
                </Link>
                </div>)
                }
                <div className="tlrh__sidebar-links_bottom">
                    <FiLogOut size={20}/>
                    <p>Log Out</p>
                </div>
            </div>
        </div>

    )
}
export default Sidebar