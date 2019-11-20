import styled from 'styled-components'
import { PrimaryButton, ConfirmButton } from '../Button'
import { useState, Fragment, useEffect } from 'react'

const FormGroupWrap = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 760px) {
    flex-direction: row;
    align-items: top;
  }
`

const Label = styled.label`
  width: 120px;
  height: 40px;
  line-height: 40px;
`

const Input = styled.input`
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: block;
  border: 1px solid gray;
  padding: 0 10px;
  font-size: 1rem;
  box-sizing: border-box;
`
Input.displayName = 'Input'

const ErrorMsg = styled.p`
  font-size: 12px;
  color: red;
  height: 16px;
  line-height: 16px;
`
ErrorMsg.displayName = 'ErrorMsg'

export const FormGroup = props => {
  const {
    type,
    label,
    value,
    onChange,
    valid,
    errorMsg
  } = props

  const handleChange = e => onChange(e.target.value)

  let inputComponent = null
  switch (type) {
    case 'text':
      inputComponent = <Input
        value={value}
        type={type}
        onChange={handleChange} />
    default:
      inputComponent = <Input
        value={value}
        type={type}
        onChange={handleChange} />
  }

  return <FormGroupWrap>
    <Label>{label}</Label>
    <div style={{flex: 1}}>
      {inputComponent}
      <ErrorMsg>{!valid && value ? errorMsg : ''}</ErrorMsg>
    </div>
  </FormGroupWrap>
}

const Form = props => {
  const {
    items = [],
    onSubmit,
    onCancel
  } = props
  const [data, setData] = useState(props.data || {})
  const [sending, setSending] = useState(false)

  const onItemChange = (key, val) => {
    setData({
      ...data,
      [key]: val
    })
  }

  const footerStyle = {
    display: 'flex',
    justifyContent: 'center'
  }

  const itemValidRes = {}
  let formValid = true
  for (const item of items) {
    const itemValid = item.validator(data[item.formKey], data)
    !itemValid && (formValid = false)
    itemValidRes[item.formKey] = itemValid
  }

  return <Fragment>
    {
      items.map((item, i) => <FormGroup
        key={i}
        label={item.displayName}
        type={item.type}
        value={data[item.formKey]}
        errorMsg={item.invalidMsg}
        onChange={val => onItemChange(item.formKey, val)}
        valid={itemValidRes[item.formKey]}>
      </FormGroup>)
    }
    <div style={footerStyle}>
      <PrimaryButton
        style={{ marginRight: 20 }}
        onClick={onCancel}>
        Cancel
      </PrimaryButton>
      <ConfirmButton
        disabled={!formValid}
        onClick={() => onSubmit(data)}>
        Send
      </ConfirmButton>
    </div>
  </Fragment>
}

export default Form 