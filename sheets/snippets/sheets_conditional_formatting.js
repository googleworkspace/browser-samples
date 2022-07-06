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
// [START sheets_conditional_formatting]
function conditionalFormatting(spreadsheetId, callback) {
  const myRange = {
    sheetId: 0,
    startRowIndex: 1,
    endRowIndex: 11,
    startColumnIndex: 0,
    endColumnIndex: 4,
  };
  const requests = [{
    addConditionalFormatRule: {
      rule: {
        ranges: [myRange],
        booleanRule: {
          condition: {
            type: 'CUSTOM_FORMULA',
            values: [{userEnteredValue: '=GT($D2,median($D$2:$D$11))'}],
          },
          format: {
            textFormat: {foregroundColor: {red: 0.8}},
          },
        },
      },
      index: 0,
    },
  }, {
    addConditionalFormatRule: {
      rule: {
        ranges: [myRange],
        booleanRule: {
          condition: {
            type: 'CUSTOM_FORMULA',
            values: [{userEnteredValue: '=LT($D2,median($D$2:$D$11))'}],
          },
          format: {
            backgroundColor: {red: 1, green: 0.4, blue: 0.4},
          },
        },
      },
      index: 0,
    },
  }];

  const body = {
    requests,
  };
  try {
    gapi.client.sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: body,
    }).then((response) => {
      const result = response.result;
      console.log(`${result.replies.length} cells updated.`);
      if (callback) callback(response);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
//  [END sheets_conditional_formatting]
