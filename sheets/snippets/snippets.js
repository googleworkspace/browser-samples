// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function create(title, callback) {
  // [START create]
  gapi.client.sheets.spreadsheets.create({
    properties: {
      title: title
    }
  }).then((response) => {
    // [START_EXCLUDE silent]
    callback(response);
    console.log('Spreadsheet ID: ' + response.result.spreadsheetId);
    // [END_EXCLUDE]
  });
  // [END create]
}

function batchUpdate(spreadsheetId, title, find, replacement, callback) {
  // [START batchUpdate]
  var requests = [];
  // Change the spreadsheet's title.
  requests.push({
    updateSpreadsheetProperties: {
      properties: {
        title: title
      },
      fields: 'title'
    }
  });
  // Find and replace text.
  requests.push({
    findReplace: {
      find: find,
      replacement: replacement,
      allSheets: true
    }
  });
  // Add additional requests (operations) ...

  var batchUpdateRequest = {requests: requests}

  gapi.client.sheets.spreadsheets.batchUpdate({
    spreadsheetId: spreadsheetId,
    resource: batchUpdateRequest
  }).then((response) => {
    var findReplaceResponse = response.result.replies[1].findReplace;
    console.log(`${findReplaceResponse.occurrencesChanged} replacements made.`);
    // [START_EXCLUDE silent]
    callback(response);
    // [END_EXCLUDE]
  });
  // [END batchUpdate]
}

function getValues(spreadsheetId, range, callback) {
  // [START getValues]
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range
  }).then((response) => {
    var result = response.result;
    var numRows = result.values ? result.values.length : 0;
    console.log(`${numRows} rows retrieved.`);
    // [START_EXCLUDE silent]
    callback(response);
    // [END_EXCLUDE]
  });
  // [END getValues]
}

function batchGetValues(spreadsheetId, _ranges, callback) {
  // [START batchGetValues]
  var ranges = [
    // Range names ...
  ];
  // [START_EXCLUDE silent]
  ranges = _ranges;
  // [END_EXCLUDE]
  gapi.client.sheets.spreadsheets.values.batchGet({
     spreadsheetId: spreadsheetId,
     ranges: ranges
  }).then((response) => {
    var result = response.result;
    console.log(`${result.valueRanges.length} ranges retrieved.`);
    // [START_EXCLUDE silent]
    callback(response);
    // [END_EXCLUDE]
  });
  // [END batchGetValues]
}

function updateValues(spreadsheetId, range, valueInputOption, _values, callback) {
  // [START updateValues]
  var values = [
    [
      // Cell values ...
    ],
    // Additional rows ...
  ];
  // [START_EXCLUDE silent]
  values = _values;
  // [END_EXCLUDE]
  var body = {
    values: values
  };
  gapi.client.sheets.spreadsheets.values.update({
     spreadsheetId: spreadsheetId,
     range: range,
     valueInputOption: valueInputOption,
     resource: body
  }).then((response) => {
    var result = response.result;
    console.log(`${result.updatedCells} cells updated.`);
    // [START_EXCLUDE silent]
    callback(response);
    // [END_EXCLUDE]
  });
}

function batchUpdateValues(spreadsheetId, range, valueInputOption, _values, callback) {
  // [START batchUpdateValues]
  var values = [
    [
      // Cell values ...
    ],
    // Additional rows ...
  ];
  // [START_EXCLUDE silent]
  values = _values;
  // [END_EXCLUDE]
  var data = [];
  data.push({
    range: range,
    values: values
  });
  // Additional ranges to update.

  var body = {
    data: data,
    valueInputOption: valueInputOption
  };
  gapi.client.sheets.spreadsheets.values.batchUpdate({
     spreadsheetId: spreadsheetId,
     resource: body
  }).then((response) => {
    var result = response.result;
    console.log(`${result.totalUpdatedCells} cells updated.`);
    // [START_EXCLUDE silent]
    callback(response);
    // [END_EXCLUDE]
  });
  // [END batchUpdateValues]
}

