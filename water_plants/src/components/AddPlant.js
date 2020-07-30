import React, {useState, useEffect, useContext} from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import * as Yup from 'yup';
import {axiosWithAuth} from '../utils/axiosWithAuth'

//context
import {UserContext} from '../context/UserContext'

//formSchema
import formSchema from '../validation/addPlantFormSchema';

//styles
import {Errors} from '../styles/AddPlantStyles'

const AddPlant = props => {
    const {userInfo, setPlants, plantList} = useContext(UserContext);
    const {userid} = userInfo;
    const history = useHistory();

    //get context to update plant list on user page 
    const initialFormValues = {
        name: '',
        species: '',
        water_frequency: '',
        image: ''
    }

    const initialErrorValues = {
        name: '',
        species: '',
        water_frequency: ''
    }

    const [formValues, setValues] = useState(initialFormValues);
    const [errorValues, setErrors] = useState(initialErrorValues);
    const [btnDisabled, setDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(formValues).then(valid => {
            setDisabled(!valid);
        })
    }, [formValues])

    const changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        //validate form values with YUP
        Yup
            .reach(formSchema, name)
            .validate(value)
            .then(() => {
                setErrors({
                    ...errorValues,
                    [name]: ''
                })
            })
            .catch(err => {
                setErrors({
                    ...errorValues,
                    [name]: err.errors[0]
                })
            })

        setValues({
            ...formValues,
            [name]: value
        })
    }

    const submitForm = event => {
        event.preventDefault();

        axiosWithAuth()
            .post(`/plants/${userid}`, formValues)
            .then(res => {
                setPlants({
                    ...plantList,
                    formValues
                })
            })
            .catch(err => console.log(err))
            .finally(
                setValues(initialFormValues),
            );
        history.push('/');
    }

    return(
      <div>
        <Errors>
            <p>{errorValues.name}</p>
            <p>{errorValues.species}</p>
            <p>{errorValues.water_frequency}</p>
        </Errors>
        <form onSubmit={submitForm}>
            <label htmlFor='name'>
                Plant name: &nbsp;
                <input 
                    id='name'
                    name='name'
                    type='text'
                    onChange={changeHandler}
                    value={formValues.name}
                />
            </label>
            <label htmlFor="species">
                Plant Species: &nbsp;
                <input 
                    id='species'
                    name='species'
                    type='text'
                    onChange={changeHandler}
                    value={formValues.species}
                />
            </label>
            <label htmlFor='water_frequency'>
                Plant Water Frequency: &nbsp;
                <input 
                    id='water_frequency'
                    name='water_frequency'
                    type='text'
                    onChange={changeHandler}
                    value={formValues.water_frequency}
                />
            </label>
            <button id="submit" disabled={btnDisabled}>Add Plant</button>
        </form>
      </div>
    )
}

export default AddPlant;