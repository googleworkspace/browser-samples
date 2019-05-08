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

function createPresentation(title, callback) {
  // [START slides_create_presentation]
  gapi.client.slides.presentations.create({
    title: title
  }).then((response) => {
    console.log(`Created presentation with ID: ${response.result.presentationId}`);
    // [START_EXCLUDE silent]
    callback(response);
    // [END_EXCLUDE]
  });
  // [END slides_create_presentation]
}
function copyPresentation(presentationId, copyTitle, callback) {
  // [START slides_copy_presentation]
  var request = {
    name: copyTitle
  };
  gapi.client.drive.files.copy({
    fileId: presentationId,
    resource: request
  }).then((driveResponse) => {
    var presentationCopyId = driveResponse.result.id;
    // [START_EXCLUDE silent]
    callback(presentationCopyId);
    // [END_EXCLUDE]
  });
  // [END slides_copy_presentation]
}
function createSlide(presentationId, pageId, callback) {
  // [START slides_create_slide]
  var requests = [{
    createSlide: {
      objectId: pageId,
      insertionIndex: '1',
      slideLayoutReference: {
        predefinedLayout: 'TITLE_AND_TWO_COLUMNS'
      }
    }
  }];

  // If you wish to populate the slide with elements, add element create requests here,
  // using the pageId.

  // Execute the request.
  gapi.client.slides.presentations.batchUpdate({
    presentationId: presentationId,
    requests: requests
  }).then((createSlideResponse) => {
    console.log(`Created slide with ID: ${createSlideResponse.result.replies[0].createSlide.objectId}`);
    // [START_EXCLUDE silent]
    callback(createSlideResponse);
    // [END_EXCLUDE]
  });
  // [END slides_create_slide]
}
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
  }).then((createTextboxWithTextResponse) => {
    var createShapeResponse = createTextboxWithTextResponse.result.replies[0].createShape;
    console.log(`Created textbox with ID: ${createShapeResponse.objectId}`);
    // [START_EXCLUDE silent]
    callback(createTextboxWithTextResponse.result);
    // [END_EXCLUDE]
  });
  // [END slides_create_textbox_with_text]
}

