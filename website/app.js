/* Global Variables */
const url = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&zip='
const apiKey = '&APPID=3cb53311d6a878f63a2cc3b342015a5a'
const addDateURL = `/add`
const getDateURL = `/all`

// Create a new date instance dynamically with JS
const d = new Date()
const reqDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear()

const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  try {
    const newData = await req.json()
    return newData
  } catch (error) {
    console.log('Error', error)
  }
}

const getData = async () => {
  const code = document.getElementById('zip').value
  const feelings = document.getElementById('feelings').value
  if (code) {
    debugger
    const response = await fetch(`${url}${code}${apiKey}`)
    try {
      const data = await response.json()
      data.feelings = feelings
      data.date = reqDate
      await postData(addDateURL, data)
      updateUI()
    } catch (error) {
      console.log('Error', error)
    }
  } else {
    alert('please enter the zip code')
  }
}

const updateUI = async () => {
  const request = await fetch(getDateURL)
  try {
    const response = await request.json()
    document.getElementById('date').innerHTML = response.date
    document.getElementById('temp').innerHTML = response.main.temp
    document.getElementById('content').innerHTML = response.feelings
  } catch (error) {
    console.log('Error', error)
  }
}
document.getElementById('generate').addEventListener('click', getData)
