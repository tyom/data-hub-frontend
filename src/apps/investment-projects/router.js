const router = require('express').Router()

const {
  shared,
  form,
} = require('./middleware')
const {
  createStep1,
  createStep2,
  archive,
  audit,
  details,
  edit,
  team,
  interactions,
} = require('./controllers')

const detailsFormMiddleware = require('./middleware/forms/details')
const valueFormMiddleware = require('./middleware/forms/value')

router.use(shared.handleEmptyMiddleware)
router.use(shared.getLocalNavMiddleware)

router.param('id', shared.getInvestmentDetails)
router.param('interactionId', shared.getInteractionDetails)

router.post('/:id/details', archive.archiveInvestmentProjectHandler, details.detailsGetHandler)
router.get('/:id/unarchive', archive.unarchiveInvestmentProjectHandler)

router.get('/:id/audit', audit.getInvestmentAudit)

router.get('/create', (req, res) => { res.redirect('create/1') })

router
  .route('/create/1')
  .get(createStep1.getHandler)
  .post(createStep1.postHandler)

router
  .route('/create/2')
  .get(detailsFormMiddleware.populateForm, createStep2.createGetHandler)
  .post(detailsFormMiddleware.populateForm, detailsFormMiddleware.handleFormPost, createStep2.createPostHandler)

router.get('/:id', details.redirectToDetails)
router.get('/:id/details', details.detailsGetHandler)

router
  .route('/:id/edit-details')
  .get(detailsFormMiddleware.populateForm, edit.editDetailsGet)
  .post(detailsFormMiddleware.populateForm, detailsFormMiddleware.handleFormPost, edit.editDetailsPost)

router
  .route('/:id/edit-value')
  .get(valueFormMiddleware.populateForm, edit.editValueGet)
  .post(valueFormMiddleware.populateForm, valueFormMiddleware.handleFormPost, edit.editValuePost)

router
  .route('/:id/edit-requirements')
  .get(form.populateRequirementsFormMiddleware, edit.editRequirementsGet)
  .post(form.populateRequirementsFormMiddleware, form.investmentRequirementsFormPostMiddleware, edit.editRequirementsPost)

router.get('/:id/team', team.getTeamHandler)

router.get('/:id/interactions', interactions.list.indexGetHandler)

router
  .route('/:id/interactions/create')
  .get(form.populateInteractionsFormMiddleware, interactions.create.createGetInteractionHandler)
  .post(
    form.populateInteractionsFormMiddleware,
    form.interactionDetailsFormPostMiddleware,
    interactions.create.createPostInteractionHandler,
    interactions.create.createGetInteractionHandler
  )

router
  .route('/:id/interactions/:interactionId/edit')
  .get(form.populateInteractionsFormMiddleware, interactions.edit.editGetInteractionHandler)
  .post(
    form.populateInteractionsFormMiddleware,
    form.interactionDetailsFormPostMiddleware,
    interactions.edit.editPostInteractionHandler,
    interactions.edit.editGetInteractionHandler
  )

module.exports = router
