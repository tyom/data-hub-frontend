const router = require('express').Router()

const { getProjectDetails } = require('./shared.middleware')

const {
  investmentDetailsFormPostMiddleware,
  investmentValueFormPostMiddleware,
  investmentRequirementsFormPostMiddleware,
  populateDetailsFormMiddleware,
  populateValueFormMiddleware,
  populateRequirementsFormMiddleware,
} = require('./form.middleware')

const templateData = {
  currentNavItem: 'details',
  variant: 'edit',
}

function editDetailsGet (req, res) {
  res.locals.title.unshift('Edit details')
  res.render('investment/details-edit', templateData)
}

function editValueGet (req, res) {
  res.locals.title.unshift('Edit value')
  res.render('investment/value-edit', templateData)
}

function editRequirementsGet (req, res) {
  res.render('investment/requirements-edit', templateData)
}

function editDetailsPost (req, res) {
  if (res.locals.form.errors) {
    return res.render('investment/details-edit', templateData)
  }
  req.flash('success-message', 'Updated investment details')
  return res.redirect(`/investment/${res.locals.resultId}/details`)
}

function editValuePost (req, res) {
  if (res.locals.form.errors) {
    return res.render('investment/value-edit', templateData)
  }
  req.flash('success-message', 'Updated investment value')
  return res.redirect(`/investment/${res.locals.projectId}/details`)
}

function editRequirementsPost (req, res) {
  if (res.locals.form.errors) {
    req.flash('success-message', 'Updated investment requirements')
    return res.render('investment/requirements-edit', templateData)
  }
  return res.redirect(`/investment/${res.locals.projectId}/details`)
}

router.param('id', getProjectDetails)
router.get('/:id/edit-details', populateDetailsFormMiddleware, editDetailsGet)
router.get('/:id/edit-value', populateValueFormMiddleware, editValueGet)
router.get('/:id/edit-requirements', populateRequirementsFormMiddleware, editRequirementsGet)
router.post('/:id/edit-details', populateDetailsFormMiddleware, investmentDetailsFormPostMiddleware, editDetailsPost)
router.post('/:id/edit-value', populateValueFormMiddleware, investmentValueFormPostMiddleware, editValuePost)
router.post('/:id/edit-requirements', populateRequirementsFormMiddleware, investmentRequirementsFormPostMiddleware, editRequirementsPost)

module.exports = {
  router,
}
