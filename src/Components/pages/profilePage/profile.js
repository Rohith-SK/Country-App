import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import CountryContext from '../../core/Context/countryContext';
import { manageLocalStorage } from '../../countryServices/countryStorage';
import NavigationBar from '../../navbar/navigationBar';
import './profile.css';
import CountryNameDetails from '../../countryNameDetails/countryNameDetails';




function Profile() {
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const passwordRef = useRef()
  const displayNameRef = useRef()
  const confirmPasswordRef = useRef()
  const [changePassWord, setchangePassWord] = useState(false)
  const [changeDisplayName, setChangeDisplayName] = useState(false)
  const [userCountry, setUserCountry] = useState('')
  const [deleteAccount, setDeleteAccount] = useState(false)
  const countries = useContext(CountryContext)
  const navigate = useNavigate()
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

  useEffect(() => {
      var details = JSON.parse(manageLocalStorage.get('registerUser'))
      var len = Object.keys(details).length;
      for (let i = 0; i < len; i++) {
        if (details[i].name === manageLocalStorage.get('currentUser')) {
          setName(details[i].name)
          setPassword(details[i].password)
          setEmail(details[i].email)
          setUserCountry(details[i].country)
        }
      }
  }, [])

  const cancelChangeDisplayName = () => {
    setChangeDisplayName(false)
    setNameError('')
  }


  const updateDisplayName = () => {
    var nameErrorMessage = ''
    if (!displayNameRef.current.value) {
      nameErrorMessage = 'Error'
      setNameError(nameErrorMessage)
      console.log({ nameErrorMessage })
    }
    if (format.test(displayNameRef.current.value)) {
      nameErrorMessage = 'Error'
      setNameError(nameErrorMessage)
    }
    if (nameErrorMessage == '') {
      setNameError('')
      setName(displayNameRef.current.value)
      setChangeDisplayName(false);
      const dataObject = {
        name: displayNameRef.current.value,
        email: email,
        country: userCountry,
        password: password
      }
      localStorage.setItem('currentUser', displayNameRef.current.value)
      var details = JSON.parse(manageLocalStorage.get('registerUser'))
      const index = details.findIndex((item) => item.email == email);
      console.log(index)
      details[index] = dataObject;
      localStorage.setItem('registerUser', JSON.stringify(details))
    }
  }

  const enableChangeDisplayName = () => {
    setChangeDisplayName(true)
  }

  const enableChangePassword = () => {
    setchangePassWord(true)
  }
  const updatePassword = () => {
    var passwordErrorMessage = ''
    if (!passwordRef.current.value) {
      passwordErrorMessage = 'Error'
      setPasswordError(passwordErrorMessage)
      console.log({ passwordErrorMessage })
    }
    if (format.test(passwordRef.current.value) || passwordRef.current.value.length < 5 || passwordRef.current.value.length > 16) {
      passwordErrorMessage = 'Error'
      setPasswordError(passwordErrorMessage)
      console.log({ passwordErrorMessage })
      console.log(passwordRef.current.value.length)
    }
    if (passwordErrorMessage == '') {
      setPasswordError('')
      setPassword(passwordRef.current.value)
      setchangePassWord(false);
    }
  }
  const confirmPassword = () => {
    console.log(passwordRef.current.value)
    console.log(confirmPasswordRef.current.value)
    var confirmPasswordErrorMessage = ''
    var passwordErrorMessage = ''
    if (!passwordRef.current.value) {
      passwordErrorMessage = 'Error'
      setPasswordError(passwordErrorMessage)
      console.log({ passwordErrorMessage })
    }
    if (format.test(passwordRef.current.value) || passwordRef.current.value.length < 5 || passwordRef.current.value.length > 16) {
      passwordErrorMessage = 'Error'
      setPasswordError(passwordErrorMessage)
      console.log({ passwordErrorMessage })
      console.log(passwordRef.current.value.length)
    }
    if (confirmPasswordRef.current.value === passwordRef.current.value && passwordErrorMessage == '') {
      setPasswordError('')
      setPassword(passwordRef.current.value)
      setchangePassWord(false);
      setPasswordError('')
      setPassword(passwordRef.current.value)
      setchangePassWord(false);
      const dataObject = {
        name: name,
        email: email,
        country: userCountry,
        password: passwordRef.current.value
      }
      var details = JSON.parse(localStorage.getItem('registerUser'))
      console.log(details)
      const index = details.findIndex((item) => item.email == email);
      console.log(index)
      details[index] = dataObject;
      manageLocalStorage.set('registerUser', details)
      console.log(JSON.parse(localStorage.getItem('registerUser')))
    }
    else {
      confirmPasswordErrorMessage = 'Error'
      setConfirmPasswordError(confirmPasswordErrorMessage)
    }
  }

  const cancelPasswordChange = () => {
    setchangePassWord(false)
    setPasswordError('')
    setConfirmPasswordError('')
  }

  const deleteHandler = () => {
    setDeleteAccount(true)
  }

  const yesHandler = () => {
    let details = JSON.parse(manageLocalStorage.get('registerUser'));
    let newDetails = details.filter((item) => item.email != email);
    manageLocalStorage.set('registerUser', newDetails);
    let count=manageLocalStorage.get('count')
    manageLocalStorage.set('count', count-1)
    navigate('/')
  }

  const noHandler = () => {
    setDeleteAccount(false)
  }


  return (
    <div>
      <NavigationBar />
      <Container>
        <Row>
          <Col className='profile-first-col' lg={7}>
            <Table className='profile-table'>
              <tbody className='table-body'>
                <tr className='table-row'>
                  <td className='table-data'>E-Mail ID</td>
                  <td className='table-data'>{email}</td>
                  <td className='table-data'></td>
                  <td className='table-data'></td>
                </tr>
                <tr className='table-row'>
                  <td className='table-data'>Display Name</td>
                  <td className='table-data'>{changeDisplayName ? <Form.Control className='profile-form-input' type="text" ref={displayNameRef}></Form.Control> : name}</td>
                  <td className='table-data'><Button variant={changeDisplayName ? "success" : "danger"} onClick={changeDisplayName ? updateDisplayName : enableChangeDisplayName}>{changeDisplayName ? "Update" : "Change"}</Button></td>
                  {changeDisplayName ? <td><Button variant="danger" onClick={cancelChangeDisplayName}>Cancel</Button></td> : <td></td>}
                  <td className='error-messages'>{nameError}</td>

                </tr>
                <tr className='table-row'>
                  <td className='table-data'>Password </td>
                  <td className='table-data'>{changePassWord ? <Form.Control className='profile-form-input' type="password" ref={passwordRef}></Form.Control> : password}</td>
                  <td className='table-data'><Button variant={changePassWord ? "success" : "danger"} onClick={changePassWord ? updatePassword : enableChangePassword}>{changePassWord ? "Update" : "Change"}</Button></td>
                  {changePassWord ? <td><Button variant="danger" onClick={cancelPasswordChange}>Cancel</Button></td> : <td></td>}
                  <td className='error-messages'>{passwordError}</td>
                </tr>
                {changePassWord ?
                  <tr className='table-row'>
                    <td className='table-data'>Confirm Password</td>
                    <td className='table-data'><Form.Control className='profile-form-input' type="password" ref={confirmPasswordRef}></Form.Control></td>
                    <td className='table-data'><Button variant="success" onClick={confirmPassword}>Confirm</Button></td>
                    <td className='error-messages'>{confirmPasswordError}</td>
                  </tr> : null}
              </tbody>
            </Table>
            {deleteAccount ? <h1 className='delete-account-message'>Do you want to delete your Account <Button variant='danger' onClick={yesHandler} style={{ marginRight: '10px' }}>Yes</Button><Button variant='success' onClick={noHandler}>No</Button></h1> : <Button className='delete-button' variant='danger' onClick={deleteHandler} style={{ marginBottom: '10px' }}>Delete Account</Button>}
          </Col>
          <Col className='profile-second-col' lg={4}>
            <CountryNameDetails name={userCountry} />
          </Col>
        </Row>
      </Container>

    </div >
  )
}

export default Profile