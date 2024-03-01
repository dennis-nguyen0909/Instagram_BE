const color = require('colors');

class OutputType { }

OutputType.INFORMATION = "INFORMATION";
OutputType.SUCCESS = "SUCCESS";
OutputType.ERROR = "ERROR";
OutputType.WARNING = "WARNING";

function print(message, outputType) {
    switch (outputType) {
        case OutputType.INFORMATION:
            console.log(color.blue(message));
            break;
        case OutputType.SUCCESS:
            console.log(color.green(message));
            break;
        case OutputType.ERROR:
            console.log(color.red(message));
            break;
        case OutputType.WARNING:
            console.log(color.yellow(message));
            break;
        default:
            break;
    }
}

module.exports = {
    print,
    OutputType
};
