import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const jwtToken = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (jwtToken) {
    try {
      const decoded = jwt.verify(jwtToken, 'secret_key');

      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: 'Не удалось проверить доступ',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};
