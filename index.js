var proc = require('child_process');
var Promise = require('bluebird');
var _ = require('lodash');

exports.exec = function (options) {
  var args = [ options.name ];
  delete options.name;
  args = _.compact(args.concat(_.flatten(_.map(options, function (value, flag) {
    return [ '--' + flag, ((value === true) ? '' : value) ];
  }))));
  return new Promise(function (resolve, reject) {
    proc.exec('pgrep ' + args.join(' '), function (error, stdout, stderr) {
      if (error) return reject(error);

      resolve(_.map(_.compact(stdout.split('\n')), function (pid) {
        return parseInt(pid);
      }));
    });
  });
};
