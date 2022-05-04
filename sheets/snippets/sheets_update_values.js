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
// [START sheets_update_values]
function updateValues(spreadsheetId, range, valueInputOption, _values, callback) {

  let values = [
    [
      // Cell values ...
    ],
    // Additional rows ...
  ];
  // [START_EXCLUDE silent]
  values = _values;
  // [END_EXCLUDE]
  let body = {
    values: values
  };
  gapi.client.sheets.spreadsheets.values.update({
     spreadsheetId: spreadsheetId,
     range: range,
     valueInputOption: valueInputOption,
     resource: body
  }).then((response) => {
  try
  {
    let result = response.result;
    console.log(`${result.updatedCells} cells updated.`);
    // [START_EXCLUDE silent]
    if(callback) callback(response);
    // [END_EXCLUDE]
  }
  catch(ex)
  {
  console.log("API returned an error",ex.message)
   return;
  }
  });
  // [END sheets_update_values]
}