function appendValues(spreadsheetId, range, valueInputOption, _values, callback) {
  // [START appendValues]
  var values = [
    [
      // Cell values ...
    ],
    // Additional rows ...
  ];
  // [START_EXCLUDE silent]
  values = _values;
  // [END_EXCLUDE]
  var body = {
    values: values
  };
  gapi.client.sheets.spreadsheets.values.append({
     spreadsheetId: spreadsheetId,
     range: range,
     valueInputOption: valueInputOption,
     resource: body
  }).then((response) => {
    var result = response.result;
    console.log(`${result.updates.updatedCells} cells appended.`)
    // [START_EXCLUDE silent]
    callback(response);
    // [END_EXCLUDE]
  });
  // [END appendValues]
}


function pivotTable(spreadsheetId, callback) {
  // Create two sheets for our pivot table
  var requests = [{
    addSheet: {}
  }, {
    addSheet: {}
  }];
  var batchUpdateRequest = {requests: requests};
  gapi.client.sheets.spreadsheets.batchUpdate({
    spreadsheetId: spreadsheetId,
    resource: batchUpdateRequest
  }).then((response) => {
    var sourceSheetId = response.result.replies[0].addSheet.properties.sheetId;
    var targetSheetId = response.result.replies[1].addSheet.properties.sheetId;
    // [START pivotTable]
    var requests = [{
      updateCells: {
        rows: {
           values: [{
              pivotTable: {
                source: {
                  sheetId: sourceSheetId,
                  startRowIndex: 0,
                  startColumnIndex: 0,
                  endRowIndex: 101,
                  endColumnIndex: 8
                },
                rows: [{
                  sourceColumnOffset: 6,
                  showTotals: true,
                  sortOrder: 'ASCENDING',
                }],
                columns: [{
                  sourceColumnOffset: 3,
                  sortOrder: 'ASCENDING',
                  showTotals: true,
                }],
                values: [{
                  summarizeFunction: 'COUNTA',
                  sourceColumnOffset: 3
                }],
                valueLayout: 'HORIZONTAL'
              }
            }
          ]
        },
        start: {
          sheetId: targetSheetId,
          rowIndex: 0,
          columnIndex: 0
        },
        fields: 'pivotTable'
      }
    }];

    var body = {
      requests
    };
    gapi.client.sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: body
    }).then((response) => {
      // [START_EXCLUDE silent]
      callback(response);
      // [END_EXCLUDE]
    });
    // [END pivotTable]
  });
}

function conditionalFormatting(spreadsheetId, callback) {
  // [START conditionalFormatting]
  var myRange = {
    sheetId: 0,
    startRowIndex: 1,
    endRowIndex: 11,
    startColumnIndex: 0,
    endColumnIndex: 4,
  };
  var requests = [{
    addConditionalFormatRule: {
      rule: {
        ranges: [ myRange ],
        booleanRule: {
          condition: {
            type: 'CUSTOM_FORMULA',
            values: [ { userEnteredValue: '=GT($D2,median($D$2:$D$11))' } ]
          },
          format: {
            textFormat: { foregroundColor: { red: 0.8 } }
          }
        }
      },
      index: 0
    }
  }, {
    addConditionalFormatRule: {
      rule: {
        ranges: [ myRange ],
        booleanRule: {
          condition: {
            type: 'CUSTOM_FORMULA',
            values: [ { userEnteredValue: '=LT($D2,median($D$2:$D$11))' } ]
          },
          format: {
            backgroundColor: { red: 1, green: 0.4, blue: 0.4 }
          }
        }
      },
      index: 0
    }
  }];

  var body = {
    requests
  };
  gapi.client.sheets.spreadsheets.batchUpdate({
    spreadsheetId: spreadsheetId,
    resource: body
  }).then((response) => {
    var result = response.result;
    console.log(`${result.replies.length} cells updated.`);
    // [START_EXCLUDE silent]
    callback(response);
    // [END_EXCLUDE]
  });
  // [END conditionalFormatting]
};
