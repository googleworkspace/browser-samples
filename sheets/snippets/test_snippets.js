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

var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
];
var SCOPES = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets"
];

// DOM
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  console.log('Loaded client');
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: '473749893102-knvjm7o30up30hsub6e8oglj32571of1.apps.googleusercontent.com',
    scope: SCOPES.join(' '),
  }).then(() => {
    console.log('Initiated client');
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

function testCreateSpreadsheet(done) {
  create('Title', (response) => {
    console.log(`Created spreadsheet with ID: ${response.result.spreadsheetId}`);
    assert.isNotNull(response.result.spreadsheetId);
    done();
  });
}

function testBatchUpdateSpreadsheet(done) {
  createTestSpreadsheet(function(spreadsheetId) {
    populateValues(spreadsheetId, function(spreadsheetId) {
      batchUpdate(spreadsheetId, 'New Title', 'Hello', 'Goodbye', function(response) {
        var replies = response.result.replies;
        assert.equal(replies.length, 2);
        var findReplaceResponse = replies[1].findReplace;
        assert.equal(findReplaceResponse.occurrencesChanged, 100);
        done();
      });
    });
  });
}
function testGetSpreadsheetValues(done) {
  createTestSpreadsheet(function(spreadsheetId) {
    populateValues(spreadsheetId, function(spreadsheetId) {
      getValues(spreadsheetId, 'A1:C2', function(response) {
        var values = response.result.values;
        assert.isNotNull(values);
        assert.equal(values[0].length, 3);
        done();
      });
    });
  });
}
function testBatchGetSpreadsheetValues(done) {
  createTestSpreadsheet(function(spreadsheetId) {
    populateValues(spreadsheetId, function(spreadsheetId) {
      batchGetValues(spreadsheetId, ['A1:A3', 'B1:C1'], function(response) {
        var valueRanges = response.result.valueRanges;
        assert.equal(valueRanges.length, 2);
        var values = valueRanges[0].values;
        assert.equal(values.length, 3);
        done();
      });
    });
  });
}
function testUpdateSpreadsheetValues(done) {
  createTestSpreadsheet(function(spreadsheetId) {
    updateValues(spreadsheetId, 'A1:B2', 'USER_ENTERED', [
     ['A', 'B'],
     ['C', 'D']
    ], function(response) {
      var result = response.result;
      assert.equal(result.updatedRows, 2);
      assert.equal(result.updatedColumns, 2);
      assert.equal(result.updatedCells, 4);
      done();
    });
  });
}
function testBatchUpdateSpreadsheetValues(done) {
  createTestSpreadsheet(function(spreadsheetId) {
    batchUpdateValues(spreadsheetId, 'A1:B2', 'USER_ENTERED', [
     ['A', 'B'],
     ['C', 'D']
    ], function(responses) {
      var response = responses.result.responses[0];
      assert.equal(response.updatedRows, 2);
      assert.equal(response.updatedColumns, 2);
      assert.equal(response.updatedCells, 4);
      done();
    });
  });

}
function testAppendSpreadsheetValues(done) {
  createTestSpreadsheet(function(spreadsheetId) {
    populateValues(spreadsheetId, function(spreadsheetId) {
      appendValues(spreadsheetId, 'Sheet1', 'USER_ENTERED', [
        ['A', 'B'],
        ['C', 'D']
      ], function(response) {
        assert.equal(response.result.tableRange, 'Sheet1!A1:J10');
        var updates = response.result.updates;
        assert.equal(updates.updatedRows, 2);
        assert.equal(updates.updatedColumns, 2);
        assert.equal(updates.updatedCells, 4);
        done();
      });
    });
  });
}
function testCreatePivotTables(done) {
  createTestSpreadsheet(function(spreadsheetId) {
    populateValues(spreadsheetId, function(spreadsheetId) {
      pivotTable(spreadsheetId, function(response) {
        assert.isNotNull(response.result);
        done();
      });
    });
  });
}
function testConditionallyFormat(done) {
  createTestSpreadsheet(function(spreadsheetId) {
    populateValues(spreadsheetId, function(spreadsheetId) {
      conditionalFormatting(spreadsheetId, function(response) {
        assert.isNotNull(response.result.spreadsheetId);
        assert.equal(response.result.replies.length, 2);
        done();
      });
    });
  });
}
