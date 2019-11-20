import myfetch from '../utils/myfetch'

export async function sendRequest ({name, email}) {
  try {
    const resp = await(myfetch({
      url: '/prod/fake-auth',
      data: { name, email },
      method: 'POST',
      dataType: 'json'
    }))
    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      msg: error.message
    }
  }
}