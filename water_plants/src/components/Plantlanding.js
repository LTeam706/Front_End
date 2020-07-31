//Hernandez
import React, {useState, useContext, useEffect} from "react";
import Plant from './Plant'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import { Switch, Link, Route } from 'react-router-dom'
import {UserContext} from '../context/UserContext';
import {PlantContext} from '../context/PlantContext';
import styled from 'styled-components';

// export default function Plantlanding(props){
//     const [plants, setPlants] = useState([])

    // axiosWithAuth()
    // .get('https://watermyplantsdatabase.herokuapp.com/myinfo') 
    //     .then(res => {
    //         setPlants(res.data)
    //     })
    //     .catch(err => {
    //         debugger
    //         console.log(err)
    //     }, [])

    // return(
    //     <div className='plant-page'>
    //         <h2> Your Plants!</h2>
    //         <button>
    //             <Link to="/private/addplant">Add Plant</Link>   
    //         </button>
    //         <button>
    //             <Link to="/private/user">Profile</Link>   
    //         </button>

    //         <div className='card-holder'>
    //             {
    //                 plants.map(plant =>
    //                     <Plant plant={plant}/>
    //                 )
    //             }
    //         </div>
            
    //     </div>
    // )

    //context for user

// import {axiosWithAuth} from '../utils/axiosWithAuth'

const StyledDiv = styled.div`
    height: 100rem;
    /* background-color: black; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify */

    h2 {
        width:45%;
        margin: 2%;
        font-size: 6rem;
        border-bottom: 2px solid white;
        /* border-bottom: 2px solid black; */
        background-color: rgba(59, 148, 94, .8); 
    }
    button {
        text-decoration: none;
        background-color: rgba(	0, 191, 255, .9); 
        color: #333333;
        border-top: 1px solid #CCCCCC;
        border-right: 1px solid #333333;
        border-bottom: 1px solid #333333;
        border-left: 1px solid #CCCCCC;
        font-size: 3rem;
        /* width: 15%; */
    }
    div{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 95%;
        margin: 1%;
    }
 
`

export default function Plantlanding(){

    const {userInfo, setUserInfo, setPlants, plantList} = useContext(UserContext);
    const {plants} = userInfo;

    const{setId} = useContext(PlantContext);

    useEffect(() => {
        axiosWithAuth()
        .get('https://watermyplantsdatabase.herokuapp.com/myinfo') 
        .then(res => {
            setUserInfo(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [plantList]);

    return(
        <StyledDiv className='plant-page'>
            <h2> Your Plants!</h2>
             <Link to="/private/addplant"><button>Add Plant </button></Link>
            
            {!plants ? <span></span> : 
                (
            <div>
                {
                    !plants.length ? (<span></span>) : (
                        <div className='card-holder'>
                            {
                             plants.map(plant => <Plant key={plant.plants.plantid} plant={plant.plants} setId={setId}/>)
                            }
                        </div>
                    )
                }
            </div>
                )
            }
        </StyledDiv>
    )
}
