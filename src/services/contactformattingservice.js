const getFormattedAddress = require('../lib/address').getFormattedAddress
const {newlineToBr} = require('../lib/textformatting')
const {formatLongDate} = require('../lib/date')
const {formatPhone} = require('../lib/phone')

/**
 * Translate a raw contact object into a formatted contact
 * to display on the screen
 * @param {object} contact
 * @returns {object} displayContact A contact that can be put into a key value table
 *
 */
function getDisplayContact (contact) {
  return {
    job_title: contact.job_title,
    telephone_number: formatPhone(contact.telephone_countrycode, contact.telephone_number),
    email: contact.email,
    address: getFormattedAddress(contact),
    telephone_alternative: contact.telephone_alternative,
    email_alternative: contact.email_alternative,
    notes: newlineToBr(contact.notes)
  }
}

/**
 * Format contact details for use in the company screen
 *
 * @param {object} contact
 * @returns {object} displayContact A contact that can be put into a key value table
 */
function getDisplayCompanyContact (contact) {
  return {
    url: `/contact/${contact.id}/details`,
    name: `${contact.first_name} ${contact.last_name}`,
    job_title: contact.job_title,
    telephone_number: formatPhone(contact.telephone_countrycode, contact.telephone_number),
    email: contact.email,
    added: formatLongDate(contact.created_on)
  }
}

/**
 * Format an archived contact for use in the company screen
 *
 * @param {object} contact
 * @returns {object} displayContact A contact that can be put into a key value table
 */
function getDisplayArchivedCompanyContact (contact) {
  return {
    url: `/contact/${contact.id}/details`,
    name: `${contact.first_name} ${contact.last_name}`,
    job_title: contact.job_title,
    reason: contact.archived_reason
  }
}

module.exports = { getDisplayContact, getDisplayCompanyContact, getDisplayArchivedCompanyContact }