export const SERVER_API = 'https://react-hooks-dummy-server.firebaseio.com';

class API {
  sendRequest = (method, url, body) => {
    const headers = {
      'Content-Type': 'appcilation/json',
    };

    let params = { method };

    if (!['DELETE'].includes(method)) {
      params = { ...params, headers,  body: JSON.stringify(body) }
    }

    return fetch(`${SERVER_API}${url}`, params)
      .then(response => response.json())
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
}

export default new API();