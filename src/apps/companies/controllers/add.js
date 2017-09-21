const { map } = require('asyncro')

const logger = require('../../../../config/logger')
const { ukOtherCompanyOptions, foreignOtherCompanyOptions } = require('../options')
const { getCHCompany } = require('../repos')
const { buildQueryString } = require('../../../lib/url-helpers')
const { isBlank } = require('../../../lib/controller-utils')
const { searchLimitedCompanies } = require('../../search/services')
const { buildPagination } = require('../../../lib/pagination')
const { companyDetailsLabels, companyTypeOptions } = require('../labels')

function getAddStepOne (req, res, next) {
  res.render('companies/views/add-step-1.njk', {
    ukOtherCompanyOptions,
    foreignOtherCompanyOptions,
    company: req.body,
    companyTypeOptions,
    companyDetailsLabels,
  })
}

function postAddStepOne (req, res, next) {
  // validate, if bad then generate errors, and show form again
  const errorMessages = {}

  if (isBlank(req.body.business_type)) {
    errorMessages.business_type = ['You must select a company type']
  }

  if (req.body.business_type === 'ukother' && isBlank(req.body.business_type_uk_other)) {
    errorMessages.business_type_uk_other = ['You must select a type of organisation']
  }

  if (req.body.business_type === 'foreign' && isBlank(req.body.business_type_for_other)) {
    errorMessages.business_type_for_other = ['You must select a type of organisation']
  }

  if (Object.keys(errorMessages).length > 0) {
    res.locals.errors = {
      messages: errorMessages,
    }
    return getAddStepOne(req, res)
  }

  let params
  switch (req.body.business_type) {
    case 'ltd':
    case 'ltdchild':
      params = {
        business_type: req.body.business_type,
        country: 'uk',
      }
      break
    case 'ukother':
      params = {
        business_type: req.body.business_type_uk_other,
        country: 'uk',
      }
      break
    case 'foreign':
      params = {
        business_type: req.body.business_type_for_other,
        country: 'non-uk',
      }
      break
  }

  const queryString = buildQueryString(params)

  if (req.body.business_type === 'ukother' || req.body.business_type === 'foreign') {
    return res.redirect(`/companies/add/${req.body.business_type + queryString}`)
  }

  return res.redirect(`/companies/add-step-2/${queryString}`)
}

async function getAddStepTwo (req, res, next) {
  const searchTerm = req.query.term
  const businessType = req.query.business_type
  const token = req.session.token
  let companies = {}

  if (!searchTerm) {
    return res.render('companies/views/add-step-2.njk', {
      companyTypeOptions,
      businessType,
    })
  }

  try {
    const searchResponse = await searchLimitedCompanies({
      token,
      searchTerm,
    })
    // TODO: Remove the need to make another call to the API to get the companies house details. The search API should return companies house companies and their relevant information
    const results = await map(searchResponse.results, async (result) => {
      if (result.company_number) {
        try {
          result.companies_house_data = await getCHCompany(token, result.company_number)
        } catch (error) {
          logger.error(error)
        }
      }
      return result
    })

    companies = {
      results,
      pagination: buildPagination(req.query, results),
    }
  } catch (error) {
    logger.error(error)
  }

  res.render('companies/views/add-step-2.njk', {
    companyTypeOptions,
    companies,
    searchTerm,
    businessType,
  })
}

module.exports = {
  getAddStepOne,
  postAddStepOne,
  getAddStepTwo,
}
