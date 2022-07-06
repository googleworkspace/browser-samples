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

function testBatchUpdateSpreadsheet(done) {
  createTestSpreadsheet(function(spreadsheetId) {
    populateValues(spreadsheetId, function(spreadsheetId) {
      batchUpdate(spreadsheetId, 'New Title', 'Hello', 'Goodbye', function(response) {
        const replies = response.result.replies;
        assert.equal(replies.length, 2);
        const findReplaceResponse = replies[1].findReplace;
        assert.equal(findReplaceResponse.occurrencesChanged, 100);
        done();
      });
    });
  });
}
