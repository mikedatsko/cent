const isLogging = true;

class Log {
  constructor() {
    this.logger = console;
    this.entityName = '';
  }

  setEntity(entityName) {
    log('entityName', entityName);
  }

  set entity(entityName) {
    log('setEntity', entityName);
    this.entityName = entityName;
  }

  get entity() {
    return this.entityName;
  }

  warn() {
    this.logger.warn(this.entity, ...args);
  }

  log(args) {
    this.logger.log(this.entityName, ...args);
  }
}


const logger = new Log();

export const log = function() {


  // this.setEntity = function(entityName) {
  //   console.log('entityName', entityName);
  // };
  // console.log.apply(null, arguments);
};
