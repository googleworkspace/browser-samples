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
function batchGetValues(spreadsheetId, _ranges, callback) {
  // [START sheets_batch_get_values]
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
  try{
    var result = response.result;
    console.log(`${result.valueRanges.length} ranges retrieved.`);
    // [START_EXCLUDE silent]
    if(callback) callback(response);
    // [END_EXCLUDE]
    } catch(ex){console.log(ex.message)}
  });
  // [END sheets_batch_get_values]
}