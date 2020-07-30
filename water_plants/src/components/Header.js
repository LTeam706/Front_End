import React, { useEffect, useState} from 'react';
import { Link, useHistory} from 'react-router-dom'
import styled from 'styled-components'

const StyledHeader = styled.header`
    div{
        display: flex;
        /* justify-content: space-between; */
    }
`
const StyledFull = styled.div`
    display: flex;
    justify-content: space-between;
    height: 35%;
    margin: 0 5% 0 5%;

    Link{
        border: 1px solid black;
    }
    button{
        margin: 0 2% 0 2%;
    }
`

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
        <StyledHeader>
            <h1>Water<span>My</span>Plants</h1>
            <StyledFull>
                <div className='nav-links' onClick={refresh}>
                    {/* <Link to="/">Home</Link> */}
                    <button><Link to="/">Home</Link></button>
                    {
                        currentURL === '/' && 
                        // <Link to='/private/user'>User Profile</Link>
                        <button><Link to='/private/user'>User Profile</Link></button>
                    }  
                    {
                        currentURL === '/signin' && 
                        // <Link  to='/register'>Register</Link> 
                        <button><Link  to='/register'>Register</Link> </button>
                    }
                    {
                        currentURL === '/private/user' &&
                        // <Link  to='/'>Plant Dashboard</Link>
                        <button><Link  to='/'>Plant Dashboard</Link></button>
                    }
                    {
                        currentURL === '/register' &&
                        // <Link to ='/signin'>Sign In</Link>
                        <button><Link to ='/signin'>Sign In</Link></button>
                    }
                </div>
                <button onClick={() => logout()}>Logout</button>

            </StyledFull>
           
        </StyledHeader>
        
    )
}


