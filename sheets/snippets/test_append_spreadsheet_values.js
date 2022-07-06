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

function testAppendSpreadsheetValues(done) {
  createTestSpreadsheet(function(spreadsheetId) {
    populateValues(spreadsheetId, function(spreadsheetId) {
      appendValues(spreadsheetId, 'Sheet1', 'USER_ENTERED', [
        ['A', 'B'],
        ['C', 'D'],
      ], function(response) {
        assert.equal(response.result.tableRange, 'Sheet1!A1:J10');
        const updates = response.result.updates;
        assert.equal(updates.updatedRows, 2);
        assert.equal(updates.updatedColumns, 2);
        assert.equal(updates.updatedCells, 4);
        done();
      });
    });
  });
}
