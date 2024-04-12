/** returns distance matrix according to the Wagner–Fischer algorithm for calculation of Levenshtein distance */
const editDistanceMatrix = (word1: string, word2: string): number[][] => {
  const rows = word1.length + 1
  const columns = word2.length + 1
  const matrix = Array.from(Array(rows), () => new Array(columns).fill(0))

  for (let i = 0; i < rows; i++) matrix[i][0] = i
  for (let j = 0; j < columns; j++) matrix[0][j] = j

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < columns; j++) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + (word1[i - 1] === word2[j - 1] ? 0 : 1)
      )
    }
  }

  return matrix
}

/** returns Levenshtein distance between two words */
export const editDistance = (word1: string, word2: string): number => {
  const matrix = editDistanceMatrix(word1, word2)
  return matrix[word1.length][word2.length]
}

/** returns result of editing of the word1, logs intermediate steps of editing process for visualization */
export const edit = (word1: string, word2: string): string => {
  const matrix = editDistanceMatrix(word1, word2)
  const distance = matrix[word1.length][word2.length]

  console.log(`Edit distance is ${distance}`)

  let result = Array.from(word1)
  let resultDistance = distance
  let i = word1.length
  let j = word2.length

  console.log(`Initial state of the first word is "${word1}"`)
  console.log('Apply editions to the first word...')

  while (resultDistance > 0) {
    if (i > 0 && matrix[i - 1][j] < resultDistance) { // delete
      result[i - 1] = ''
      i -= 1
      console.log(result.join(''))
    } else if (j > 0 && matrix[i][j - 1] < resultDistance) { // insert
      result.splice(i, 0, word2[j - 1])
      j -= 1
      console.log(result.join(''))
    } else if (i > 0 && j > 0 && matrix[i - 1][j - 1] < resultDistance) { //replace
      result[i - 1] = word2[j - 1]
      i -= 1
      j -= 1
      console.log(result.join(''))
    } else {
      i -= 1
      j -= 1
    }

    resultDistance = matrix[i][j]
  }

  return result.join('')
}
