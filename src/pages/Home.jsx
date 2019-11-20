import Layout from '../components/Layout'
import Modal from '../components/Modal'
import {PrimaryButton} from '../components/Button'
import Form from '../components/Form'
import styled from 'styled-components'
import { useState, useEffect, useReducer, Fragment } from 'react'
import { sendRequest } from '../apis'

const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin: 0;
`

const P = styled.p`
  text-align: center;
  font-size: 1rem;
`

const Info = styled.p`
  text-align: center;
  font-size: 12px;
`

const initUiState = {
  status: 'ideal',
  errorMessage: ''
}

const initFormData = {
  name: '',
  email: '',
  email2: ''
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'restStatus':
      return initUiState
    case 'sendRequest':
      return {
        ...state,
        status: 'loading'
      }
    case 'success':
      return {
        ...state,
        status: 'success'
      }
    case 'error':
      return {
        status: 'error',
        errorMessage: action.payload
      }
    default:
      return state
  }
}

const Home = props => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState(initFormData)
  const [uiState, dispatch] = useReducer(reducer, initUiState)

  const wrapStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }

  const formItems = [{
    formKey: 'name',
    displayName: 'Name',
    type: 'text',
    validator: (val, formData) => {
      return val && val.length >= 3
    },
    invalidMsg: 'Name should be at last 3 characters long'
  }, {
    formKey: 'email',
    displayName: 'Email',
    type: 'text',
    validator: (val, formData) => {
      const pattern = /.+@.+\.com/
      return !!pattern.exec(val)
    },
    invalidMsg: 'Email format invalid'
  }, {
    formKey: 'email2',
    displayName: 'Confirm Email',
    type: 'text',
    validator: (val, formData) => {
      return val === formData.email
    },
    invalidMsg: 'Confirm email should be same as email'
  }]

  const handleSubmit = async data => {
    dispatch({type: 'sendRequest'})
    const resp = await sendRequest(data)
    if (resp.success) {
      dispatch({type: 'success'})
    } else {
      dispatch({
        type: 'error',
        payload: resp.msg
      })
    }
  }

  const handleCancel = () => {
    setFormData(initFormData)
    dispatch({ type: 'restStatus'})
    setShowModal(false)
  }

  let modalContent = <Form
    data={formData}
    items={formItems}
    onSubmit={handleSubmit}
    onCancel={handleCancel}
  />
  switch (uiState.status) {
    case 'loading':
      modalContent = <Fragment>
        {modalContent}
        <Info>Sending request...</Info>
      </Fragment>
      break
    case 'error':
      modalContent = <Fragment>
        {modalContent}
        <Info>{uiState.errorMessage}</Info>
      </Fragment>
      break
    case 'success':
      modalContent = <Fragment>
        <p style={{textAlign: 'center'}}>Registered</p >
        <PrimaryButton style={{display: 'block', margin: 'auto'}} onClick={handleCancel}>Close</PrimaryButton>
      </Fragment >
      break
  }

  return (
    <div style={wrapStyle}>
      <Layout
        header={<p style={{height: 60, lineHeight: '60px'}}>{'Broccoli & Co.'}</p>}
        footer={<p style={{fontSize: 12, textAlign: 'center'}}>All rights reserved</p>}>
        <div style={{height: '100%', paddingTop: 100}}>
          <H1>A better way</H1>
          <H1>to enjoy every day.</H1>
          <P>Be first to know when we launch</P>
          <PrimaryButton
            onClick={() => setShowModal(true)}
            style={{ margin: 'auto', display: 'block' }}>
            Request an invite
          </PrimaryButton>
        </div>
      </Layout>
      {
        showModal ? <Modal title={'Request an invite'} contentStyle={{maxWidth: '60%'}}>
          {modalContent}
        </Modal> : null
      }
    </div>
  )
}

export default Home