import { randomUUID } from 'node:crypto';

const store = new Map();

export default function session() {
  return (req, res, next) => {
    const sid = req.headers.cookie?.match(/fd_sid=([^;]+)/)?.[1] || randomUUID();
    if (!store.has(sid)) store.set(sid, {});
    req.session = store.get(sid);
    res.setHeader('Set-Cookie', `fd_sid=${sid}; Path=/; HttpOnly; SameSite=Lax`);
    next();
  };
}
