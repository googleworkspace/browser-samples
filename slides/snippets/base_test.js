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

var filesToDelete = [];
function deleteFileOnCleanup(fileId) {
  filesToDelete.push(fileId);
}

function tearDown() {
  for (var i = 0; i < filesToDelete.length; ++i) {
    var presentationId = filesToDelete[i];
    gapi.client.drive.files.delete({
      fileId: presentationId
    });
  }
}

function createTestPresentation(callback) {
  gapi.client.slides.presentations.create({
    title: 'Test Preso'
  }).then(function(data) {
    deleteFileOnCleanup(data.result.presentationId);
    callback(data.result.presentationId);
  });
}

function addSlides(presentationId, num, layout, callback) {
  var requests = [];
  var slideIds = [];
  for (var i = 0; i < num; ++i) {
    slideIds.push(`slide_${i}`);
    requests.push({
      createSlide: {
        objectId: slideIds[i],
        slideLayoutReference: {
          predefinedLayout: layout
        }
      }
    })
  }
  var response = gapi.client.slides.presentations.batchUpdate({
    presentationId: presentationId,
    requests: requests
  }).then((response) => {
    callback(slideIds);
  });
}

function createTestTextbox(presentationId, pageId, callback) {
  var boxId = 'MyTextBox_01';
  var pt350 = {
    magnitude: 350,
    unit: 'PT'
  };
  var requests = [{
    createShape: {
      objectId: boxId,
      shapeType: 'TEXT_BOX',
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: pt350,
          width: pt350
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 350,
          translateY: 100,
          unit: 'PT'
        }
      }
    }
  }, {
    insertText: {
        objectId: boxId,
        insertionIndex: 0,
        text: 'New Box Text Inserted'
    }
  }];
  var response = gapi.client.slides.presentations.batchUpdate({
    presentationId, presentationId,
    requests: requests
  }).then((createTextboxResponse) => {
    callback(createTextboxResponse.result.replies[0].createShape.objectId);
  });
}

function createTestSheetsChart(presentationId, pageId, spreadsheetId, sheetChartId, callback) {
  var chartId = 'MyChart_01';
  var emu4M = {
    magnitude: 4000000,
    unit: 'EMU'
  };
  var requests = [{
    createSheetsChart: {
      objectId: chartId,
      spreadsheetId: spreadsheetId,
      chartId: sheetChartId,
      linkingMode: 'LINKED',
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: emu4M,
          width: emu4M
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 100000,
          translateY: 100000,
          unit: 'EMU'
        }
      }
    }
  }];
  var response = gapi.client.slides.presentations.batchUpdate({
    presentationId, presentationId,
    requests: requests
  }).then((createSheetsChartResponse) => {
    callback(createSheetsChartResponse.result.replies[0].createSheetsChart.objectId);
  });
}
