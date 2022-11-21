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

function testCreateImage(done) {
  createTestPresentation(function(presentationId) {
    addSlides(presentationId, 1, 'BLANK', function(ids) {
      const pageId = ids[0];
      const IMAGE_URL =
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
      createImage(presentationId, pageId, IMAGE_URL, function(response) {
        assert.equal(1, response.length);
        const imageId = response[0].createImage.objectId;
        assert.isNotNull(imageId);
        done();
      });
    });
  });
}
