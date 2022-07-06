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

// [START slides_refresh_sheets_chart]
function refreshSheetsChart(presentationId, presentationChartId, callback) {
  const requests = [{
    refreshSheetsChart: {
      objectId: presentationChartId,
    },
  }];
  // Execute the request.
  try {
    gapi.client.slides.presentations.batchUpdate({
      presentationId: presentationId,
      requests: requests,
    }).then((batchUpdateResponse) => {
      console.log(`Refreshed a linked Sheets chart with ID: ${presentationChartId}`);
      if (callback) callback(batchUpdateResponse.result);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
// [END slides_refresh_sheets_chart]
