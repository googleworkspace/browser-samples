// Copyright 2018 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

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

function cleanup() {
  return this.driveService.then((drive) => {
    var deleteFile = Promise.denodeify(drive.files.delete).bind(drive.files);
    return this.filesToDelete.map((id) => deleteFile({fileId: id}));
  });
};

function createTestSpreadsheet(callback) {
  gapi.client.sheets.spreadsheets.create({
    properties: {
      title: 'Test Spreadsheet'
    }
  }).then(function(sheet) {
    deleteFileOnCleanup(sheet.result.spreadsheetId);
    callback(sheet.result.spreadsheetId);
  });
};

function populateValues(spreadsheetId, callback) {
  gapi.client.sheets.spreadsheets.batchUpdate({
    spreadsheetId: spreadsheetId,
    resource: {
      requests: [{
        repeatCell: {
          range: {
            sheetId: 0,
            startRowIndex: 0,
            endRowIndex: 10,
            startColumnIndex: 0,
            endColumnIndex: 10
          },
          cell: {
            userEnteredValue: {
              stringValue: 'Hello'
            }
          },
          fields: 'userEnteredValue'
        }
      }]
    }
  }).then((response) => {
    callback(spreadsheetId);
  });
};
