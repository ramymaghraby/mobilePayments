import {
  /* inject, */
  globalInterceptor,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('', {tags: {name: 'logging'}})
export class LoggingInterceptor implements Provider<Interceptor> {
  /*
  constructor() {}
  */

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      // ----- ADDED THIS LINE ----
      console.log('log: before-' + invocationCtx.targetName);
      
      const result = await next();
    
      // Add post-invocation logic here
      // ----- ADDED THIS LINE -----
      console.log('log: after-' + invocationCtx.targetName);
    
      return result;
    } catch (err) {
      // Add error handling logic here
      console.error(err);
      throw err;
    }
    // try {
    //   // Add pre-invocation logic here
    //   const result = await next();
    //   // Add post-invocation logic here
    //   return result;
    // } catch (err) {
    //   // Add error handling logic here
    //   throw err;
    // }
  }
}
