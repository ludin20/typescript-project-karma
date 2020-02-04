import React from 'react';
import { Environment } from 'relay-runtime';
import { RouterState } from 'found';

interface RenderRelayComponent extends RouterState {
  Component: React.ComponentType<any> | null;
  environment: Environment;
  error: Error;
  props: {};
  resolving: boolean;
  retry: () => void;
  variables: {};
}

export default function renderRelayComponent({
  Component,
  environment,
  error,
  match,
  props,
  resolving,
  retry,
  variables,
}: RenderRelayComponent) {
  if (error) {
    return (
      <div>
        <p>{error.toString()}</p>
        <button text="Retry" onClick={retry} />
      </div>
    );
  }

  if (props) {
    return <Component query={props} match={match} />;
  }

  return <div>loading</div>;
}
