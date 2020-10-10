import { Fetch } from './fetch.js'

const depTemplate = document.querySelector('#dep-template')
const wrapper = document.querySelector('.wrapper');

class TrafikLabs {
  async getStations(input) {
    const response = await new Fetch().get(`http://localhost:9292/stations?input=${JSON.stringify({'input': input})}`)
    return await response.json()
  }

  async getDepartures(input) {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };
    const response = await fetch(`http://localhost:9292/departures/${input}`, options)
    return await response.json()
  }

  renderStationList(data) {
    const api = new TrafikLabs()
    data['StopLocation'].forEach(element => {
      let temp = document.createElement('h3');
      temp.textContent = element.name;
      temp.setAttribute('data-id', element.id);
      temp.addEventListener('click', async (e) => {
        api.renderDepartureBoard(await api.getDepartures(e.target.getAttribute('data-id')))
      })
      wrapper.append(temp);
    });
  }

  renderDepartureBoard(data) {
    console.log(data)
    let container = document.createElement('div')
    container.classList.add('container');
    container.classList.add('dep-board');
    let header = document.createElement('h2');
    header.innerText = 'Hållplats'
    container.append(header)
    data['Departure'].forEach(element => {
      container.append(this.renderDeparture(element))
    });
    wrapper.append(container)
  }

  renderDeparture(data) {
    let clone = depTemplate.content.cloneNode(true)
    clone.querySelector('h4').textContent = data['Product']['num']
    let depTime = Math.round((new Date(`${data['date']} ${data['time']}`) - new Date()) / 60000)
    if (depTime <= 0) {
      clone.querySelector('p').textContent = 'Now'
    } else {
      clone.querySelector('p').textContent = `In ${Math.round((new Date(`${data['date']} ${data['time']}`) - new Date())/60000)} Min`
    }
    return clone
  }
}

export{ TrafikLabs }