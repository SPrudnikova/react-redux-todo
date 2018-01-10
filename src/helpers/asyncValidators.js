import {findUserByUsername} from

export const asyncUsernameValidate = (values /*, dispatch */) => {
  return findUserByUsername
    .then(() => {
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw { username: 'That username is taken' }
    }
  })
};