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
// [START slides_text_merging]
function textMerging(templatePresentationId, dataSpreadsheetId, callback) {
  // Use the Sheets API to load data, one record per row.
  const responses = [];
  const dataRangeNotation = 'Customers!A2:M6';
  try {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: dataSpreadsheetId,
      range: dataRangeNotation,
    }).then((sheetsResponse) => {
      const values = sheetsResponse.result.values;
      // For each record, create a new merged presentation.
      for (let i = 0; i < values.length; ++i) {
        const row = values[i];
        const customerName = row[2]; // name in column 3
        const caseDescription = row[5]; // case description in column 6
        const totalPortfolio = row[11]; // total portfolio in column 12

        // Duplicate the template presentation using the Drive API.
        const copyTitle = customerName + ' presentation';
        const request = {
          name: copyTitle,
        };
        gapi.client.drive.files.copy({
          fileId: templatePresentationId,
          requests: request,
        }).then((driveResponse) => {
          const presentationCopyId = driveResponse.result.id;

          // Create the text merge (replaceAllText) requests for this presentation.
          const requests = [{
            replaceAllText: {
              containsText: {
                text: '{{customer-name}}',
                matchCase: true,
              },
              replaceText: customerName,
            },
          }, {
            replaceAllText: {
              containsText: {
                text: '{{case-description}}',
                matchCase: true,
              },
              replaceText: caseDescription,
            },
          }, {
            replaceAllText: {
              containsText: {
                text: '{{total-portfolio}}',
                matchCase: true,
              },
              replaceText: totalPortfolio,
            },
          }];

          // Execute the requests for this presentation.
          gapi.client.slides.presentations.batchUpdate({
            presentationId: presentationCopyId,
            requests: requests,
          }).then((batchUpdateResponse) => {
            const result = batchUpdateResponse.result;
            responses.push(result.replies);
            // Count the total number of replacements made.
            let numReplacements = 0;
            for (let i = 0; i < result.replies.length; ++i) {
              numReplacements += result.replies[i].replaceAllText.occurrencesChanged;
            }
            console.log(`Created presentation for ${customerName} with ID: ${presentationCopyId}`);
            console.log(`Replaced ${numReplacements} text instances`);
            if (responses.length === values.length) { // callback for the last value
              if (callback) callback(responses);
            }
          });
        });
      }
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
// [END slides_text_merging]
