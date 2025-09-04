import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message?: string; stack?: string };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err: unknown): State {
    return { hasError: true, message: err instanceof Error ? err.message : String(err) };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ stack: info.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, background: "#111827", color: "#fff", minHeight: "100vh" }}>
          <h2 style={{ marginBottom: 8 }}>😵 Oops — something crashed while rendering.</h2>
          {this.state.message && <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.message}</pre>}
          {this.state.stack && (
            <>
              <h3 style={{ marginTop: 16 }}>Component stack</h3>
              <pre style={{ whiteSpace: "pre-wrap", opacity: 0.8 }}>{this.state.stack}</pre>
            </>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
