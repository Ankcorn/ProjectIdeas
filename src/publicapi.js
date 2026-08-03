const {get} = require('axios')
const cli = require('inquirer')
const PUBLIC_API_URL = 'https://api.publicapis.org/'

async function categories() {
  const url = PUBLIC_API_URL + 'categories'
  let response
  try {
    response = await get(url)
  } catch (error) {
    process.stderr.write(JSON.stringify({
      event: 'api_request_failed',
      endpoint: 'categories',
      url,
      status: error.response ? error.response.status : undefined,
      message: error.message,
    }) + '\n')
    throw error
  }
  const {data} = response
  const {category} = (await cli.prompt({
    type: 'list',
    message: 'Select a category that you find interesting',
    choices: [...data, 'All'],
    pageSize: 25,
    default: 'All',
    name: 'category',
  }))
  return category === 'All' ? undefined : category
}

async function random({category}) {
  const url = PUBLIC_API_URL + `random${category ? '?category=' + encodeURIComponent(category) : ''}`
  let response
  try {
    response = await get(url)
  } catch (error) {
    process.stderr.write(JSON.stringify({
      event: 'api_request_failed',
      endpoint: 'random',
      url,
      category,
      status: error.response ? error.response.status : undefined,
      message: error.message,
    }) + '\n')
    throw error
  }
  return response.data
}

module.exports = {
  categories,
  random,
}
