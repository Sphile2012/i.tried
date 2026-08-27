import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          color: '#e2e8f0',
          padding: '20px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{ maxWidth: '600px', width: '100%' }}>
            <h1 style={{ color: '#ef4444', fontSize: '24px', marginBottom: '16px' }}>
              Application Error
            </h1>
            <p style={{ marginBottom: '20px', color: '#94a3b8' }}>
              The application encountered an error and couldn't load properly.
            </p>
            
            <div style={{
              background: '#1e293b',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px',
              overflow: 'auto'
            }}>
              <p style={{ fontWeight: 'bold', marginBottom: '8px', color: '#f87171' }}>
                Error:
              </p>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '14px' }}>
                {this.state.error?.toString()}
              </pre>
            </div>

            {this.state.errorInfo && (
              <details style={{
                background: '#1e293b',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '8px', color: '#94a3b8' }}>
                  Stack Trace
                </summary>
                <pre style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  fontSize: '12px',
                  color: '#64748b'
                }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                marginRight: '12px'
              }}
            >
              Reload Page
            </button>

            <a
              href="/"
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontSize: '16px'
              }}
            >
              Go to Home
            </a>

            <div style={{
              marginTop: '20px',
              padding: '12px',
              background: '#1e293b',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#94a3b8'
            }}>
              <p style={{ margin: 0 }}>
                <strong>For administrators:</strong> Check the browser console (F12) for more details.
                Verify that all environment variables are configured in Netlify.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
