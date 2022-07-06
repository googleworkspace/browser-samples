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
// [START slides_create_textbox_with_text]
function createTextboxWithText(presentationId, pageId, callback) {
  // Create a new square textbox, using the supplied element ID.
  const elementId = 'MyTextBox_01';
  const pt350 = {
    magnitude: 350,
    unit: 'PT',
  };
  const requests = [{
    createShape: {
      objectId: elementId,
      shapeType: 'TEXT_BOX',
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: pt350,
          width: pt350,
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 350,
          translateY: 100,
          unit: 'PT',
        },
      },
    },
  },

  // Insert text into the box, using the supplied element ID.
  {
    insertText: {
      objectId: elementId,
      insertionIndex: 0,
      text: 'New Box Text Inserted!',
    },
  }];
  // Execute the request.
  try {
    gapi.client.slides.presentations.batchUpdate({
      presentationId: presentationId,
      requests: requests,
    }).then((createTextboxWithTextResponse) => {
      const createShapeResponse = createTextboxWithTextResponse.result.replies[0].createShape;
      console.log(`Created textbox with ID: ${createShapeResponse.objectId}`);
      if (callback) callback(createTextboxWithTextResponse.result);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
// [END slides_create_textbox_with_text]
