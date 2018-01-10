const API_URL = 'http://localhost:3001/api/';

const postJSON = () => {
  return {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('sampleToken')
    }
  }
};

const putJSON = {
  method: "PUT",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

const deleteJSON = {
  method: "DELETE",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return response.json()
      .then((res) => {
        throw new Error(res.message)
      });
  }
}

export function encodeParams(obj, prefix) {
  const str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
      str.push(typeof v === 'object' ?
        encodeParams(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
}

export function fetchData(url, params = {}) {
  let paramsURL = Object.keys(params).length > 0 ? `${encodeParams(params)}` : '';
  return fetch(`${API_URL}${url}?${paramsURL}`)
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      console.log("GET Response Data for " + url, json);
      if (json.error) {
        let error = new Error(json.error);
        error.data = json.error.data;
        throw error;
      }
      return json.data? json.data : json;
    });
}

export function postData(url, opts = {}, params = {}) {
  const options = {};
  Object.assign(options, postJSON());
  options.body = JSON.stringify(opts);
  console.log("Post Data", opts);
  let paramsURL = Object.keys(params).length > 0 ? `${encodeParams(params)}` : '';
  console.log("Post url", `${API_URL}${url}?${paramsURL}`, options);
  return fetch(`${API_URL}${url}?${paramsURL}`, options)
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      console.log("POST Response Data", json);
      if (json.error) {
        let error = new Error(json.error);
        error.message = json.error;
        throw error;
      }
      return json.data ? json.data : json;
    })
}