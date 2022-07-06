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

// [START slides_create_bulleted_text]
function createBulletedText(presentationId, shapeId, callback) {
  // Add arrow-diamond-disc bullets to all text in the shape.
  const requests = [{
    createParagraphBullets: {
      objectId: shapeId,
      textRange: {
        type: 'ALL',
      },
      bulletPreset: 'BULLET_ARROW_DIAMOND_DISC',
    },
  }];
  // Execute the requests.
  try {
    gapi.client.slides.presentations.batchUpdate({
      presentationId: presentationId,
      requests: requests,
    }).then((batchUpdateResponse) => {
      console.log(`Added bullets to text in shape with ID: ${shapeId}`);
      if (callback) callback(batchUpdateResponse.result);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
// [END slides_create_bulleted_text]
