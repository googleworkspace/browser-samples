# browser-samples

Browser samples for [Google Workspace APIs](https://developers.google.com/workspace/) docs.

## APIs

### [Admin SDK](https://developers.google.com/admin-sdk/)

### [Apps Script API](https://developers.google.com/apps-script/api)

- [Quickstart](apps-script/quickstart)

### [Calendar](https://developers.google.com/calendar)

- [Quickstart](calendar/quickstart)

### [Classroom](https://developers.google.com/classroom)

- [Quickstart](classroom/quickstart)

### [Drive](https://developers.google.com/drive/v3)

- [Quickstart](drive/quickstart)

### [Docs](https://developers.google.com/docs)

- [Quickstart](docs/quickstart)

### [Gmail](https://developers.google.com/gmail/api/)

- [Quickstart](gmail/quickstart)

### [People](https://developers.google.com/people/)

- [Quickstart](people/quickstart)

### [Sheets](https://developers.google.com/sheets/api/)

- [Quickstart](sheets/quickstart)
- [Snippets](sheets/snippets)

### [Slides](https://developers.google.com/slides/)

- [Quickstart](slides/quickstart)
- [Snippets](slides/snippets)

## Setup

1. Clone this repository.
1. Follow the README instructions in the API folder to run and test samples.

## Troubleshooting

Here are some tips for troubleshooting errors when running these samples:

- Be sure to create a local HTTP server to server the HTML page in the quickstart example. Otherwise the `gapi` client may encounter errors.
- Check your browser console for errors. In Chrome, this is under **View > Developer > JavaScript Console**

Below are some possible errors you may encounter:

### Error: origin_mismatch

This error will occur during the authorization flow if the host and port used to serve the web page doesn't match an allowed JavaScript origin on your Google Developers Console project. Make sure to correctly specify **Authorized JavaScript origins** in the quickstart steps.

### idpiframe_initialization_failed: Failed to read the 'localStorage' property from 'Window'

The Google Sign-in library requires that third-party cookies and data storage is enabled in the web browser. For users that run into this error, prompt them to enable the feature or add an exception for accounts.google.com.

### idpiframe_initialization_failed: Not a valid origin for the client

The Google Sign-in library requires that the domain registered in the Google Developers Console matches the domain being used to host the web page. Make sure to correctly specify **Authorized JavaScript origins** in the quickstart steps.

## Linting

This project uses [htmllint](https://github.com/htmllint/htmllint).

Install & run:

```sh
sudo npm install -g htmllint-cli
htmllint
```

Configure [options](https://github.com/htmllint/htmllint/wiki/Options) in the `.htmllintrc`.

## Client Library

Google Workspace APIs use the [Google API JavaScript client library](https://github.com/google/google-api-javascript-client).

## Contributing

Contributions welcome! See the [Contributing Guide](CONTRIBUTING.md).
