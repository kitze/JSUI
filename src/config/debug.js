import { CreateStylesDebugger } from 'styles-debugger';

const isDev = process.env.NODE_ENV === 'development';

export const debug = CreateStylesDebugger({
  enabled: !isDev ? false : true
});
