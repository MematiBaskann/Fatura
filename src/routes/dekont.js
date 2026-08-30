import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('dekont');
});

export default router;
