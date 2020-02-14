import { Notifier } from '../types';

export default [require('./slack').default, require('./teams').default] as Notifier[];
