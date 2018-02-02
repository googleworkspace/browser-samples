// Copyright 2018 Google LLC
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

var DISCOVERY_DOCS = [
    "https://slides.googleapis.com/$discovery/rest?version=v1",
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
];
var SCOPES = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/presentations",
    "https://www.googleapis.com/auth/spreadsheets"
];

// Constants
var IMAGE_FILE_PATH = 'images/googlelogo_color_272x92dp.png';
var IMAGE_URL = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
var IMAGE_MIMETYPE = 'image/png';
var TEMPLATE_PRESENTATION_ID = '1E7tKQyX8H7zI7F8_v7mNDY5VyHZ3NNcjUQhkGXoITnw';
var DATA_SPREADSHEET_ID = '14KaZMq2aCAGt5acV77zaA_Ps8aDt04G7T0ei4KiXLX8';
var CHART_ID = 1107320627;
var CUSTOMER_NAME = 'Fake Customer';

// DOM
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  console.log('Loaded client');
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: '473749893102-knvjm7o30up30hsub6e8oglj32571of1.apps.googleusercontent.com',
    scope: SCOPES.join(' '),
  }).then(() => {
    console.log('Initiated client');
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

// Tests
function testCreatePresentation(done) {
  createPresentation('Title', function(presentation) {
    assert.isNotNull(presentation);
    done();
    // deleteFileOnCleanup(presentation.presentationId)
  });
}
function testCopyPresentation(done) {
  createTestPresentation(function(presentationId) {
    copyPresentation(presentationId, 'My Duplicate Presentation', function(copyId) {
      assert.isNotNull(copyId);
      done();
      // deleteFileOnCleanup(copyId);
    });
  });
}
function testCreateSlide(done) {
  createTestPresentation(function(presentationId) {
    addSlides(presentationId, 3, 'TITLE_AND_TWO_COLUMNS', function(ids) {
      var pageId = 'my_page_id';
      createSlide(presentationId, pageId, function(response) {
        assert.equal(pageId, response.result.replies[0].createSlide.objectId)
        done();
      });
    });
  });
}
function testCreateTextboxWithText(done) {
  createTestPresentation(function(presentationId) {
    addSlides(presentationId, 1, 'BLANK', function(ids) {
      var pageId = ids[0];
      createTextboxWithText(presentationId, pageId, function(response) {
        assert.equal(2, response.replies.length);
        var boxId = response.replies[0].createShape.objectId;
        assert.isNotNull(boxId);
        done();
      });
    })
  });
}
function testCreateImage(done) {
  createTestPresentation(function(presentationId) {
    addSlides(presentationId, 1, 'BLANK', function(ids) {
      var pageId = ids[0];
      createImage(presentationId, pageId, IMAGE_FILE_PATH, IMAGE_MIMETYPE, function(response) {
        assert.equal(1, response.length);
        var imageId = response[0].createImage.objectId;
        assert.isNotNull(imageId);
        done();
      });
    });
  });
}
function testTextMerging(done) {
  textMerging(TEMPLATE_PRESENTATION_ID, DATA_SPREADSHEET_ID, function(responses) {
    assert.equal(5, responses.length);
    responses.forEach(function(response) {
      var numReplacements = 0;
      for (var i = 0; i < response.length; ++i) {
        numReplacements += response[i].replaceAllText.occurrencesChanged;
      }
      assert.equal(4, numReplacements);
    });
    done();
  });
}
function testImageMerging(done) {
  imageMerging(TEMPLATE_PRESENTATION_ID, IMAGE_URL, CUSTOMER_NAME, function(response) {
    var presentationId = response.presentationId;
    assert.isNotNull(presentationId);
    assert.equal(2, response.replies.length);
    var numReplacements = 0;
    for (var i = 0; i < response.replies.length; ++i) {
      numReplacements += response.replies[i].replaceAllShapesWithImage.occurrencesChanged;
    }
    assert.equal(2, numReplacements);
    done();
  });
}
function testSimpleTextReplace(done) {
  createTestPresentation(function(presentationId) {
    addSlides(presentationId, 1, 'BLANK', function(pageIds) {
      var pageId = pageIds[0];
      createTestTextbox(presentationId, pageId, function(boxId) {
        simpleTextReplace(presentationId, boxId, 'MY NEW TEXT', function(response) {
          assert.equal(2, response.replies.length);
          done();
        });
      })
    })
  });
}
function testTextStyleUpdate(done) {
  createTestPresentation(function(presentationId) {
    addSlides(presentationId, 1, 'BLANK', function(pageIds) {
      var pageId = pageIds[0];
      createTestTextbox(presentationId, pageId, function(boxId) {
        textStyleUpdate(presentationId, boxId, function(response) {
          assert.equal(3, response.replies.length);
          done();
        });
      });
    })
  });
}
function testCreateBulletedText(done) {
  createTestPresentation(function(presentationId) {
    addSlides(presentationId, 1, 'BLANK', function(pageIds) {
      var pageId = pageIds[0];
      createTestTextbox(presentationId, pageId, function(boxId) {
        createBulletedText(presentationId, boxId, function(response) {
          assert.equal(1, response.replies.length);
          done();
        });
      });
    })
  });
}
function testCreateSheetsChart(done) {
  createTestPresentation(function(presentationId) {
    addSlides(presentationId, 1, 'BLANK', function(pageIds) {
      var pageId = pageIds[0];
      createSheetsChart(presentationId, pageId, DATA_SPREADSHEET_ID, CHART_ID, function(response) {
        assert.equal(1, response.replies.length);
        var chartId = response.replies[0].createSheetsChart.objectId;
        assert.isNotNull(chartId);
        done();
      });
    });
  });
}
function testRefreshSheetsChart(done) {
  createTestPresentation(function(presentationId) {
    addSlides(presentationId, 1, 'BLANK', function(pageIds) {
      var pageId = pageIds[0];
      createTestSheetsChart(presentationId, pageId, DATA_SPREADSHEET_ID, CHART_ID, function(sheetChartId) {
        refreshSheetsChart(presentationId, sheetChartId, function(response) {
          assert.equal(1, response.replies.length);
          done();
        });
      });
    });
  });
}
