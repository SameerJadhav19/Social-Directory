import jwt from 'jsonwebtoken';
import { logger } from '../../logger/logger.js';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
 export const userAuth = async (req, res, next) => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken)
        throw {
          code: res.status(404),
          message: 'Authorization token is required'
        };
      bearerToken = bearerToken.split(' ')[1];
  
      const user = jwt.verify(bearerToken, process.env.SECRET_KEY);
      req.user = user;
      res.locals.user = user;
      res.locals.token = bearerToken;
      next();
    } catch (error) {
        res.status(404).json({message: "token expired"});
       logger.error(error);
    }
  };