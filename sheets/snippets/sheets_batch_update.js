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
// [START sheets_batch_update]
function batchUpdate(spreadsheetId, title, find, replacement, callback) {
  const requests = [];
  // Change the spreadsheet's title.
  requests.push({
    updateSpreadsheetProperties: {
      properties: {
        title: title,
      },
      fields: 'title',
    },
  });
  // Find and replace text.
  requests.push({
    findReplace: {
      find: find,
      replacement: replacement,
      allSheets: true,
    },
  });
  try {
    // Add additional requests (operations) ...
    const batchUpdateRequest = {requests: requests};
    gapi.client.sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: batchUpdateRequest,
    }).then((response) => {
      const findReplaceResponse = response.result.replies[1].findReplace;
      console.log(`${findReplaceResponse.occurrencesChanged} replacements made.`);
      if (callback) callback(response);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
//  [END sheets_batch_update]
