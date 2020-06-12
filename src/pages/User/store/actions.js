import { actionType } from './index';

export const saveLoginInfo = loginInfo => ({
  type: actionType.SAVE_LOGIN_INFO,
  payload: loginInfo
})
