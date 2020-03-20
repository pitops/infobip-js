# Infobip-JS

This is a javascript client that covers **partially** the API of [Infobip](https://infobip.com) for sending SMS.

### Features

- Send single message to single number
- Send single message to multiple numbers
- Preview SMS cost and count
- Support for transliteration
- Supports **only** username/password authentication mechanism

### How to use

```javascript
const InfobipAPI = require('infobip-js')

// generate client
const InfoBip = new InfobipAPI({
  username: 'username',
  password: 'password'
})

try {
  // ** Send single message
  // SENDER_ID is not supported in all countries
  const res = await InfoBip.from('SENDER_ID')
    .to('99812723737')
    .message('Test')
    .send()
  console.log(res)
} catch (err) {
  console.error(err)
}

try {
  // ** Send message to multiple destinations
  const res = await InfoBip.from('SENDER_ID')
    .to(['99812723737', '9999383883'])
    .message('Test')
    .send('sms-multi')
  console.log(res)
} catch (err) {
  console.error(err)
}

try {
  // ** Get cost estimation on a transliterated message
  const res = await InfoBip.message('Test 2')
    .transliteration('GREEK')
    .preview()
  console.log(res)
} catch (err) {
  console.error(err)
}
```

### Contributions Welcome
