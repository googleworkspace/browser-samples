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
function textMerging(templatePresentationId, dataSpreadsheetId, callback) {
  // [START slides_text_merging]
  // Use the Sheets API to load data, one record per row.
  var responses = [];
  var dataRangeNotation = 'Customers!A2:M6';
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: dataSpreadsheetId,
    range: dataRangeNotation
  }).then((sheetsResponse) => {
    var values = sheetsResponse.result.values;

    // For each record, create a new merged presentation.
    for (var i = 0; i < values.length; ++i) {
      var row = values[i];
      var customerName = row[2]; // name in column 3
      var caseDescription = row[5]; // case description in column 6
      var totalPortfolio = row[11]; // total portfolio in column 12

      // Duplicate the template presentation using the Drive API.
      var copyTitle = customerName + ' presentation';
      var request = {
        name: copyTitle
      };
      gapi.client.drive.files.copy({
        fileId: templatePresentationId,
        requests: request
      }).then((driveResponse) => {
        var presentationCopyId = driveResponse.result.id;

        // Create the text merge (replaceAllText) requests for this presentation.
        var requests = [{
          replaceAllText: {
            containsText: {
              text: '{{customer-name}}',
              matchCase: true
            },
            replaceText: customerName
          }
        }, {
          replaceAllText: {
            containsText: {
              text: '{{case-description}}',
              matchCase: true
            },
            replaceText: caseDescription
          }
        }, {
          replaceAllText: {
            containsText: {
              text: '{{total-portfolio}}',
              matchCase: true
            },
            replaceText: totalPortfolio
          }
        }];

        // Execute the requests for this presentation.
        gapi.client.slides.presentations.batchUpdate({
          presentationId: presentationCopyId,
          requests: requests
        }).then((batchUpdateResponse) => {
        try{
          var result = batchUpdateResponse.result;
          // [START_EXCLUDE silent]
          responses.push(result.replies);
          // [END_EXCLUDE]
          // Count the total number of replacements made.
          var numReplacements = 0;
          for (var i = 0; i < result.replies.length; ++i) {
            numReplacements += result.replies[i].replaceAllText.occurrencesChanged;
          }
          console.log(`Created presentation for ${customerName} with ID: ${presentationCopyId}`);
          console.log(`Replaced ${numReplacements} text instances`);
          // [START_EXCLUDE silent]
          if (responses.length === values.length) { // callback for the last value
            if(callback) callback(responses);
          }
          } catch(ex){console.log(ex.message)}
          // [END_EXCLUDE]
        });
      });
    }
  });
  // [END slides_text_merging]
}