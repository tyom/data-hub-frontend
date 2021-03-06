const { get } = require('lodash')

const {
  detailsLabels,
  valueLabels,
  requirementsLabels,
} = require('../labels')
const { getDataLabels } = require('../../../lib/controller-utils')
const {
  transformInvestmentDataForView,
  transformInvestmentValueForView,
  transformInvestmentRequirementsForView,
} = require('../services/formatting')

function detailsGetHandler (req, res, next) {
  if (get(res, 'locals.investmentData')) {
    const transformedDetails = transformInvestmentDataForView(res.locals.investmentData)
    const transformedValue = transformInvestmentValueForView(res.locals.investmentData)
    const transformedRequirements = transformInvestmentRequirementsForView(res.locals.investmentData)

    return res.render('investment-projects/views/details', {
      details: getDataLabels(transformedDetails, detailsLabels.view),
      values: getDataLabels(transformedValue, valueLabels.view),
      requirements: getDataLabels(transformedRequirements, requirementsLabels.view),
    })
  }
  return next()
}

module.exports = {
  detailsGetHandler,
}
