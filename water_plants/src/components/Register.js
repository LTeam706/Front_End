//Hernandez
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";

const RegDiv = styled.div`
height: 100rem;
margin: 5% 5% 5% 5%;
display: flex;
flex-direction: column;
justify-content: center;
/* align-items: center; */
background-color:  #3B945E;
/* background: a(.1) */
background-color: rgba(59, 148, 94, .8); 
/* background-color: white; */
border-radius: 2%;

span{
  color: deepskyblue
}
h2 {
  margin: 2%;
  font-size: 6rem;
  border-bottom: 2px solid white;
}

h2:hover{
  
}
form {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* align-items: baseline; */
}

button{
  width: 55%;
  height: 12%;
  border-radius: 5%;
  font-size:3rem;
}

label{
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 5rem;
  padding: 0 5% 0 5%;
}
input{
  height: 55%;
  width: 45%;
}

@media(max-width:1130px){
    form{
      height: 
      flex-direction: row;
    }
    label{
      flex-direction: column;
      align-items: center;
      
    }
    button{
      width: 75%;
    }
}

@media(max-width:600px){
    label{
      font-size:4rem;
    }
    button{
      width: 85%;
      font-size: 2rem;
    }
}
`;

const initialFormValues = {
  firstname: "",
  lastname: "",
  primaryemail: "",
  username: "",
  password: "",
  phone: "",
};

const initialFormErrors = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  phone: "",
};

// const initialUser = []
const initialDisabled = true;

export default function Register(props) {
  // Props passed in from apps for use in page functions

  const { history } = props;

  // const [user, setUser] = useState(initialUser)
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const formSchema = yup.object().shape({
    firstname: yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .required("First Name is Required"),
    lastname: yup.string().min(4, "Last Name must be at least 4 characters"),
    primaryemail: yup
      .string()
      .required()
      .min(8, "E-mail must be at least 8 characters"),
    username: yup
      .string()
      .required()
      .min(5, "Username must be at least 5 characters"),
    password: yup
      .string()
      .required("Password is Required")
      .min(8, "Password must contain at least 8 characters"),
    phone: yup
      .string()
      .required("Phone Number is Required")
      .min(10, "Phone Number must contain 10 characters"),
    // .max((10, 'Phone Number must contain 10 characters'))
  });

  // prevents page from reloading & calls submit function from App.js
  const postNewUser = (newUser) => {
    axios
      .post(
        "https://watermyplantsdatabase.herokuapp.com/createnewuser",
        newUser,
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
      })
      .catch((err) => {
        // const
        debugger;
      })
      .finally(setFormValues(initialFormValues), history.push("/"));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };
  const submit = () => {
    const newUser = {
      firstname: formValues.firstname.trim(),
      lastname: formValues.lastname.trim(),
      primaryemail: formValues.primaryemail.trim(),
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      phone: formValues.phone.trim(),
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  // pulls name and value from event target. Passthrough to inputChange
  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    inputChange(name, value);
  };
  // second half of input change
  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })

      .catch((err) => {
        console.log(name);
        setFormErrors({
          ...formErrors,
          [name]: err.errors,
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // build elements for form/ inputs for first name, last name, email, phone number, and password
  return (
    <RegDiv className="registration" onSubmit={onSubmit}>
      <h2>
        Join Water<span>My</span>Plants Today!
      </h2>
      <div className="errors-container">
        <div>{formErrors.firstname}</div>
        <div>{formErrors.lastname}</div>
        <div>{formErrors.email}</div>
        <div>{formErrors.phone}</div>
        <div>{formErrors.password}</div>
        {/* <div>{Email already taken}</div> */}
      </div>

      <form>
        <label>
          First Name
          <input
            value={formValues.firstname}
            onChange={onInputChange} // checkes
            placeholder="First Name"
            maxLength="14"
            name="firstname"
            type="text"
          />
        </label>
        <label>
          Last Name
          <input
            value={formValues.lastname}
            onChange={onInputChange}
            placeholder="Last Name"
            name="lastname"
            type="text"
          />
        </label>
        <label>
          E-Mail
          <input
            value={formValues.primaryemail}
            onChange={onInputChange}
            placeholder="E-mail"
            name="primaryemail"
            type="email"
          />
        </label>
        <label>
          Username
          <input
            value={formValues.username}
            onChange={onInputChange}
            placeholder="Username"
            name="username"
            type="text"
          />
        </label>
        <label>
          Phone Number
          <input
            value={formValues.phone}
            onChange={onInputChange}
            placeholder="Phone Number"
            name="phone"
            type="text"
          />
        </label>
        <label>
          Password
          <input
            value={formValues.password}
            onChange={onInputChange}
            placeholder="Password"
            name="password"
            type="text"
          />
        </label>
        <button disabled={disabled}>Submit</button>
      </form>
    </RegDiv>
  );
}
