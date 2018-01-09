import fetch from "isomorphic-fetch"

import { apiURL } from "../config"


class CaptainFactHttpApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.headers = {}
  }

  prepareResponse(promise) {
    return promise.then(response => {
      return response.text().then((body) => {
        body = body ? JSON.parse(body) : null
        if (!response.ok) {
          if (body.error)
            throw body.error
          else
            throw body.errors
        }
        else
          return body
      })
    })
  }

  makeRequest(resourceUrl, requestType, data) {
    const response = fetch(this.baseUrl + resourceUrl, {
      method: requestType,
      body: data ? JSON.stringify(data) : '',
      headers: Object.assign({
        "Content-Type": "application/json"
      }, this.headers)
    })
    return this.prepareResponse(response)
  }

  get(resourceUrl) {
    const response = fetch(this.baseUrl + resourceUrl, this.headers)
    return this.prepareResponse(response)
  }

  post(resourceUrl, data) {
    return this.makeRequest(resourceUrl, "POST", data)
  }

  put(resourceUrl, data) {
    return this.makeRequest(resourceUrl, "PUT", data)
  }

  delete(resourceUrl, data) {
    return this.makeRequest(resourceUrl, "DELETE", data)
  }
}


// Configure HttpApi
const HttpApi = new CaptainFactHttpApi(apiURL)
export default HttpApi
