const UniversalConstants = require('./UniversalConstants');

class Utilities {

    checkMacId(mac) {
        return UniversalConstants.MAC_REGEX.test(mac);
    }

}

module.exports = new Utilities();