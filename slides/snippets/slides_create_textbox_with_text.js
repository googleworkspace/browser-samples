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
function createTextboxWithText(presentationId, pageId, callback) {
  // [START slides_create_textbox_with_text]
  // Create a new square textbox, using the supplied element ID.
  var elementId = 'MyTextBox_01';
  var pt350 = {
    magnitude: 350,
    unit: 'PT'
  };
  var requests = [{
    createShape: {
      objectId: elementId,
      shapeType: 'TEXT_BOX',
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: pt350,
          width: pt350
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 350,
          translateY: 100,
          unit: 'PT'
        }
      }
    }
  },

  // Insert text into the box, using the supplied element ID.
  {
    insertText: {
      objectId: elementId,
      insertionIndex: 0,
      text: 'New Box Text Inserted!'
    }
  }];

  // Execute the request.
  gapi.client.slides.presentations.batchUpdate({
    presentationId: presentationId,
    requests: requests
  }).then((createTextboxWithTextResponse) => { try{
    var createShapeResponse = createTextboxWithTextResponse.result.replies[0].createShape;
    console.log(`Created textbox with ID: ${createShapeResponse.objectId}`);
    // [START_EXCLUDE silent]
    if(callback) callback(createTextboxWithTextResponse.result);
    // [END_EXCLUDE]
    } catch(ex){console.log(ex.message)}
  });
  // [END slides_create_textbox_with_text]
}