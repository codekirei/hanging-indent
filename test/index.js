'use strict'

//----------------------------------------------------------
// Modules
//----------------------------------------------------------
const assert = require('chai').assert
const faker = require('faker')
const hangingIndent = require('../')

//----------------------------------------------------------
// Tests
//----------------------------------------------------------
// create sample texts
const texts = []
for (let i = 0; i < 25; i++) {
  texts.push(
    faker.fake('{{lorem.paragraphs}}')
      .replace(/\n/g, ' ')
      .replace(/\s{2}\r/g, ' ')
  )
}

describe('params', () => {
  describe('indent', () => {
    function testCase(indent) {
      return texts
        .map(text => {
          return indent
            ? hangingIndent(text, indent)
            : hangingIndent(text)
        })
        .map(text => text.split('\n'))
        .map(lines => {
          for (let i = 1; i < lines.length; i++) {
            indent
              ? assert.isTrue(lines[i].startsWith(' '.repeat(indent)))
              : assert.isTrue(lines[i].startsWith(' '.repeat(4)))
          }
        })
    }

    it('use default', () => testCase())
    it('override with larger param', () => testCase(6))
    it('override with smaller param', () => testCase(2))
  })

  describe('limit', () => {
    function testCase(limit) {
      return texts
        .map(text => {
          return limit
            ? hangingIndent(text, 4, limit)
            : hangingIndent(text)
        })
        .map(text => text.split('\n'))
        .map(lines => {
          lines.map(line => {
            limit
              ? assert.isTrue(line.length <= limit)
              : assert.isTrue(line.length <= 80)
          })
        })
    }
    it('use default', () => testCase())
    it('override with larger param', () => testCase(100))
    it('override with smaller param', () => testCase(50))
  })
})

describe('lines', () => {
  it('all line lengths except last not equal to limit', () => {
    texts.map(text => hangingIndent(text))
      .map(text => text.split('\n'))
      .map(lines => lines.map(line => line.length))
      .map(lengths => lengths.filter((el, i) => i !== lengths.length - 1))
      .map(lengths => {
        assert.isFalse(lengths.every(length => length === 80))
      })
  })
})
