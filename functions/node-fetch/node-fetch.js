const fetch = require('node-fetch')

const handler = async function (order) {
  console.log(order)
  try {
    const response = await fetch(`https://www.twofifteen.co.uk/­api/­orders.­php?AppId=${process.env.PRINTING_ID}&­Signature=­${process.env.PRINTING_KEY}`, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return data
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
