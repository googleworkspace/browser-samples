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
function createPresentation(title, callback) {
  // [START slides_create_presentation]
  gapi.client.slides.presentations.create({
    title: title
  }).then((response) => {
  try{
    console.log(`Created presentation with ID: ${response.result.presentationId}`);
    // [START_EXCLUDE silent]
    if(callback) callback(response);
    // [END_EXCLUDE]
    } catch(ex){console.log(ex.message)}
  });
  // [END slides_create_presentation]
}