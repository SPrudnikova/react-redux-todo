import {success, error, warning, info, removeAll} from 'react-notification-system-redux';
import {NOTIFICATION_ERRORS, NOTIFICATION_SUCCESS} from 'const/notificationsMaps';

export default store => next => action => {
  const {type, message} = action;
  if (NOTIFICATION_ERRORS[type]) {
    next(error({message: message, autoDismiss: 5}));
  } else if (NOTIFICATION_SUCCESS[type]) {
    next(error({message: message, autoDismiss: 5}));
  }

  next(action)
}