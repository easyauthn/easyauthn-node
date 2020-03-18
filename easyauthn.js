const axios = require('axios')
const easyAuthnAPI = 'https://easyauthn.com/api'

module.exports = class EasyAuthn {
  check (condition, message) {
    if (!condition) {
      const error = new Error()
      error.msg = message
      throw error
    }
  }

  async requestUserRegistration () {
    this.check(typeof this.ssk !== 'undefined' && this.ssk, 'Not set ssk!')
    this.check(typeof this.userId !== 'undefined' && this.userId, 'Not set userId!')

    const data = JSON.stringify({
      cmd: 'requestUserRegistration',
      ssk: this.ssk,
      userId: this.userId
    })

    return axios.post(easyAuthnAPI, { p: data })
  }

  async getUserCredentials () {
    this.check(typeof this.ssk !== 'undefined' && this.ssk, 'Not set ssk!')
    this.check(typeof this.userId !== 'undefined' && this.userId, 'Not set userId!')

    const data = JSON.stringify({
      cmd: 'getUserCredentials',
      ssk: this.ssk,
      userId: this.userId
    })

    return axios.post(easyAuthnAPI, { p: data })
  }

  async deleteUserCredential () {
    this.check(typeof this.ssk !== 'undefined' && this.ssk, 'Not set ssk!')
    this.check(typeof this.userId !== 'undefined' && this.userId, 'Not set userId!')
    this.check(typeof this.credentialId !== 'undefined' && this.credentialId, 'Not set credentialId!')

    const data = JSON.stringify({
      cmd: 'deleteUserCredential',
      ssk: this.ssk,
      userId: this.userId,
      credentialId: this.credentialId,
      keepAtLeastOne: this.keepAtLeastOne
    })

    return axios.post(easyAuthnAPI, { p: data })
  }

  async requestInstanceIdUrl () {
    this.check(typeof this.ssk !== 'undefined' && this.ssk, 'Not set ssk!')
    this.check(typeof this.userId !== 'undefined' && this.userId, 'Not set userId!')

    const data = JSON.stringify({
      cmd: 'requestInstanceIdUrl',
      ssk: this.ssk,
      userId: this.userId
    })

    return axios.post(easyAuthnAPI, { p: data })
  }

  async doesUserHaveCredentials () {
    this.check(typeof this.ssk !== 'undefined' && this.ssk, 'Not set ssk!')
    this.check(typeof this.userId !== 'undefined' && this.userId, 'Not set userId!')

    const data = JSON.stringify({
      cmd: 'doesUserHaveCredentials',
      ssk: this.ssk,
      userId: this.userId
    })

    return axios.post(easyAuthnAPI, { p: data })
  }

  async isInstanceIdAuthn () {
    this.check(typeof this.ssk !== 'undefined' && this.ssk, 'Not set ssk!')
    this.check(typeof this.userId !== 'undefined' && this.userId, 'Not set userId!')
    this.check(typeof this.instanceId !== 'undefined' && this.instanceId, 'Not set userId!')

    const data = JSON.stringify({
      cmd: 'isInstanceIdAuthn',
      ssk: this.ssk,
      userId: this.userId,
      instanceId: this.instanceId
    })

    return axios.post(easyAuthnAPI, { p: data })
  }
}
