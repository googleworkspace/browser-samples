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
// [START slides_create_sheets_chart]
function createSheetsChart(presentationId, pageId, shapeId, sheetChartId, callback) {
  // Embed a Sheets chart (indicated by the spreadsheetId and sheetChartId) onto
  // a page in the presentation. Setting the linking mode as "LINKED" allows the
  // chart to be refreshed if the Sheets version is updated.
  const emu4M = {
    magnitude: 4000000,
    unit: 'EMU',
  };
  const presentationChartId = 'MyEmbeddedChart';
  const requests = [{
    createSheetsChart: {
      objectId: presentationChartId,
      spreadsheetId: shapeId,
      chartId: sheetChartId,
      linkingMode: 'LINKED',
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: emu4M,
          width: emu4M,
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 100000,
          translateY: 100000,
          unit: 'EMU',
        },
      },
    },
  }];
  // Execute the request.
  try {
    gapi.client.slides.presentations.batchUpdate({
      presentationId: presentationId,
      requests: requests,
    }).then((batchUpdateResponse) => {
      console.log(`Added a linked Sheets chart with ID: ${presentationChartId}`);
      if (callback) callback(batchUpdateResponse.result);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
// [END slides_create_sheets_chart]
