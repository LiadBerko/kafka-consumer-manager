let logger = require('./logger'),
    consumer = require('./kafkaConsumer');

let configuration;
let intervalId;

function init(config) {
    configuration = config;
    intervalId = setInterval(() => {
        let isHealthy = configuration.RESUME_PAUSE_CHECK_FUNCTION();

        if (isHealthy) {
            logger.info('ran health check and got health OK, will resume consumer if it was stopped');
            consumer.resume();
        } else {
            logger.info('ran health check and got health DOWN, will pause consumer if it was running');
            consumer.pause();
        }
    }, configuration.RESUME_PAUSE_INTERVAL_MS);
}

function stop() {
    clearInterval(intervalId);
}

module.exports = {
    init: init,
    stop: stop
};