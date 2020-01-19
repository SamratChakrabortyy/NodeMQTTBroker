const log4js = require("log4js");
const log4js_extend = require("log4js-extend");

log4js.configure({
	appenders: {
    "console": { type: 'console' },
	"accesslog": { 
      type: 'file', 
      filename: `/var/log/nodeActor.log`
    }
	},
  categories: {
    "default": { level: "debug", appenders: [ "accesslog" ] }
  }
});
 
log4js_extend(log4js, {
  path: null,
  format: "[@name @file:@line:@column]"
});
 
const logger = log4js.getLogger();

module.exports = logger;

