const translation = {
  common: {
    welcome: 'Welcome to use',
    appUnavailable: 'App is unavailable',
    appUnkonwError: 'App is unavailable',
    optional: 'Optional',
  },
  generation: {
    tabs: {
      create: '1 Keer',
      batch: 'Batch',
      saved: 'Saved',
    },
    queryTitle: 'Query content',
    completionResult: 'Completion result',
    queryPlaceholder: 'Write your query content...',
    run: 'Begin',
    copy: 'Copy',
    title: 'Resultaten',
    resultTitle: 'Resultaten',
    noData: 'Uw resultaten verschijnen hier.',
    csvUploadTitle: 'Sleep uw CSV-bestand hierheen of ',
    browse: 'kies bestand',
    csvStructureTitle: 'Het CSV-bestand moet voldoen aan de volgende structuur:',
    downloadTemplate: 'Download het sjabloon hier',
    field: 'Field',
    batchFailed: {
      info: '{{num}} failed executions',
      retry: 'Retry',
      outputPlaceholder: 'No output content',
    },
    errorMsg: {
      empty: 'Please input content in the uploaded file.',
      fileStructNotMatch: 'The uploaded CSV file not match the struct.',
      emptyLine: 'Row {{rowIndex}} is empty',
      invalidLine: 'Row {{rowIndex}}: {{varName}} value can not be empty',
      moreThanMaxLengthLine: 'Row {{rowIndex}}: {{varName}} value can not be more than {{maxLength}} characters',
      atLeastOne: 'Please input at least one row in the uploaded file.',
    },
    privacyPolicyLeft:
      'Please read the ',
    privacyPolicyMiddle:
      'privacy policy',
    privacyPolicyRight:
      ' provided by the app developer.',
  },
  errorMessage: {
    valueOfVarRequired: 'Variables value can not be empty',
    queryRequired: 'Request text is required.',
    waitForResponse: 'Please wait for the response to the previous message to complete.',
    waitForImgUpload: 'Please wait for the image to upload',
  },
}

export default translation
