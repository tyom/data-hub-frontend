const { sortBy } = require('lodash')

const { EditController } = require('../../../controllers')
const { getAdvisers } = require('../../../../adviser/repos')
const { transformObjectToOption } = require('../../../../transformers')

class EditSubscribersController extends EditController {
  async configure (req, res, next) {
    const advisers = await getAdvisers(req.session.token)
    const options = advisers.results.map(transformObjectToOption)

    req.form.options.fields.subscribers.options = sortBy(options, 'label')
    super.configure(req, res, next)
  }
}

module.exports = EditSubscribersController