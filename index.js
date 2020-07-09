const util = require('util');
const moment = require('moment');

module.exports = function (stream) {
  if (!stream) stream = process.stdout;

  // eslint-disable-next-line func-names
  return async function accesslog(ctx, next) {
    await next();

    // ip, date, method, path, status and length
    const format = '%s - - [%s] "%s %s HTTP/1.X" %d %s\n';

    // eslint-disable-next-line unicorn/explicit-length-check
    const length = ctx.length ? ctx.length.toString() : '-';
    const date = moment().format('D/MMM/YYYY:HH:mm:ss ZZ');

    stream.write(
      util.format(
        format,
        ctx.ip,
        date,
        ctx.method,
        ctx.path,
        ctx.status,
        length
      )
    );
  };
};