function createImage(presentationId, pageId, imageFilePath, imageMimetype, callback) {
  var imageUrl = IMAGE_URL;
  // [START slides_create_image]
  // Temporarily upload a local image file to Drive, in order to obtain a URL
  // for the image. Alternatively, you can provide the Slides service a URL of
  // an already hosted image.
  //
  // We will use an existing image under the variable: imageUrl.
  //
  // Create a new image, using the supplied object ID, with content downloaded from imageUrl.
  var requests = [];
  var imageId = 'MyImage_01';
  var emu4M = {
    magnitude: 4000000,
    unit: 'EMU'
  };
  requests.push({
    createImage: {
      objectId: imageId,
      url: imageUrl,
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: emu4M,
          width: emu4M
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 100000,
          translateY: 100000,
          unit: 'EMU'
        }
      }
    }
  });

  // Execute the request.
  gapi.client.slides.presentations.batchUpdate({
    presentationId: presentationId,
    requests: requests
  }).then((response) => {
    var createImageResponse = response.result.replies;
    console.log(`Created image with ID: ${createImageResponse[0].createImage.objectId}`);
    // [START_EXCLUDE silent]
    callback(createImageResponse);
    // [END_EXCLUDE]
  });
  // [END slides_create_image]
}
function textMerging(templatePresentationId, dataSpreadsheetId, callback) {
  // [START slides_text_merging]
  // Use the Sheets API to load data, one record per row.
  var responses = [];
  var dataRangeNotation = 'Customers!A2:M6';
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: dataSpreadsheetId,
    range: dataRangeNotation
  }).then((sheetsResponse) => {
    var values = sheetsResponse.result.values;

    // For each record, create a new merged presentation.
    for (var i = 0; i < values.length; ++i) {
      var row = values[i];
      var customerName = row[2]; // name in column 3
      var caseDescription = row[5]; // case description in column 6
      var totalPortfolio = row[11]; // total portfolio in column 12

      // Duplicate the template presentation using the Drive API.
      var copyTitle = customerName + ' presentation';
      var request = {
        name: copyTitle
      };
      gapi.client.drive.files.copy({
        fileId: templatePresentationId,
        requests: request
      }).then((driveResponse) => {
        var presentationCopyId = driveResponse.result.id;

        // Create the text merge (replaceAllText) requests for this presentation.
        var requests = [{
          replaceAllText: {
            containsText: {
              text: '{{customer-name}}',
              matchCase: true
            },
            replaceText: customerName
          }
        }, {
          replaceAllText: {
            containsText: {
              text: '{{case-description}}',
              matchCase: true
            },
            replaceText: caseDescription
          }
        }, {
          replaceAllText: {
            containsText: {
              text: '{{total-portfolio}}',
              matchCase: true
            },
            replaceText: totalPortfolio
          }
        }];

        // Execute the requests for this presentation.
        gapi.client.slides.presentations.batchUpdate({
          presentationId: presentationCopyId,
          requests: requests
        }).then((batchUpdateResponse) => {
          var result = batchUpdateResponse.result;
          // [START_EXCLUDE silent]
          responses.push(result.replies);
          // [END_EXCLUDE]
          // Count the total number of replacements made.
          var numReplacements = 0;
          for (var i = 0; i < result.replies.length; ++i) {
            numReplacements += result.replies[i].replaceAllText.occurrencesChanged;
          }
          console.log(`Created presentation for ${customerName} with ID: ${presentationCopyId}`);
          console.log(`Replaced ${numReplacements} text instances`);
          // [START_EXCLUDE silent]
          if (responses.length === values.length) { // callback for the last value
            callback(responses);
          }
          // [END_EXCLUDE]
        });
      });
    }
  });
  // [END slides_text_merging]
}
function imageMerging(templatePresentationId, imageUrl, customerName, callback) {
  var logoUrl = imageUrl;
  var customerGraphicUrl = imageUrl;

  // [START slides_image_merging]
  // Duplicate the template presentation using the Drive API.
  var copyTitle = customerName + ' presentation';
  gapi.client.drive.files.copy({
    fileId: templatePresentationId,
    resource: {
      name: copyTitle
    }
  }).then((driveResponse) => {
    var presentationCopyId = driveResponse.result.id;

    // Create the image merge (replaceAllShapesWithImage) requests.
    var requests = [{
      replaceAllShapesWithImage: {
        imageUrl: logoUrl,
        replaceMethod: 'CENTER_INSIDE',
        containsText: {
          text: '{{company-logo}}',
          matchCase: true
        }
      }
    }, {
      replaceAllShapesWithImage: {
        imageUrl: customerGraphicUrl,
        replaceMethod: 'CENTER_INSIDE',
        containsText: {
          text: '{{customer-graphic}}',
          matchCase: true
        }
      }
    }];

    // Execute the requests for this presentation.
    gapi.client.slides.presentations.batchUpdate({
      presentationId: presentationCopyId,
      requests: requests
    }).then((batchUpdateResponse) => {
      var numReplacements = 0;
      for (var i = 0; i < batchUpdateResponse.result.replies.length; ++i) {
        numReplacements += batchUpdateResponse.result.replies[i].replaceAllShapesWithImage.occurrencesChanged;
      }
      console.log(`Created merged presentation with ID: ${presentationCopyId}`);
      console.log(`Replaced ${numReplacements} shapes with images.`);
      // [START_EXCLUDE silent]
      callback(batchUpdateResponse.result);
      // [END_EXCLUDE]
    });
  });
  // [END slides_image_merging]
}
function simpleTextReplace(presentationId, shapeId, replacementText, callback) {
  // [START slides_simple_text_replace]
  // Remove existing text in the shape, then insert new text.
  var requests = [{
    deleteText: {
      objectId: shapeId,
      textRange: {
        type: 'ALL'
      }
    }
  }, {
    insertText: {
      objectId: shapeId,
      insertionIndex: 0,
      text: replacementText
    }
  }];

  // Execute the requests.
  gapi.client.slides.presentations.batchUpdate({
    presentationId: presentationId,
    requests: requests
  }).then((batchUpdateResponse) => {
    console.log(`Replaced text in shape with ID: ${shapeId}`)
    // [START_EXCLUDE silent]
    callback(batchUpdateResponse.result);
    // [END_EXCLUDE]
  });
  // [END slides_simple_text_replace]
}
function textStyleUpdate(presentationId, shapeId, callback) {
  // [START slides_text_style_update]
  // Update the text style so that the first 5 characters are bolded
  // and italicized, the next 5 are displayed in blue 14 pt Times
  // New Roman font, and the next 5 are hyperlinked.
  var requests = [{
    updateTextStyle: {
      objectId: shapeId,
      textRange: {
        type: 'FIXED_RANGE',
        startIndex: 0,
        endIndex: 5
      },
      style: {
        bold: true,
        italic: true
      },
      fields: 'bold,italic'
    }
  }, {
    updateTextStyle: {
      objectId: shapeId,
      textRange: {
        type: 'FIXED_RANGE',
        startIndex: 5,
        endIndex: 10
      },
      style: {
        fontFamily: 'Times New Roman',
        fontSize: {
          magnitude: 14,
          unit: 'PT'
        },
        foregroundColor: {
          opaqueColor: {
            rgbColor: {
              blue: 1.0,
              green: 0.0,
              red: 0.0
            }
          }
        }
      },
      fields: 'foregroundColor,fontFamily,fontSize'
    }
  }, {
    updateTextStyle: {
      objectId: shapeId,
      textRange: {
        type: 'FIXED_RANGE',
        startIndex: 10,
        endIndex: 15
      },
      style: {
        link: {
          url: 'www.example.com'
        }
      },
      fields: 'link'
    }
  }];

  // Execute the requests.
  gapi.client.slides.presentations.batchUpdate({
    presentationId: presentationId,
    requests: requests
  }).then((batchUpdateResponse) => {
    console.log(`Updated the text style for shape with ID: ${shapeId}`);
    // [START_EXCLUDE silent]
    callback(batchUpdateResponse.result);
    // [END_EXCLUDE]
  });
  // [END slides_text_style_update]
}
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
  }).then((batchUpdateResponse) => {
    console.log(`Added bullets to text in shape with ID: ${shapeId}`);
    // [START_EXCLUDE silent]
    callback(batchUpdateResponse.result);
    // [END_EXCLUDE]
  });
  // [END slides_create_bulleted_text]

}
function createSheetsChart(presentationId, pageId, shapeId, sheetChartId, callback) {
  // [START slides_create_sheets_chart]
  // Embed a Sheets chart (indicated by the spreadsheetId and sheetChartId) onto
  // a page in the presentation. Setting the linking mode as "LINKED" allows the
  // chart to be refreshed if the Sheets version is updated.
  var emu4M = {
    magnitude: 4000000,
    unit: 'EMU'
  };
  var presentationChartId = 'MyEmbeddedChart';
  var requests = [{
    createSheetsChart: {
      objectId: presentationChartId,
      spreadsheetId: shapeId,
      chartId: sheetChartId,
      linkingMode: 'LINKED',
      elementProperties: {
        pageObjectId: pageId,
        size: {
          height: emu4M,
          width: emu4M
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: 100000,
          translateY: 100000,
          unit: 'EMU'
        }
      }
    }
  }];

  // Execute the request.
  gapi.client.slides.presentations.batchUpdate({
    presentationId: presentationId,
    requests: requests
  }).then((batchUpdateResponse) => {
    console.log(`Added a linked Sheets chart with ID: ${presentationChartId}`);
    // [END slides_create_sheets_chart]
    callback(batchUpdateResponse.result);
  });
}
function refreshSheetsChart(presentationId, presentationChartId, callback) {
  // [START slides_refresh_sheets_chart]
  var requests = [{
    refreshSheetsChart: {
      objectId: presentationChartId
    }
  }];

  // Execute the request.
  gapi.client.slides.presentations.batchUpdate({
    presentationId: presentationId,
    requests: requests
  }).then((batchUpdateResponse) => {
    console.log(`Refreshed a linked Sheets chart with ID: ${presentationChartId}`);
    // [START_EXCLUDE silent]
    callback(batchUpdateResponse.result);
    // [END_EXCLUDE]
  });
  // [END slides_refresh_sheets_chart]
}
