import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_LIFETIME_IN_SECOND, REFRESH_TOKEN_LIFETIME_IN_SECOND, SECRET_KEY } from '../../config/index.js';

const checkToken = (token) => {
  try {
    isValidToken = jwt.verify(token, SECRET_KEY);
    return true
  } catch (error) {
    return false
  }
}

const updateTokens = (refreshToken) => {
  const { id } = jwt.decode(refreshToken);
  const newAccessToken = jwt.sign({ id }, SECRET_KEY, { expiresIn: ACCESS_TOKEN_LIFETIME_IN_SECOND });
  const newRefreshToken = jwt.sign({ id }, SECRET_KEY, { expiresIn: REFRESH_TOKEN_LIFETIME_IN_SECOND });
  return { accessToken: newAccessToken, refreshToken: newRefreshToken }
}

export const checkAuthCookie = (req, res, next) => {
  const isValidAccessToken = checkToken(req.cookies.accessToken ?? '');
 
  if (isValidAccessToken) {
    next();
    return;
  }

  const isValidRefreshToken = checkToken(req.cookies.refreshToken ?? '')

  if (isValidRefreshToken) {
    const { accessToken, refreshToken } = updateTokens(req.cookies.refreshToken);
 
    res.cookie('accessToken', accessToken, {
      maxAge: 1000 * ACCESS_TOKEN_LIFETIME_IN_SECOND,
      secure: true,
      httpOnly: true
    });
    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * REFRESH_TOKEN_LIFETIME_IN_SECOND,
      secure: true,
      httpOnly: true
    });

    next();
  } else {
    res.status(401).json({message: 'Вы не авторизованы'});
  }

}

