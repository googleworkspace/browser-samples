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

// [START slides_text_style_update]
function textStyleUpdate(presentationId, shapeId, callback) {
  // Update the text style so that the first 5 characters are bolded
  // and italicized, the next 5 are displayed in blue 14 pt Times
  // New Roman font, and the next 5 are hyperlinked.
  const requests = [{
    updateTextStyle: {
      objectId: shapeId,
      textRange: {
        type: 'FIXED_RANGE',
        startIndex: 0,
        endIndex: 5,
      },
      style: {
        bold: true,
        italic: true,
      },
      fields: 'bold,italic',
    },
  }, {
    updateTextStyle: {
      objectId: shapeId,
      textRange: {
        type: 'FIXED_RANGE',
        startIndex: 5,
        endIndex: 10,
      },
      style: {
        fontFamily: 'Times New Roman',
        fontSize: {
          magnitude: 14,
          unit: 'PT',
        },
        foregroundColor: {
          opaqueColor: {
            rgbColor: {
              blue: 1.0,
              green: 0.0,
              red: 0.0,
            },
          },
        },
      },
      fields: 'foregroundColor,fontFamily,fontSize',
    },
  }, {
    updateTextStyle: {
      objectId: shapeId,
      textRange: {
        type: 'FIXED_RANGE',
        startIndex: 10,
        endIndex: 15,
      },
      style: {
        link: {
          url: 'www.example.com',
        },
      },
      fields: 'link',
    },
  }];
  // Execute the requests.
  try {
    gapi.client.slides.presentations.batchUpdate({
      presentationId: presentationId,
      requests: requests,
    }).then((batchUpdateResponse) => {
      console.log(`Updated the text style for shape with ID: ${shapeId}`);
      if (callback) callback(batchUpdateResponse.result);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
// [END slides_text_style_update]
