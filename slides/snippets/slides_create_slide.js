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
// [START slides_create_slide]
function createSlide(presentationId, pageId, callback) {
  const requests = [
    {
      createSlide: {
        objectId: pageId,
        insertionIndex: '1',
        slideLayoutReference: {
          predefinedLayout: 'TITLE_AND_TWO_COLUMNS',
        },
      },
    },
  ];
  // If you wish to populate the slide with elements, add element create requests here,
  // using the pageId.
  // Execute the request.
  try {
    gapi.client.slides.presentations
        .batchUpdate({
          presentationId: presentationId,
          requests: requests,
        })
        .then((createSlideResponse) => {
          const objectId =
          createSlideResponse.result.replies[0].createSlide.objectId;
          console.log(`Created slide with ID: ${objectId}`);
          if (callback) callback(createSlideResponse);
        });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
// [END slides_create_slide]
