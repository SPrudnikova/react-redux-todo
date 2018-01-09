import _ from 'lodash';

export const required = _.memoize((msg = 'Must be filled') => value => value ? undefined : msg);

export const minLength = _.memoize((min=5) => value => value && value.length < min ? `Must be at least ${min}` : undefined) ;