export type FlowMethod<T, D> = (params: T) => D;
export type FlowTapMethod<T> = (params: T) => void;

export class AsyncFlowlet<TContext> {
  constructor(private context: Promise<TContext>) {}

  async then<TReturn>(
    asyncPipe: (pipe: Flowlet<TContext>) => Flowlet<TReturn>
  ): Promise<Flowlet<TReturn>> {
    return await this.context.then((data) => {
      const pipe = Flowlet.start(data);
      return asyncPipe(pipe);
    });
  }
}

export class Flowlet<TContext> {
  constructor(private data: TContext) {}

  static start<InitContext>(context: InitContext) {
    return new Flowlet<InitContext>(context);
  }

  tap(method: FlowTapMethod<TContext>) {
    method(this.data);
    return this;
  }

  asyncStep<TReturn>(method: FlowMethod<TContext, Promise<TReturn>>) {
    const result = method(this.data);
    return new AsyncFlowlet(result);
  }

  step<TReturn>(method: FlowMethod<TContext, TReturn>) {
    const result = method(this.data);
    return new Flowlet<TReturn>(result);
  }

  end() {
    return this.data;
  }
}
