@investment-project-stages
Feature: Investment project stages
  As an existing user
  I would like to view different stages of Investment Project
  And be able to move the project to Won stage


# Prospect stage journeys:

  Scenario: Update requirements section under Prospect stage
    Given I am an authenticated Client relationship manager user on Data Hub website
    When I navigate to my Investment project
    And I enter all required fields for Requirements section under Details tab
    And I click on Save button
    Then I verify that all fields are populated correctly for Requirements section

  Scenario: Update location section under Prospect stage
    Given I am an authenticated Client relationship manager user on Data Hub website
    When I navigate to my Investment project
    And I enter all required fields for location section under Details tab
    And I click on Save button
    Then I verify that all fields are populated correctly for location section


  Scenario: Update Value section under Prospect stage
    Given I am an authenticated Client relationship manager user on Data Hub website
    When I navigate to my Investment project
    And I enter all required fields for Value section under Details tab
    And I click on Save button
    Then I verify that all fields are populated correctly for Value section


  Scenario: Move project from Prospect stage to Assign PM stage
    Given I am an authenticated Client relationship manager user on Data Hub website
    When I navigate to my Investment project
    And I enter all required fields for Requirements section under Details tab
    And I enter all required fields for location section under Details tab
    And I enter all required fields for Value section under Details tab
    And I click on Save button
    Then I verify that Assign PM stage button is enabled
    When I click on Assign PM stage button
    Then I verify the stage of the project is updated from Prospect stage to Assign PM stage


  Scenario: Email verification when project moves from Prospect stage to Assign PM stage
    Given I am an authenticated Client relationship manager user on Data Hub website
    When I navigate to my Investment project
    And I enter all required fields for Requirements section under Details tab
    And I enter all required fields for location section under Details tab
    And I enter all required fields for Value section under Details tab
    And I click on Save button
    Then I verify that Assign PM stage button is enabled
    When I click on Assign PM stage button
    Then I verify an Email is sent to Investment services team (IST)


  Scenario Outline: Changing the Project states in Prospect stage
    Given I am an authenticated Client relationship manager user on Data Hub website
    When I navigate to my Investment project
    Then I verify the project is in Ongoing state
    When I change the state to <state>
    Then I verify the project state is changed to <state>

    Examples:
    |state|
    |Delayed|
    |Dormant|
    |Abandoned|
    |Lost|
    |Ongoing|


#Assign PM stage journeys:

  Scenario: Update Project Manager section under Assign PM stage
    Given I am an authenticated Investment services team user on Data Hub website
    When I navigate to my Investment project within Assign PM stage
    And I enter all required fields for Project Manager section under Project team tab
    And I click on Save button
    Then I verify that all fields are populated correctly for Project Manager section


  Scenario: Update Project Assurance section under Assign PM stage
    Given I am an authenticated Investment services team user on Data Hub website
    When I navigate to my Investment project within Assign PM stage
    And I enter all required fields for Project Assurance section under Project team tab
    And I click on Save button
    Then I verify that all fields are populated correctly for Project Assurance section


  Scenario: Move project from Assign PM stage to Active stage
    Given I am an authenticated Investment services team user on Data Hub website
    When I navigate to my Investment project within Assign PM stage
    And I enter all required fields for Project Manager section under Project team tab
    And I enter all required fields for Project Assurance section under Project team tab
    And I click on Save button
    Then I verify that Active stage button is enabled under Project team tab
    When I click on Active stage button
    Then I verify the stage of the project is updated from Assign PM stage to Active stage


  Scenario: Email verification when project moves from Assign PM stage to Active stage
    Given I am an authenticated Investment services team user on Data Hub website
    When I navigate to my Investment project within Assign PM stage
    And I enter all required fields for Project Manager section under Project team tab
    And I enter all required fields for Project Assurance section under Project team tab
    And I click on Save button
    Then I verify that Active stage button is enabled under Project team tab
    When I click on Active stage button
    Then I verify an Email is sent to Allocated project manager
    And I verify an Email is sent to Allocated project assurance manager


