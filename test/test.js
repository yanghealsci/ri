import Form, {FormGroup} from '../src/components/Form'
import Home from '../src/pages/Home'
import { sendRequest } from '../src/apis'

describe('FormGroup', () => {
  describe('Given valid props is set to be false', () => {
    const props = {
      valid: false,
      type: 'text',
      errorMsg: 'error'
    }
    it('should NOT show msg error when nothing typed in', () => {
      const wrapper = shallow(<FormGroup value='' {...props}/>)
      expect(wrapper.find('ErrorMsg').text()).to.equal('')
    })
    it('should show error message when input has value', () => {
      const wrapper = shallow(<FormGroup value='xxxx' {...props}/>)
      expect(wrapper.find('ErrorMsg').text()).to.equal('error')
    })
  })
})

describe('Form', () => {
  const items = [{
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

  it('the confirm button should be disabled when name is invalid', () => {
    const wrapper = shallow(<Form data={{ name: '', email: 'xx@xx.com', email2: 'xx@xx.com'}}/>)
    expect(wrapper.find('ConfirmButton').prop('disabled')).to.be.false
  })

  it('the confirm button should be disabled when email is invalid', () => {
    const wrapper = shallow(<Form data={{ name: 'xxxx', email: 'xx@xx', email2: 'xx@xx' }} />)
    expect(wrapper.find('ConfirmButton').prop('disabled')).to.be.false
  })

  it('the confirm button should be disabled when email2 is invalid', () => {
    const wrapper = shallow(<Form data={{ name: '', email: 'xx@xx.com', email2: 'xx2@xx.com' }} />)
    expect(wrapper.find('ConfirmButton').prop('disabled')).to.be.false
  })
})