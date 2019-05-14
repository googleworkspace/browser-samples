<!--
Copyright 2019 Google LLC
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    https://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<!-- [START drive_activity_v2_quickstart] -->
<!DOCTYPE html>
<html>
  <head>
    <title>Google Drive Activity API v2 Quickstart</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <p>Google Drive Activity API v2 Quickstart</p>

    <!--Add buttons to initiate auth sequence and sign out-->
    <button id="authorize_button" style="display: none;">Authorize</button>
    <button id="signout_button" style="display: none;">Sign Out</button>

    <pre id="content" style="white-space: pre-wrap;"></pre>

    <script type="text/javascript">
      // Client ID and API key from the Developer Console
      var CLIENT_ID = '<YOUR_CLIENT_ID>';
      var API_KEY = '<YOUR_API_KEY>';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/driveactivity/v2/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = 'https://www.googleapis.com/auth/drive.activity.readonly';

      var authorizeButton = document.getElementById('authorize_button');
      var signoutButton = document.getElementById('signout_button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listDriveActivity();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

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
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print recent activity.
       */
      function listDriveActivity() {
        gapi.client.driveactivity.activity
            .query({
              'pageSize': 10
            })
            .then(function(response) {
              appendPre('Recent activity:');
              var activities = response.result.activities;

              if (activities && activities.length > 0) {
                for (var i = 0; i < activities.length; i++) {
                  var activity = activities[i];
                  var time = getTimeInfo(activity);
                  var action = getActionInfo(activity['primaryActionDetail']);
                  var actors = activity.actors.map(getActorInfo);
                  var targets = activity.targets.map(getTargetInfo);
                  appendPre(`${time}: ${truncated(actors)}, ${action}, ` +
                            `${truncated(targets)}`);
                }
              } else {
                appendPre('No activity.');
              }
            });
      }

      /** Returns a string representation of the first elements in a list. */
      function truncated(array, limit = 2) {
        var contents = array.slice(0, limit).join(', ');
        var more = array.length > limit ? ', ...' : '';
        return `[${contents}${more}]`;
      }

      /** Returns the name of a set property in an object, or else "unknown". */
      function getOneOf(object) {
        for (var key in object) {
          return key;
        }
        return 'unknown';
      }

      /** Returns a time associated with an activity. */
      function getTimeInfo(activity) {
        if ('timestamp' in activity) {
          return activity.timestamp;
        }
        if ('timeRange' in activity) {
          return activity.timeRange.endTime;
        }
        return 'unknown';
      }

      /** Returns the type of action. */
      function getActionInfo(actionDetail) {
        return getOneOf(actionDetail);
      }

      /** Returns user information, or the type of user if not a known user. */
      function getUserInfo(user) {
        if ('knownUser' in user) {
          var knownUser = user['knownUser'];
          var isMe = knownUser['isCurrentUser'] || false;
          return isMe ? 'people/me' : knownUser['personName'];
        }
        return getOneOf(user);
      }

      /** Returns actor information, or the type of actor if not a user. */
      function getActorInfo(actor) {
        if ('user' in actor) {
          return getUserInfo(actor['user'])
        }
        return getOneOf(actor);
      }

      /** Returns the type of a target and an associated title. */
      function getTargetInfo(target) {
        if ('driveItem' in target) {
          var title = target.driveItem.title || 'unknown';
          return `driveItem:"${title}"`;
        }
        if ('drive' in target) {
          var title = target.drive.title || 'unknown';
          return `drive:"${title}"`;
        }
        if ('fileComment' in target) {
          var parent = target.fileComment.parent || {};
          var title = parent.title || 'unknown';
          return `fileComment:"${title}"`;
        }
        return `${getOneOf(target)}:unknown`;
      }

    </script>

    <script async defer src="https://apis.google.com/js/api.js"
      onload="this.onload=function(){};handleClientLoad()"
      onreadystatechange="if (this.readyState === 'complete') this.onload()">
    </script>
  </body>
</html>
<!-- [END drive_activity_v2_quickstart] -->
