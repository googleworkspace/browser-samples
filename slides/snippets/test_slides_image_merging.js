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

function testImageMerging(done) {
  const TEMPLATE_PRESENTATION_ID =
    '1TWayqVbNxZ0ZjmfBg5nVhBDWSnQi7lgeglDDfIe41Sw';
  const IMAGE_URL =
    'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
  const CUSTOMER_NAME = 'Fake Customer';
  imageMerging(
      TEMPLATE_PRESENTATION_ID,
      IMAGE_URL,
      CUSTOMER_NAME,
      function(response) {
        const presentationId = response.presentationId;
        assert.isNotNull(presentationId);

        assert.equal(2, response.replies.length);
        let numReplacements = 0;
        for (let i = 0; i < response.replies.length; ++i) {
          numReplacements +=
          response.replies[i].replaceAllShapesWithImage.occurrencesChanged;
        }
        done();
      },
  );
}
