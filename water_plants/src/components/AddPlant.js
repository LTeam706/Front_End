import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import {axiosWithAuth} from '../utils/axiosWithAuth'

//context
import {UserContext} from '../context/UserContext'

//formSchema
import formSchema from '../validation/addPlantFormSchema';

//styles
import {
    Errors, OuterDiv, StyledForm, StyledBtn, StyledInput, StyledLabel, StyledTitle
} from '../styles/AddPlantStyles';

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
      <OuterDiv>
        <StyledForm onSubmit={submitForm}>
            <StyledTitle>Add A Plant</StyledTitle>
            <Errors>
                <p>{errorValues.name}</p>
                <p>{errorValues.species}</p>
                <p>{errorValues.water_frequency}</p>
            </Errors>
            <StyledLabel htmlFor='name'>
                Plant name: &nbsp;
                <StyledInput 
                    id='name'
                    name='name'
                    type='text'
                    onChange={changeHandler}
                    value={formValues.name}
                />
            </StyledLabel>
            <StyledLabel htmlFor="species">
                Plant Species: &nbsp;
                <StyledInput 
                    id='species'
                    name='species'
                    type='text'
                    onChange={changeHandler}
                    value={formValues.species}
                />
            </StyledLabel>
            <StyledLabel htmlFor='water_frequency'>
                Plant Water Frequency: &nbsp;
                <StyledInput 
                    id='water_frequency'
                    name='water_frequency'
                    type='text'
                    onChange={changeHandler}
                    value={formValues.water_frequency}
                />
            </StyledLabel>
            <StyledBtn id="submit" disabled={btnDisabled}>Add Plant</StyledBtn>
        </StyledForm>
      </OuterDiv>
    )
}

export default AddPlant;