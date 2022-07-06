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
// [START sheets_get_values]
function getValues(spreadsheetId, range, callback) {
  try {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    }).then((response) => {
      const result = response.result;
      const numRows = result.values ? result.values.length : 0;
      console.log(`${numRows} rows retrieved.`);
      if (callback) callback(response);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
// [END sheets_get_values]
