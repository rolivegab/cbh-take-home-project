# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

# EPIC \#1 - [Feature] Show custom Agent ID in generated reports

### Background

Today we currently are sending Agent internal IDs in generated reports. This is not a good practice as it unnecessarily reveals vulnerable information and also makes the generated report not look user-friendly.

We need to remove Agent IDs from generated reports and replace them with custom IDs, which will be generated from their own Facility.

Every Agent should have its own `customId`, so it'll be possible to identify them on generated report.

## Task \#1 - Add a new Custom ID column at Agent's table

#### Background

As internal engineers, we need to add a new column `customId` to store a custom ID that will sent by Facility's admin.
See more information on related epic TASK [here](#epic-1---feature-show-custom-agent-id-in-generated-reports)

Story points: `3`

#### Acceptance criteria
- [ ] Column needs to have type TEXT, non nullable, and have a maximum size of 255.
You should
- [ ] Column should be unique for each facility (an agent cant be assigned to multiple facilities), unique contraint should be named `UQ_AGENT_CUSTOM_ID_FACILITY_ID`
- [ ] For existing users, you need to generate a unique ID by using Agent's name, last name and timestamp field, following this format: `<firstname>_<lastname>_<timestamp>`

## Task \#2 - Add a new parameter "customId" to create agent endpoint
#### Background

As internal engineers, we need to make sure that our create agent endpoint are validating and storing new `customId` column.
See more information on related epic TASK [here](#epic-1---feature-show-custom-agent-id-in-generated-reports)

Story points: `5`

#### Acceptance criteria

- [ ] Update DTO `createAgentDTO` to validate a new required parameter `customId` with type string and maximum size of `255`.
- [ ] `customId` should have only lowercase english letters, digits and underscore
- [ ] Store received `customId` into `Agent` table
- [ ] Update unit tests to validate controller input validation for parameter `customId`
- [ ] Update integration tests to check that `customId` are being stored on database
- [ ] In case of duplicate constraint, endpoint should return an `409` indicating that we have a conflict. Make sure to return a response body with json content `custom_id_must_be_unique` so the client can handle this error.

## Task \#3 - Update generate report endpoint to show Custom ID in Agent's information

#### Background

As facility admin, I want that my generated report doesn't have any internal database IDs. Instead, I would like to see custom IDs that it was assigned to each Agent at the moment they were created.

As facility admin, if an Agent was created in the past, I would like to see a friendly custom ID, that is stored into Agent's table.
See more information on related epic TASK [here](#epic-1---feature-show-custom-agent-id-in-generated-reports)

Story points: `2`

#### Acceptance criteria

- [ ] Update `generateReport` function to replace internal database agent ID into `customId`
- [ ] Manual test to check that report are correct and sending right information

## Task \#4 - Add a new field "Custom ID" to create agent screen

#### Background

As a facility admin, I would like to be assign a new "Custom ID" by filling a input form on the user interface, so it'll be possible to store a friendly reference to that specific Agent.
See more information on related epic TASK [here](#epic-1---feature-show-custom-agent-id-in-generated-reports)

Story points: `3`

#### Acceptance criteria
- [ ] Client must validate the input to accept only lowercase english letters, digits and underscore
- [ ] When user press SPACE, interface needs to add a underscore '_' instead.
- [ ] In case of duplicate constraint, update error screen to explain that agent's custom ID already exists for that facility
- [ ] Create unit test to check if input validations are being respected