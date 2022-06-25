import * as express from 'express';
const router = express.Router();

const getPing = async (_req, res) => {
  const body = { message: 'hello' };
  return res.send(body).status(200);
};

 
router.get('/', getPing);

export default router;