#Active stage journeys:

  Scenario: Update Investment project summary section under Active stage
    Given I am an authenticated Allocated Project Manager user on Data Hub website
    When I navigate to my Investment project within Active stage
    And I enter actual landing date under Investment details tab
    And I upload an Evidence under Investment details tab
    And I click on Save button
    Then I verify that all fields are populated correctly for Investment project summary section


  Scenario: Update Requirements and Location section under Active stage
    Given I am an authenticated Allocated Project Manager user on Data Hub website
    When I navigate to my Investment project within Active stage
    And I enter Investment location under Investment details tab
    And I enter UK Company under Investment details tab
    And I upload an Evidence under Investment details tab
    And I click on Save button
    Then I verify that all fields are populated correctly for Requirements and Location section


  Scenario: Update Value section under Active stage
    Given I am an authenticated Allocated Project Manager user on Data Hub website
    When I navigate to my Investment project within Active stage
    And I upload an Evidence for Value section under Investment details tab
    And I click on Save button
    Then I verify that all fields are populated correctly for Value section


  Scenario: Move project from Active stage to Verify Win stage
    Given I am an authenticated Allocated Project Manager user on Data Hub website
    When I navigate to my Investment project within Active stage
    And I enter actual landing date under Investment details tab
    And I upload an Evidence under Investment details tab
    And I enter Investment location under Investment details tab
    And I enter UK Company under Investment details tab
    And I upload an Evidence under Investment details tab
    And I upload an Evidence for Value section under Investment details tab
    And I click on Save button
    Then I verify that Verify Win stage button is enabled under Investment details tab
    When I click on Verify Win stage button
    Then I verify the stage of the project is updated from Active stage to Verify Win stage


  Scenario: Email verification when project moves from Active stage to Verify Win stage
    Given I am an authenticated Allocated Project Manager user on Data Hub website
    When I navigate to my Investment project within Active stage
    And I enter actual landing date under Investment details tab
    And I upload an Evidence under Investment details tab
    And I enter Investment location under Investment details tab
    And I enter UK Company under Investment details tab
    And I upload an Evidence under Investment details tab
    And I upload an Evidence for Value section under Investment details tab
    And I click on Save button
    Then I verify that Verify Win stage button is enabled under Investment details tab
    When I click on Verify Win stage button
    Then I verify an Email is sent to Allocation Team


  Scenario Outline: Changing the Project states in Active stage
    Given I am an authenticated Allocated Project Manager user on Data Hub website
    When I navigate to my Investment project within Active stage
    Then I verify the project is in Ongoing state
    When I change the state to <state>
    Then I verify the project state is changed to <state>

    Examples:
    |state|
    |Delayed|
    |Dormant|
    |Abandoned|
    |Lost|
    |Ongoing|


#Verify Win stage journeys:

  Scenario: Access and Update all sections under Verify Win stage
    Given I am an authenticated Verification Team user on Data Hub website
    When I navigate to my Investment project within Verify Win stage
    And I access all the sections to verify any pending information under Evaluation tab
    And I update any pending information found under Evaluation tab
    And I click on Save button
    Then I verify that all fields are populated correctly under Evaluation tab


  Scenario: Move project from Verify Win stage to Won stage
    Given I am an authenticated Verification Team user on Data Hub website
    When I navigate to my Investment project within Verify Win stage
    And I access all the sections to verify any pending information under Evaluation tab
    And I update any pending information found under Evaluation tab
    And I click on Save button
    Then I verify that Won stage button is enabled under Evaluation tab
    When I click on Won stage button
    Then I verify the stage of the project is updated from Verify Win stage to Won stage


  Scenario: Email verification when project moves from Active stage to Verify Win stage
    Given I am an authenticated Verification Team user on Data Hub website
    When I navigate to my Investment project within Verify Win stage
    And I access all the sections to verify any pending information under Evaluation tab
    And I update any pending information found under Evaluation tab
    And I click on Save button
    Then I verify that Won stage button is enabled under Evaluation tab
    When I click on Won stage button
    Then I verify an Email is sent to Allocated project manager
    And I verify an Email is sent to Allocated project assurance manager


  Scenario: Verify the Project state in Verify win stage
    Given I am an authenticated Verification Team user on Data Hub website
    When I navigate to my Investment project within Verify Win stage
    Then I verify the project is in Ongoing state


  Scenario: Verify the Project state in Won stage
    Given I am an authenticated Allocated project manager user on Data Hub website
    When I navigate to my Investment project within Won stage
    Then I verify the project is in Won state