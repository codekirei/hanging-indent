'use strict'

//----------------------------------------------------------
// Modules
//----------------------------------------------------------
const chai = require('chai').assert
const faker = require('faker')
const hangingIndent = require('../')

//----------------------------------------------------------
// Tests
//----------------------------------------------------------
const sampleText = faker.fake('{{lorem.paragraphs}}').split('\n').join(' ')
describe('params', () => {
  it('use default when unspecified')
  it('override default when specified')
})
describe('lines', () => {
  it('none over limit')
  it('indent all except first')
  it('all but last not same length')
})
