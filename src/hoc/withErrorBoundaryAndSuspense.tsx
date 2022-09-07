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
  SuspenseFallback: React.ReactNode | React.ReactNode[];
};

function withAsyncBoundary(
  Component: React.FC,
  {
    ErrorFallback,
    SuspenseFallback,
    ...restErrorBoundaryProps
  }: WithErrorBoundaryAndSuspenseProps
) {
  const component = SuspenseFallback ? (
    <Suspense fallback={SuspenseFallback}>
      <Component />
    </Suspense>
  ) : (
    <Component />
  );

  if (ErrorBoundary) {
    if (typeof ErrorFallback === 'function') {
      return () => (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          {...restErrorBoundaryProps}
        >
          {component}
        </ErrorBoundary>
      );
    } else if (ErrorFallback instanceof React.Component) {
      return () => (
        <ErrorBoundary fallback={ErrorFallback} {...restErrorBoundaryProps}>
          {component}
        </ErrorBoundary>
      );
    }
    return () => component;
  }

  return () => component;
}

export default withAsyncBoundary;
