class Fetch {
  async get(url) {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };
    return await fetch(url, options)
  }
}

export{ Fetch }