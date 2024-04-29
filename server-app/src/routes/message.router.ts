// message router
import express, { RequestHandler } from 'express';
import messageController from '../controllers/message/message.controller';
import logger from '../services/logger';

const messageControllerErrorHandlerDecorator = (controller: RequestHandler, logIdentifier: string): RequestHandler => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next)
        } catch (error) {
            logger.error(`Something went wrong on error ${logIdentifier}`, error)
            res.status(500).json({
                message: `Something went wrong, please try again later`
            })
        }
    }
}

// shorthand for messageControllerErrorHandlerDecorator
const deco = messageControllerErrorHandlerDecorator

const messageRouter = express.Router({
    strict: true,
});

// add a new message
messageRouter.post('/', deco(messageController.createMessage, 'createMessage'));

// get all messages
messageRouter.get('/', deco(messageController.getMessages, 'getMessages'));

export default messageRouter;