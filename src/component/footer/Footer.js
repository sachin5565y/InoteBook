import React from 'react';
import './footer.css';
import { FaFacebook } from 'react-icons/fa';
import {FiInstagram} from 'react-icons/fi';
import {IoLogoTwitter} from 'react-icons/io';
const Footer = () => {
  return (
   <footer>
    <a href='#' className='footer_logo' rel='noreferrer'>SachinY</a>

    <ul className='permalinks'>
        <li><a href='/' rel='noreferrer'>Home</a></li>
        <li><a href='/about' rel='noreferrer'>About</a></li>
       

    </ul>

    <div className='footer_socials'>
        <a href='https://facbook.com' target='_blank' rel='noreferrer'><FaFacebook/></a>
        <a href='https://instagram.com'target='_blank' rel='noreferrer'><FiInstagram/></a>
        <a href='https://twitter.com'target='_blank' rel='noreferrer'><IoLogoTwitter/></a>
    </div>
    <div className='footer_copyright'>
      <small>&copy; SachinY. All rights are reserved</small>
    </div>
   </footer>
  )
}

export default Footer