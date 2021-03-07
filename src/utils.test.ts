import { ascendingBy, descendingBy } from 'utils'

describe('ascendingBy()', () => {
  it('Sorts items in ascending order by a given key', () => {
    const input = [{ name: 'Pizza' }, { name: 'Burrito' }, { name: 'Burrito' }, { name: 'Ramen' }]
    const output = [{ name: 'Burrito' }, { name: 'Burrito' }, { name: 'Pizza' }, { name: 'Ramen' }]

    expect(input.sort(ascendingBy('name'))).toEqual(output)
  })
})

describe('descendingBy()', () => {
  it('Sorts items in descending order by a given key', () => {
    const input = [{ name: 'Pizza' }, { name: 'Ramen' }, { name: 'Burrito' }, { name: 'Ramen' }]
    const output = [{ name: 'Ramen' }, { name: 'Ramen' }, { name: 'Pizza' }, { name: 'Burrito' }]

    expect(input.sort(descendingBy('name'))).toEqual(output)
  })
})
