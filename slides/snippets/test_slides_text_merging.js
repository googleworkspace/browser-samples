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

function testTextMerging(done) {
  const TEMPLATE_PRESENTATION_ID = '1dsYAXBA6ms6eOK-fe3ai95Wa6vUR8mMrPT4Jb0B9Wfk';
  const DATA_SPREADSHEET_ID = '1eaI4xAqR2SpC3Ysf7ExOE0JBtXUkZ5YMIYUZ3sPx9_w';
  textMerging(TEMPLATE_PRESENTATION_ID, DATA_SPREADSHEET_ID, function(responses) {
    assert.equal(5, responses.length);
    responses.forEach(function(response) {
      let numReplacements = 0;
      for (let i = 0; i < response.length; ++i) {
        numReplacements += response[i].replaceAllText.occurrencesChanged;
      }
    });
    done();
  });
}
