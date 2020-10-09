async function getStations(input) {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`http://localhost:9292/stations?input=${JSON.stringify({'input': input})}`, options)
    return await response.json()
}

const wrapper = document.querySelector('.wrapper');

document.querySelector('form button').addEventListener('click', async (e) => {
    e.preventDefault()
    const stops = await getStations(e.target.parentElement.querySelector('input').value);
    console.log(stops)
    stops['StopLocation'].forEach(element => {
        let temp = document.createElement('h3');
        temp.textContent = element.name;
        temp.setAttribute('data-id', element.id);
        temp.addEventListener('click', async (e) => {
            renderDepartureBoard(await getDepartures(e.target.getAttribute('data-id')))
        })
        wrapper.append(temp);
    });
})

async function getDepartures(input) {
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

function renderDepartureBoard(data){
    console.log(data)
    let container = document.createElement('div')
    container.classList.add('container')
    let h = document.createElement('h2')
    h.innerHTML('Hållplats')
    container.append(h)
    data['Departure'].forEach(element => {
        container.append(renderDeparture(element))
    });
    wrapper.append(container)
}

function renderDeparture(data){
// Return a nice looking departure time thingerydo
}
