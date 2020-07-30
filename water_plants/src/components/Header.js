import React, { useEffect, useState} from 'react';
import { Switch, Link, useHistory} from 'react-router-dom'


export default function Header(props){

const {logout} = props

const history = useHistory()
const [currentURL, setCurrentURL] = useState(history.location.pathname)
const [prevURL, setPrevURL] = useState('')

function refresh(){
    setCurrentURL(history.location.pathname)
    //console.log('refresed')
}

useEffect(() => {
    refresh()
  })

//   [logout]


    return(
        <header>
            <h1>WaterMyPlants</h1>
            <div className='nav-links' onClick={refresh}>
                <a href="https://cranky-hypatia-e034a5.netlify.app/">Home</a>
                {
                    currentURL === '/' && 
                    <Link to='/private/user'>User Profile</Link>
                }  
                {
                    currentURL === '/signin' && 
                    <Link  to='/register'>Register</Link> 
                }
                {
                    currentURL === '/private/user' &&
                    <Link  to='/'>Plant Dashboard</Link>
                }
                {
                    currentURL === '/register' &&
                     <Link to ='/signin'>Sign In</Link>
                }
                <button onClick={() => logout()}>Logout</button>
              
            </div>
        </header>
        
    )
}
