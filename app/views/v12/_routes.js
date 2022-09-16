const express = require('express')
const router = express.Router()


// Add your routes here - above the module.exports line

router.post('./queries/create-query', (req, res, next) => {
  console.log('./queries/create-query', req.session.data)
  const name = req.session.data['query-content']
  const section = req.session.data.source

  const queries = req.session.data.queries || []
  queries.push({ name, section })
  req.session.data.queries = queries
  res.redirect('./set-action/set-action-preparing-food')
})

router.post('./set-action/set-action-preparing-food', (req, res, next) => {
  console.log('this is preparing food')
  console.log(req.session.data)
  req.session.data.queries[req.session.data.queries.length - 1].action = req.session.data['set-an-action']
  console.log(1, req.session.data)
  res.redirect('./task-list')
})


module.exports = router
