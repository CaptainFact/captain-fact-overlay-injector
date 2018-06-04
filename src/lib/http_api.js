import fetch from 'isomorphic-fetch'

import { API_URL } from '../constants'


class CaptainFactHttpApi {
  prepareResponse(promise) {
    return promise.then(response => {
      return response.text().then((body) => {
        body = body ? JSON.parse(body) : null
        if (body.errors)
          throw body.errors
        else
          return body.data
      })
    })
  }

  makeRequest(apiURL, requestType, data) {
    const response = fetch(apiURL, {
      method: requestType,
      body: data ? JSON.stringify(data) : '',
      headers: {'Content-Type': 'application/json'}
    })
    return this.prepareResponse(response)
  }

  post(apiURL, data) {
    return this.makeRequest(apiURL, 'POST', data)
  }
}


// Configure HttpApi
const HttpApi = new CaptainFactHttpApi()
export default HttpApi
