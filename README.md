# easyauthn
EasyAuthn package implementing [EasyAuthn API](https://github.com/easyauthn/api-doc)

## Table of contents

1. [Installation](#installation)
2. [Examples](#examples)
  * [getUserCredentials](#getusercredentials)
  * [deleteUserCredential](#deleteusercredential)
  * [requestUserRegistration](#requestuserregistration)
  * [requestInstanceIdUrl](#requestinstanceidurl)
  * [doesUserHaveCredentials and isInstanceIdAuthn](#doesuserhavecredentials-and-isinstanceidauthn)

## Installation

To install EasyAuthn package for Node.js run:
```
npm install easyauthn
```

## Examples

After the installation you can use the package.
```
const EasyAuthn = require('easyauthn')
```
You need to use the EasyAuthn in `try/catch` block. It will throw an expection if there is no connection to the server, for example. 

### getUserCredentials
```
  const easyAuthn = new EasyAuthn()
  easyAuthn.ssk = 'SSK_VALUE'
  easyAuthn.userId = 'USER_ID'
  const easyAuthnResult = await easyAuthn.getUserCredentials()
  if (easyAuthnResult.status === 200 && easyAuthnResult.data.status === 'ok') {
    // all is good and can access credentials from the array easyAuthnResult.data.credentials
  } else {
    console.log(easyAuthnResult)
    throw new Error()
  }
 ```
### deleteUserCredential
```
  const easyAuthn = new EasyAuthn()
  easyAuthn.ssk = 'SSK_VALUE'
  easyAuthn.userId = 'USER_ID'
  easyAuthn.credentialId = 'CREDENTIAL_ID'
  const easyAuthnResult = await easyAuthn.deleteUserCredential()
  if (easyAuthnResult.status === 200 && easyAuthnResult.data.status === 'ok') {
    // all is good and the credential was deleted
  } else {
    console.log(easyAuthnResult)
    throw new Error()
  }
```
### requestUserRegistration
```
  const easyAuthn = new EasyAuthn()
  easyAuthn.ssk = 'SSK_VALUE'
  easyAuthn.userId = 'USER_ID'
  const easyAuthnResult = await easyAuthn.requestUserRegistration()
  if (easyAuthnResult.status === 200 && easyAuthnResult.data.status === 'ok') {
    // all is good and we can access easyAuthnResult.data.registrationUrl, easyAuthnResult.data.qrRegistrationUrl and easyAuthnResult.data.statusRoom
  } else {
    console.log(easyAuthnResult)
    throw new Error()
  }
```
### requestInstanceIdUrl
```
  const easyAuthn = new EasyAuthn()
  easyAuthn.ssk = 'SSK_VALUE'
  easyAuthn.userId = 'USER_ID'
  const easyAuthnResult = await easyAuthn.requestInstanceIdUrl()
  if (easyAuthnResult.status === 200 && easyAuthnResult.data.status === 'ok') {
    // all is good and can access easyAuthnResult.data.url, easyAuthnResult.data.urlQr, easyAuthnResult.data.instanceId, easyAuthnResult.data.statusRoom
  } else if (easyAuthnResult.status === 200 &&
    easyAuthnResult.data.status === 'client_error' &&
    (easyAuthnResult.data.code === 'CE24' || easyAuthnResult.data.code === 'CE22')) {
    // "Not valid 'ssk' and 'user_id'!" or "User without registration!"
    // no credentials for verification
  } else {
    console.log(easyAuthnResult)
    throw new Error()
  }
```
### doesUserHaveCredentials and isInstanceIdAuthn
```
  const easyAuthn = new EasyAuthn()
  easyAuthn.ssk = 'SSK_VALUE'
  easyAuthn.userId = 'USER_ID'
  const easyAuthnResultCredentials = await easyAuthn.doesUserHaveCredentials()
  if (easyAuthnResultCredentials.status === 200 && easyAuthnResultCredentials.data.status === 'ok') {
    if (easyAuthnResultCredentials.data.credentials) {
      easyAuthn.instanceId = 'INSTANCE_ID'
      const easyAuthnResultCredentials = await easyAuthn.isInstanceIdAuthn()
      if (easyAuthnResultCredentials.status === 200 &&
          easyAuthnResultCredentials.data.status === 'ok' &&
          easyAuthnResultCredentials.data.authn === true) {
        // all is good, authentication was successful and can send/start session
      } else {
        // not good, authentication was unsuccessful
      }
    } else {
     // all is good, the user does not exist or has no credentials for authentication
     // this is the case when user dont activate EasyAuthn credentials
    }
  } else {
    throw new Error()
  }
```
