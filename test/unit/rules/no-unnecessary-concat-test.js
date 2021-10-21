'use strict';

const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({
  name: 'no-unnecessary-concat',

  config: true,

  good: ['<div class={{clazz}}></div>', '<div class="first {{second}}"></div>', '"{{foo}}"'],

  bad: [
    {
      template: '<div class="{{clazz}}"></div>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 11,
              "endColumn": 22,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Unnecessary string concatenation. Use {{clazz}} instead of \\"{{clazz}}\\".",
              "rule": "no-unnecessary-concat",
              "severity": 2,
              "source": "\\"{{clazz}}\\"",
            },
          ]
        `);
      },
    },
    {
      template: '<img src="{{url}}" alt="{{t "alternate-text"}}">',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 9,
              "endColumn": 18,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Unnecessary string concatenation. Use {{url}} instead of \\"{{url}}\\".",
              "rule": "no-unnecessary-concat",
              "severity": 2,
              "source": "\\"{{url}}\\"",
            },
            Object {
              "column": 23,
              "endColumn": 47,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Unnecessary string concatenation. Use {{t \\"alternate-text\\"}} instead of \\"{{t \\"alternate-text\\"}}\\".",
              "rule": "no-unnecessary-concat",
              "severity": 2,
              "source": "\\"{{t \\"alternate-text\\"}}\\"",
            },
          ]
        `);
      },
    },
  ],
});
