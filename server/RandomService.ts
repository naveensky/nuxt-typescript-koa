import logger from "../server/Logger";

export default class RandomService {
  print(){
    logger.warn("From Random Service");
  }
}
