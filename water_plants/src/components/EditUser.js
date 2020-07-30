
import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import {axiosWithAuth} from '../utils/axiosWithAuth';

//context
import {UserContext} from '../context/UserContext';

//form schema
import userSchema from '../validation/userSchema';

//styles
import {
    Errors, StyledLabel, StyledBtn, StyledForm, StyledInput, StyledTitle
} from '../styles/AddPlantStyles'

const EditUser = () => {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const history = useHistory();

    const initialFormErrors = {
            username: '',
            firstname: '',
            lastname: '',
            primaryemail: '',
            phone: ''
    }

    const iniitalFormValues = {
        username: userInfo.username,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        primaryemail: userInfo.primaryemail,
        phone: userInfo.phone
    }

    const [formValues, setValues] = useState(iniitalFormValues);
    const [formErrors, setErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        userSchema.isValid(formValues).then(valid => {
            setDisabled(!valid);
        })
    }, [formValues])

    const changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        Yup 
            .reach(userSchema, name)
            .validate(value)
            .then(() => {
                setErrors({
                    ...formErrors,
                    [name]: ''
                })
            })
            .catch(err => {
                setErrors({
                    ...formErrors,
                    [name]: err.errors[0]
                })
            })

        setValues({
            ...formValues,
            [name]: value
        })

        setUserInfo({
            ...userInfo,
            [name]: value
        })

    }

    const submitForm = event => {
        event.preventDefault();

        axiosWithAuth()
            .put(`user/${userInfo.userid}`, userInfo)
            .then(res => {
                console.log(res);
                history.push('/private/user');
            })
            .catch(err => console.log(err))
    }
    return(
        <div>
            <Errors>
                <p>{formErrors.username}</p>
                <p>{formErrors.firstname}</p>
                <p>{formErrors.lastname}</p>
                <p>{formErrors.primaryemail}</p>
                <p>{formErrors.phone}</p>
            </Errors>
            <StyledForm onSubmit={submitForm}>
                <StyledLabel htmlFor="editUsername">
                    Username: &nbsp;
                    <StyledInput 
                        id="editUsername"
                        name="username"
                        type="text"
                        onChange={changeHandler}
                        value={formValues.username}
                    />
                </StyledLabel>
                <StyledLabel htmlFor="editFirt">
                    First Name: &nbsp;
                    <StyledInput 
                        id="editFirst"
                        name="firstname"
                        type="text"
                        onChange={changeHandler}
                        value={formValues.firstname}
                    />
                </StyledLabel>
                <StyledLabel htmlFor="editLast">
                    Last Name: &nbsp;
                    <StyledInput 
                        id="editLast"
                        name="lastname"
                        type="text"
                        onChange={changeHandler}
                        value={formValues.lastname} 
                    />
                </StyledLabel>
                <StyledLabel htmlFor="editEmail">
                    Email: &nbsp;
                    <StyledInput 
                        id="editEmail"
                        name="primaryemail"
                        type="primaryemail"
                        onChange={changeHandler}
                        value={formValues.primaryemail}
                    />
                </StyledLabel>
                <StyledLabel htmlFor="editPhone">
                    Phone: &nbsp;
                    <StyledInput 
                        id="editPhone"
                        name="phone"
                        type="text"
                        onChange={changeHandler}
                        value={formValues.phone} 
                    />
                </StyledLabel>
                <StyledBtn id="editUserBtn" disabled={disabled}>Edit Information</StyledBtn>
            </StyledForm>
        </div>
    )
}

export default EditUser;
