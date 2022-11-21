// Copyright 2018 Google LLC
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

const filesToDelete = [];
function deleteFileOnCleanup(fileId) {
  filesToDelete.push(fileId);
}

function tearDown() {
  for (let i = 0; i < filesToDelete.length; ++i) {
    const presentationId = filesToDelete[i];
    gapi.client.drive.files.delete({
      fileId: presentationId,
    });
  }
}

function createTestPresentation(callback) {
  gapi.client.slides.presentations
      .create({
        title: 'Test Preso',
      })
      .then(function(data) {
        deleteFileOnCleanup(data.result.presentationId);
        callback(data.result.presentationId);
      });
}

function addSlides(presentationId, num, layout, callback) {
  const requests = [];
  const slideIds = [];
  for (let i = 0; i < num; ++i) {
    slideIds.push(`slide_${i}`);
    requests.push({
      createSlide: {
        objectId: slideIds[i],
        slideLayoutReference: {
          predefinedLayout: layout,
        },
      },
    });
  }
  const response = gapi.client.slides.presentations
      .batchUpdate({
        presentationId: presentationId,
        requests: requests,
      })
      .then((response) => {
        callback(slideIds);
      });
}

function createTestTextbox(presentationId, pageId, callback) {
  const boxId = 'MyTextBox_01';
  const pt350 = {
    magnitude: 350,
    unit: 'PT',
  };
  const requests = [
    {
      createShape: {
        objectId: boxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: pageId,
          size: {
            height: pt350,
            width: pt350,
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 350,
            translateY: 100,
            unit: 'PT',
          },
        },
      },
    },
    {
      insertText: {
        objectId: boxId,
        insertionIndex: 0,
        text: 'New Box Text Inserted',
      },
    },
  ];
  const response = gapi.client.slides.presentations
      .batchUpdate({
        presentationId,
        presentationId,
        requests: requests,
      })
      .then((createTextboxResponse) => {
        callback(createTextboxResponse.result.replies[0].createShape.objectId);
      });
}

function createTestSheetsChart(
    presentationId,
    pageId,
    spreadsheetId,
    sheetChartId,
    callback,
) {
  const chartId = 'MyChart_01';
  const emu4M = {
    magnitude: 4000000,
    unit: 'EMU',
  };
  const requests = [
    {
      createSheetsChart: {
        objectId: chartId,
        spreadsheetId: spreadsheetId,
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
    },
  ];
  const response = gapi.client.slides.presentations
      .batchUpdate({
        presentationId,
        presentationId,
        requests: requests,
      })
      .then((createSheetsChartResponse) => {
        callback(
            createSheetsChartResponse.result.replies[0].createSheetsChart.objectId,
        );
      });
}
