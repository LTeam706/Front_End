//Hernandez
import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {UserContext} from '../context/UserContext';
import {PlantContext} from '../context/PlantContext';
import styled from 'styled-components';

export default function Plant(props){

    const StyledCard = styled.div`
    /* margin: .5%; */
    width: 85%;
    border-radius: 1%;
    background-color: rgba(59, 148, 94, .8); 
    color: white;
    text-align: left;

    h3{
        text-align: center;
        font-size: 5rem;
        /* width: 100%; */
        margin: 1% 1% 1% 1%;
        border-bottom: 2px solid white;

    }
    p{
        width: 33%;
        display: flex;
        justify-content: space-between;
        font-size: 3rem;
        margin:1%;
    }
   
`
const ButtonDiv = styled.div`
        display: flex;
        flex-direction: row;
        button{
            width: 33%;
            margin: .5%;
        }
      
        /* font-size: 3rem; */
        /* width: 100%; */
        /* margin: 0 2% 0 2%; */
    }
`





    const {plantList, setPlants} = useContext(UserContext);
    const {plantId, setId} = useContext(PlantContext);
    // ,may need to add prop for img from API
    const {plant} = props
    const {plantid, name, water_frequency, species} = plant;
    const history = useHistory();

    const deletePlant = () => {
        axiosWithAuth()
            .delete(`/plants/${plantid}`)
            .then(res => {
                getData();
                history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getData = () => {
        axiosWithAuth()
            .get('https://watermyplantsdatabase.herokuapp.com/myinfo') 
            .then(res => {
                setPlants(res.data.plants);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const editPlant = () => {
        setId(plantid);
        history.push(`/private/editplant`);
    }

    return(
        <StyledCard className='plant-card'>
            <h3>{name}</h3>
            {/* possibly img from API based on species */}
            <div className='plant-details'>
                {/* <p>{plant.id}</p> */}
                <p><span>Species:</span>{species}</p>
                <p><span>Water:</span>{water_frequency}</p>
                {/* <p>{plant.lwd}</p> */}
            </div>
            <ButtonDiv>
                <button onClick={() => editPlant()}>Edit</button>
                <button onClick={() => deletePlant()}>Delete</button>
            </ButtonDiv>
           
        </StyledCard>
    )
        
}
