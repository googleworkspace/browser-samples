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

function testCreateBulletedText(done) {
  createTestPresentation(function(presentationId) {
    addSlides(presentationId, 1, 'BLANK', function(pageIds) {
      const pageId = pageIds[0];
      createTestTextbox(presentationId, pageId, function(boxId) {
        createBulletedText(presentationId, boxId, function(response) {
          assert.equal(1, response.replies.length);
          done();
        });
      });
    });
  });
}
