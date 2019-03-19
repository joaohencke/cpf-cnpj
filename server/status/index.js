let searchCounter = 0;

exports.uptime = () => process.uptime();

exports.increment = (step = 1) => {
  searchCounter += step;
  return searchCounter;
};

exports.get = () => ({ searchCounter, uptime: process.uptime() });
