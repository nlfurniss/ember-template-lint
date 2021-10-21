'use strict';

const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({
  name: 'require-presentational-children',

  config: true,

  good: [
    '<button></button>',
    '<div></div>',
    '<li role="tab">Tab title</li>',
    '<li role="tab"><h3 role="presentation">Tab Title</h3></li>',
    '<div role="button"><div><span></span></div></div>',
    '<span role="checkbox"/>',
    '<div role="article"><h2>Hello</h2></div>',
    `
    <ul role="tablist">
      <li role="presentation">
        <a role="tab" href="#">Tab 1</a>
      </li>
    </ul>
    `,
    `
    <svg role="img">
      <title>Title here</title>
      <circle cx="10" cy="10" r="10"></circle>
    </svg>`,
  ],

  bad: [
    {
      template: '<div role="button"><h2>Test</h2></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "endColumn": 38,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "<div> has a role of button, it cannot have semantic descendants like <h2>",
              "rule": "require-presentational-children",
              "severity": 2,
              "source": "<div role=\\"button\\"><h2>Test</h2></div>",
            },
          ]
        `);
      },
    },
    {
      template: '<div role="button"><h2 role="presentation"><img /></h2></div>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "endColumn": 61,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "<div> has a role of button, it cannot have semantic descendants like <img>",
              "rule": "require-presentational-children",
              "severity": 2,
              "source": "<div role=\\"button\\"><h2 role=\\"presentation\\"><img /></h2></div>",
            },
          ]
        `);
      },
    },
    {
      template:
        '<div role="button"><h2 role="presentation"><button>Test <img/></button></h2></div>',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "endColumn": 82,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "<div> has a role of button, it cannot have semantic descendants like <button>",
              "rule": "require-presentational-children",
              "severity": 2,
              "source": "<div role=\\"button\\"><h2 role=\\"presentation\\"><button>Test <img/></button></h2></div>",
            },
            Object {
              "column": 0,
              "endColumn": 82,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "<div> has a role of button, it cannot have semantic descendants like <img>",
              "rule": "require-presentational-children",
              "severity": 2,
              "source": "<div role=\\"button\\"><h2 role=\\"presentation\\"><button>Test <img/></button></h2></div>",
            },
          ]
        `);
      },
    },
  ],
});
