import * as functions from 'firebase-functions';
import * as util from 'util';

export const fakeauth = functions.https.onRequest((request, response) => {
  const responseurl = util.format(
    '%s?code=%s&state=%s',
    decodeURIComponent(request.query.redirect_uri),
    'xxxxxx',
    request.query.state
  );
  console.log(responseurl);
  response.redirect(responseurl);
  return;
});

export const faketoken = functions.https.onRequest((request, response) => {
  const grantType = request.query.grant_type
    ? request.query.grant_type
    : request.body.grant_type;
  const secondsInDay = 86400; // 60 * 60 * 24
  const HTTP_STATUS_OK = 200;
  console.log(`Grant type ${grantType}`);

  let obj;
  if (grantType === 'authorization_code') {
    obj = {
      token_type: 'bearer',
      access_token: '123access',
      refresh_token: '123refresh',
      expires_in: secondsInDay
    };
  } else if (grantType === 'refresh_token') {
    obj = {
      token_type: 'bearer',
      access_token: '123access',
      expires_in: secondsInDay
    };
  }
  response.status(HTTP_STATUS_OK).json(obj);
});
