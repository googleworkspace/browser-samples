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
function batchUpdateValues(spreadsheetId, range, valueInputOption, _values, callback) {
try{
  // [START sheets_batch_update_values]
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
  try{
    var result = response.result;
    console.log(`${result.totalUpdatedCells} cells updated.`);
    // [START_EXCLUDE silent]
    if(callback) callback(response);
    }catch(ex)
    {console.log(ex.message)}
    // [END_EXCLUDE]
  });
 }
 catch(err)
 { console.log(err.message)}
  // [END sheets_batch_update_values]
}
