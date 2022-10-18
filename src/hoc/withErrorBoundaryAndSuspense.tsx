import React, { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import type {
  ErrorBoundaryPropsWithFallback,
  ErrorBoundaryPropsWithComponent
} from 'react-error-boundary';

type ErrorBoundaryProps =
  | Omit<ErrorBoundaryPropsWithComponent, 'FallbackComponent'>
  | Omit<ErrorBoundaryPropsWithFallback, 'fallback'>;

type WithErrorBoundaryAndSuspenseProps = ErrorBoundaryProps & {
  ErrorFallback?:
    | React.ComponentType<FallbackProps>
    | React.ReactElement<
        unknown,
        string | React.FunctionComponent | typeof React.Component
      >
    | null;
  SuspenseFallback:
    | React.ReactNode
    | React.ReactNode[]
    | ((props: any) => JSX.Element);
};

function withAsyncBoundary<T>(
  Component: (props: T) => JSX.Element,
  {
    ErrorFallback,
    SuspenseFallback,
    ...restErrorBoundaryProps
  }: WithErrorBoundaryAndSuspenseProps
): (props: T) => JSX.Element {
  const ComponentWithSuspense = (props: any) =>
    SuspenseFallback ? (
      <Suspense
        fallback={
          typeof SuspenseFallback === 'function' ? (
            <SuspenseFallback {...props} />
          ) : (
            SuspenseFallback
          )
        }
      >
        <Component {...props} />
      </Suspense>
    ) : (
      <Component {...props} />
    );

  if (ErrorBoundary) {
    if (typeof ErrorFallback === 'function') {
      return (props: any) => (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          {...restErrorBoundaryProps}
        >
          <ComponentWithSuspense {...props} />
        </ErrorBoundary>
      );
    } else if (ErrorFallback instanceof React.Component) {
      return (props: any) => (
        <ErrorBoundary fallback={ErrorFallback} {...restErrorBoundaryProps}>
          <ComponentWithSuspense {...props} />
        </ErrorBoundary>
      );
    }
    return ComponentWithSuspense;
  }

  return ComponentWithSuspense;
}

export default withAsyncBoundary;
