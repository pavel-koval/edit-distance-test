import { editDistance, edit } from './lib'

test('distance between "" and ""', () => expect(editDistance('', '')).toBe(0))
test('distance between "polynomial" and "exponential"', () => expect(editDistance('polynomial', 'exponential')).toBe(6))
test('distance between "sitting" and "kitten"', () => expect(editDistance('sitting', 'kitten')).toBe(3))

test('edit "" to ""', () => expect(edit('', '')).toBe(''))
test('edit "polynomial" to "exponential"', () => expect(edit('polynomial', 'exponential')).toBe('exponential'))
test('edit "sitting" to "kitten"', () => expect(edit('sitting', 'kitten')).toBe('kitten'))
