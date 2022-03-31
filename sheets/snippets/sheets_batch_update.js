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
function batchUpdate(spreadsheetId, title, find, replacement, callback) {
    try
    {
        // [START sheets_batch_update]
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
        try{
          var findReplaceResponse = response.result.replies[1].findReplace;
          console.log(`${findReplaceResponse.occurrencesChanged} replacements made.`);
          // [START_EXCLUDE silent]
          if (callback) callback(response);
          // [END_EXCLUDE]
          } catch(ex){console.log(ex.message)}
        });
     }
     catch(err)
     {
     console.log("error occur")
     }
        // [END sheets_batch_update]
      }