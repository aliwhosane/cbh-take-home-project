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

**Ticket 1: Add custom ID field for Facilities to Agent Table**

Description:
Add a new custom_id field to the Agents table that will allow Facilities to assign their own custom identifier to each Agent. This field should be nullable and have a unique constraint to ensure that no two Agents have the same custom_id value.

Acceptance Criteria:

A new nullable column named custom_id has been added to the Agents table.
The custom_id column has a unique constraint to prevent duplicates.
The API endpoint for creating and updating Agents has been updated to accept the new custom_id field.
Existing Agents have a null custom_id value by default.

Time/Effort estimate:
2-3 hours

Implementation Details:

Create a new migration to add the custom_id column to the Agents table.
Update the Agents model and validation rules to include the new custom_id field.
Update the create and update endpoints for Agents to accept the new custom_id field.
Write tests to ensure the new functionality is working as expected.

NOTE: Assumption is that Agents are bound by facilities and does not have multiple agencies. In which case we would have to create a sepearate table connecting the 2 instead of adding a field

**Ticket 2: Update getShiftsByFacility to include custom Agent IDs**

Description:
Update the getShiftsByFacility function to include the custom_id field for each Agent in the Shifts data returned. This will allow the custom Agent IDs to be included in the report generation process.

Acceptance Criteria:

The getShiftsByFacility function now returns a list of Shifts including the custom_id field for each Agent.
The custom_id field is included in the Shifts metadata returned to the Facility.

Time/Effort estimate:
1-2 hours

Implementation Details:

Update the query in the getShiftsByFacility function to include the custom_id field for each Agent.
Update the Shifts metadata returned to the Facility to include the custom_id field.
Write tests to ensure the new functionality is working as expected.

**Ticket 3: Update generateReport to use custom Agent IDs**

Description:
Update the generateReport function to use the custom_id field instead of the internal database id when creating the report. This will allow the report to use the custom Agent IDs assigned by the Facilities.

Acceptance Criteria:

The generateReport function now uses the custom_id field instead of the internal database id when creating the report.
The report generated now includes the custom Agent IDs assigned by the Facility.

Time/Effort estimate:
1-2 hours

Implementation Details:

Update the generateReport function to use the custom_id field for each Agent instead of the internal database id.
Update the report generation process to include the custom Agent IDs.
Write tests to ensure the new functionality is working as expected.
