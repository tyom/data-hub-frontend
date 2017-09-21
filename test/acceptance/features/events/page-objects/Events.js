module.exports = {
  url: process.env.QA_HOST + '/events/create',
  props: {},
  elements: {
    eventName: 'input[name="name"]',
    eventType: 'select[name="event_type"]',
    startDateYear: 'input[name="start_date_year"]',
    startDateMonth: 'input[name="start_date_month"]',
    startDateDay: 'input[name="start_date_day"]',
    endDateYear: 'input[name="end_date_year"]',
    endDateMonth: 'input[name="end_date_month"]',
    endDateDay: 'input[name="end_date_day"]',
    locationType: 'select[name="location_type"]',
    addressLine1: 'input[name="address_1"]',
    addressLine2: 'input[name="address_2"]',
    addressTown: 'input[name="address_town"]',
    addressCounty: 'input[name="address_county"]',
    addressPostcode: 'input[name="postcode"]',
    addressCountry: 'select[name="address_country"]',
    notes: 'textarea[name="notes"]',
    teamHosting: 'select[name="lead_team"]',
    organiser: 'select[name="organiser"]',
    sharedYesContainer: '#group-field-event_shared div div',
    sharedNoContainer: '#group-field-event_shared div div:nth-child(2)',
    sharedYes: 'label[for=field-event_shared-1]',
    sharedNo: 'label[for=field-event_shared-2]',
    sharedTeams: '#field-teams',
    addAnotherSharedTeam: 'input[name="add_team"]',
    relatedProgrammes: '#field-related_programmes',
    addAnotherProgramme: 'input[name="add_related_programme"]',
    saveButton: {
      selector: '//button[text() = \'Save and Continue\']',
      locateStrategy: 'xpath',
    },
    // Event details page
    eventNameFromDetails: 'a',
    eventTypeFromDetails: 'a',
    additionalRefCodeFromDetails: 'a',
    startDateFromDetails: 'a',
    endDateFromDetails: 'a',
    locationTypeFromDetails: 'a',
    addressLine1FromDetails: 'a',
    addressLine2FromDetails: 'a',
    addressTownFromDetails: 'a',
    addressPostcodeFromDetails: 'a',
    addressCountryFromDetails: 'a',
    notesFromDetails: 'a',
    teamHostingFromDetails: 'a',
    organiserFromDetails: 'a',
    sharedYesFromDetails: 'a',
    sharedTeamsFromDetails: 'a',
    relatedProgrammesFromDetails: 'a',
  },

  commands: [
    {
      selectTeam (optionNumber) {
        return this
          .click('select[name="teams"] option:nth-child(' + optionNumber + ')')
      },
      assertVisibleSharedTeamList (listNumber) {
        return this
          .assert.visible('#group-field-teams #group-field-teams:nth-child(' + listNumber + ') select')
      },
      selectRelatedProgramme (optionNumber) {
        return this
          .click('select[name="related_programmes"] option:nth-child(' + optionNumber + ')')
      },
      assertVisibleProgrammesList (listNumber) {
        return this
          .assert.visible('#group-field-related_programmes #group-field-related_programmes:nth-child(' + listNumber + ') select')
      },
    },
  ],
}