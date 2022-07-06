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

function testCreateSlide(done) {
  createTestPresentation(function(presentationId) {
    addSlides(presentationId, 3, 'TITLE_AND_TWO_COLUMNS', function(ids) {
      const pageId = 'my_page_id';
      createSlide(presentationId, pageId, function(response) {
        assert.equal(pageId, response.result.replies[0].createSlide.objectId);
        done();
      });
    });
  });
}
