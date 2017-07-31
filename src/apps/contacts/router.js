const router = require('express').Router()

const { setLocalNav, redirectToFirstNavItem } = require('../middleware')
const { getCommon, getDetails } = require('./controllers/details')
const { postDetails, editDetails } = require('./controllers/edit')
const { archiveContact, unarchiveContact } = require('./controllers/archive')
const { getInteractions } = require('./controllers/interactions')

const LOCAL_NAV = [
  { path: 'details', label: 'Details' },
  { path: 'interactions', label: 'Interactions' },
]

router
  .route('/create')
  .get(editDetails)
  .post(postDetails)

router.use('/:contactId', setLocalNav(LOCAL_NAV))
router.get('/:contactId', redirectToFirstNavItem)
router.get('/:contactId/details', getCommon, getDetails)

router
  .route('/:contactId/edit')
  .get(getCommon, editDetails)
  .post(getCommon, postDetails)

router.post('/:id/archive', archiveContact)
router.get('/:id/unarchive', unarchiveContact)

router.get('/:contactId/interactions', getCommon, getInteractions)

module.exports = router
