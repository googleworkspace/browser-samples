// Copyright 2022 Google LLC
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

// [START sheets_pivot_tables]
function pivotTable(spreadsheetId, callback) {
  // Create two sheets for our pivot table
  const requests = [{
    addSheet: {},
  }, {
    addSheet: {},
  }];
  const batchUpdateRequest = {requests: requests};
  try {
    gapi.client.sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: batchUpdateRequest,
    }).then((response) => {
      const sourceSheetId = response.result.replies[0].addSheet.properties.sheetId;
      const targetSheetId = response.result.replies[1].addSheet.properties.sheetId;

      const requests = [{
        updateCells: {
          rows: {
            values: [{
              pivotTable: {
                source: {
                  sheetId: sourceSheetId,
                  startRowIndex: 0,
                  startColumnIndex: 0,
                  endRowIndex: 20,
                  endColumnIndex: 7,
                },
                rows: [{
                  sourceColumnOffset: 1,
                  showTotals: true,
                  sortOrder: 'ASCENDING',
                }],
                columns: [{
                  sourceColumnOffset: 4,
                  sortOrder: 'ASCENDING',
                  showTotals: true,
                }],
                values: [{
                  summarizeFunction: 'COUNTA',
                  sourceColumnOffset: 4,
                }],
                valueLayout: 'HORIZONTAL',
              },
            },
            ],
          },
          start: {
            sheetId: targetSheetId,
            rowIndex: 0,
            columnIndex: 0,
          },
          fields: 'pivotTable',
        },
      }];

      const body = {
        requests,
      };
      gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: spreadsheetId,
        resource: body,
      }).then((response) => {
        if (callback) callback(response);
      });
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
// [END sheets_pivot_tables]
