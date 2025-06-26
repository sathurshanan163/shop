import { isValidObjectId } from 'mongoose';

const object_id = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid object_id of: ${req.params.id}`);
  }
  next();
};

export default object_id;
