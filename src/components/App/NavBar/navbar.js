import React from "react"
import  './Navbar.css'

const Navbar = (props) => {
    // const helper = this.props.helper
    return (
        <div className='navbar'>
            <a onClick={ () => props.helper('Subs')}>Subs</a>
            <a onClick={ () => props.helper('WatchTime')}>WatchTime</a>
            <a onClick={ () => props.helper('Chat')}>Chat</a>
            <a onClick={ () => props.helper('Bits')}>Bits</a>
        </div>
    )
}

export default Navbar
