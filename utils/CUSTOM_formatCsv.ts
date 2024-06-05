// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export function formatCsv(csvData, schema) {
  // Convert schema into a dictionary for easy lookup
  try {
    const schemaDict = {}
    schema.forEach((field) => {
      schemaDict[field.name] = field
    })
    function levenshtein(a, b) {
      const matrix = []

      // Increment along the first column of each row
      for (let i = 0; i <= b.length; i++)
        matrix[i] = [i]

      // Increment each column in the first row
      for (let j = 0; j <= a.length; j++)
        matrix[0][j] = j

      // Fill in the rest of the matrix
      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1]
          }
          else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1, // deletion
            )
          }
        }
      }

      return matrix[b.length][a.length]
    }

    // Helper function to find the closest match based on Levenshtein distance and partial matches
    function findClosestMatch(value, options) {
      const valueNormalized = value.toLowerCase()
      let closestMatch = options[0]
      let minDistance = Infinity

      for (const option of options) {
        const optionNormalized = option.toLowerCase()
        const distance = levenshtein(valueNormalized, optionNormalized)
        if (distance < minDistance) {
          minDistance = distance
          closestMatch = option
        }
      }

      // If no exact or close match found, use a more flexible partial match
      console.log('For value:', value)
      console.log(`${minDistance} and ${valueNormalized.length}`)
      const maxAllowedDistance = Math.ceil(valueNormalized.length / 0.5)
      if (minDistance > maxAllowedDistance) {
        const regex = new RegExp(valueNormalized.split('').join('.*'), 'i')
        for (const option of options) {
          if (regex.test(option))
            return option
        }
      }

      return minDistance <= maxAllowedDistance ? closestMatch : (options.includes('Other') ? 'Other' : options[0])
    }
    // Helper function to check and correct a value based on the schema
    function correctValue(value, fieldSchema) {
      if (fieldSchema.type === 'select') {
        return findClosestMatch(value, fieldSchema.options)
      }
      else if (fieldSchema.type === 'string') {
      // Truncate string if it exceeds max_length
        if (fieldSchema.max_length !== null && value.length > fieldSchema.max_length)
          return value.slice(0, fieldSchema.max_length)

        return value
      }
      else if (fieldSchema.type === 'paragraph') {
      // Just return the paragraph, no specific formatting required
        return value
      }
      return value
    }

    // Initialize output array with the headers
    const formattedData = [csvData[0]]

    // Iterate through each row of data
    for (const row of csvData.slice(1)) {
      const formattedRow = []
      for (let i = 0; i < row.length; i++) {
        const value = row[i]
        const columnName = csvData[0][i]
        const fieldSchema = schemaDict[columnName]

        // Check if the field is required and if the value is empty or invalid
        if (fieldSchema.required && (!value || (fieldSchema.type === 'select' && !fieldSchema.options.map(opt => opt.toLowerCase()).includes(value.toLowerCase()))))
          formattedRow.push(correctValue(value, fieldSchema))
        else
          formattedRow.push(correctValue(value, fieldSchema))
      }
      formattedData.push(formattedRow)
    }

    return formattedData
  }
  catch (e) {
    console.log(e)
    return csvData
  }
}
