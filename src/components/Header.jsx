import React from 'react'
import "./header.css";
import Logo from '../assets/logo.png'
import Åssiden from '../assets/åssiden-logo.png'
import Virinco from '../assets/virinco-logo.png'
import Drammen from '../assets/drammen-kommune-logo.png';


const Header = () => {
  return (
    <div>
        <header className='header'>
            <nav className='navigation container'>
                <img className="logo" src={Logo}/>
                <div className="logo_links">
                  <img className='image' src={Åssiden} />
                  <img className='image_second' src={Virinco} />
                  <img className='image_third' src={Drammen}/>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Header
