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
// [START sheets_batch_update_values]
function batchUpdateValues(spreadsheetId, range, valueInputOption, _values, callback) {
  let values = [
    [
      // Cell values ...
    ],
    // Additional rows ...
  ];
  values = _values;
  const data = [];
  data.push({
    range: range,
    values: values,
  });
  // Additional ranges to update.

  const body = {
    data: data,
    valueInputOption: valueInputOption,
  };
  try {
    gapi.client.sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: body,
    }).then((response) => {
      const result = response.result;
      console.log(`${result.totalUpdatedCells} cells updated.`);
      if (callback) callback(response);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
//  [END sheets_batch_update_values]
