const depTemplate = document.querySelector('#dep-template')
const wrapper = document.querySelector('.wrapper');

import { TrafikLabs } from './modules/trafiklabs.js';

class Manager {
  constructor() {
    this.initializeEventListeners()
  }

  initializeEventListeners() {
    document.querySelector('form button').addEventListener('click', async (e) => {
      const api = new TrafikLabs()
      e.preventDefault()
      const stops = await api.getStations(e.target.parentElement.querySelector('input').value);
      console.log(stops)
      api.renderStationList(stops)
    })
  }
}

new Manager()
