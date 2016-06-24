"format cjs";

var wrap = require('word-wrap');

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = {

  // When a user runs `git cz`, prompter will
  // be executed. We pass you cz, which currently
  // is just an instance of inquirer.js. Using
  // this you can ask questions and get answers.
  //
  // The commit callback should be executed when
  // you're ready to send back a commit template
  // to git.
  //
  // By default, we'll de-indent your commit
  // template and will keep empty lines.
  prompter: function(cz, commit) {
    console.log('\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n');

    // Let's ask some questions of the user
    // so that we can populate our commit
    // template.
    //
    // See inquirer.js docs for specifics.
    // You can also opt to use another input
    // collection library if you prefer.
    cz.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Select the type of change that you\'re committing:',
        choices: [
        {
          name: 'story:      故事卡',
          value: 'STORY'
        }, {
          name: 'bug:      bug fix',
          value: 'BUG'
        }, {
          name: 'commit:      普通提交',
          value: 'COMMIT'
          }]
      }, {
        type: 'input',
        name: 'scope',
        message: 'Jira Issue ID(s) 或者 输入一个普通提交信息 (必填):\n',
        validate: function(input) {
          if (!input) {
            return '必须输入一个Jira Issue ID(s) 或者 输入一个普通提交信息';
          } else {
            return true;
          }
        }
      }, {
        type: 'input',
        name: 'subject',
        message: '对Jira Issue ID(s)的一个简单描述(小于100字):\n'
      }, {
        type: 'input',
        name: 'body',
        message: '详细描述(可选):\n'
      }
    ]).then(function(answers) {

      var maxLineWidth = 100;

      var wrapOptions = {
        trim: true,
        newline: '\n',
        indent:'',
        width: maxLineWidth
      };

      // parentheses are only needed when a scope is present
      var scope = answers.scope.trim();
      scope = scope ? '[' + answers.scope.trim() + ']' : '';

      // Hard limit this line
      var head = (answers.type + scope + ': ' + answers.subject.trim()).slice(0, maxLineWidth);
      if(answers.type === 'COMMIT') {
          var subject = answers.subject.trim();
          subject = subject ? ' - ' + answers.subject.trim() : '';
          head = (answers.type + ': ' + answers.scope.trim() + ' - ' + subject).slice(0, maxLineWidth);
      }

      // Wrap these lines at 100 characters
      var body = answers.body.trim();
      body = body ? '\n详细描述: ' + answers.body.trim() : ''
      var body = wrap(body, wrapOptions);

      commit(head + '\n' + body);
    });
  }
}
