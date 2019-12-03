const {get} = require('axios')
const cli = require('inquirer')
const PUBLIC_API_URL = 'https://api.publicapis.org/'

async function categories() {
  const {data} = await get(PUBLIC_API_URL + 'categories')
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
  const {data} = await get(PUBLIC_API_URL + `random${category ? '?category=' + encodeURIComponent(category) : ''}`)
  return data
}

module.exports = {
  categories,
  random,
}
