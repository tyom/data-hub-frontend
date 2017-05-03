const {formatLongDate} = require('../lib/date')
const {newlineToBr, getContactLink} = require('../lib/textformatting')
const {getPropertyName} = require('../lib/propertyhelpers')

function getDisplayServiceDelivery (serviceDelivery) {
  if (!serviceDelivery) {
    return null
  }

  const result = {
    company: `<a href="/company/company_company/${serviceDelivery.company.id}/details">${serviceDelivery.company.name}</a>`,
    dit_team: getPropertyName(serviceDelivery, 'dit_team'),
    service: getPropertyName(serviceDelivery, 'service'),
    status: getPropertyName(serviceDelivery, 'status'),
    subject: serviceDelivery.subject,
    notes: newlineToBr(serviceDelivery.notes),
    date: formatLongDate(serviceDelivery.date),
    dit_advisor: getPropertyName(serviceDelivery, 'dit_advisor'),
    uk_region: getPropertyName(serviceDelivery, 'uk_region'),
    sector: getPropertyName(serviceDelivery, 'sector'),
    contact: getContactLink(serviceDelivery),
    country_of_interest: getPropertyName(serviceDelivery, 'country_of_interest')
  }

  return result
}

module.exports = {getDisplayServiceDelivery}