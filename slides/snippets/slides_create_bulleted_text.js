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
function createBulletedText(presentationId, shapeId, callback) {
  // [START slides_create_bulleted_text]
  // Add arrow-diamond-disc bullets to all text in the shape.
  var requests = [{
    createParagraphBullets: {
      objectId: shapeId,
      textRange: {
        type: 'ALL'
      },
      bulletPreset: 'BULLET_ARROW_DIAMOND_DISC'
    }
  }];

  // Execute the requests.
  gapi.client.slides.presentations.batchUpdate({
    presentationId: presentationId,
    requests: requests
  }).then((batchUpdateResponse) => { try{
    console.log(`Added bullets to text in shape with ID: ${shapeId}`);
    // [START_EXCLUDE silent]
    if(callback) callback(batchUpdateResponse.result);
    } catch(ex){console.log(ex.message)}
    // [END_EXCLUDE]
  });
  // [END slides_create_bulleted_text]

}