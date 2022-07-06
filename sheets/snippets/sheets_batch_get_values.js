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
// [START sheets_batch_get_values]
function batchGetValues(spreadsheetId, _ranges, callback) {
  let ranges = [
    // Range names ...
  ];
  ranges = _ranges;
  try {
    gapi.client.sheets.spreadsheets.values.batchGet({
      spreadsheetId: spreadsheetId,
      ranges: ranges,
    }).then((response) => {
      const result = response.result;
      console.log(`${result.valueRanges.length} ranges retrieved.`);
      if (callback) callback(response);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
//  [END sheets_batch_get_values]
