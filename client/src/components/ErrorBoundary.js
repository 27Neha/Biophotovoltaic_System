import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Here you could also log to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });

    // Reload the page to reset the application state
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">
              <AlertTriangle size={64} />
            </div>

            <h1 className="error-title">
              Oops! Something went wrong
            </h1>

            <p className="error-message">
              We encountered an unexpected error while processing your renewable energy calculations.
              Don't worry, your data is safe. Let's get you back on track.
            </p>

            <div className="error-actions">
              <button
                onClick={this.handleReset}
                className="reset-btn"
              >
                <RefreshCw size={20} />
                Restart Application
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development)</summary>
                <div className="error-stack">
                  <h4>Error:</h4>
                  <pre>{this.state.error.toString()}</pre>

                  <h4>Component Stack:</h4>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                </div>
              </details>
            )}

            <div className="help-section">
              <h3>Need Help?</h3>
              <p>
                If this problem persists, please try refreshing your browser or
                contact our support team for assistance with your biophotovoltaic system.
              </p>
            </div>
          </div>

          <style jsx>{`
            .error-boundary {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #0a4d0a 0%, #1a7a1a 50%, #0d5d0d 100%);
              padding: 20px;
            }

            .error-content {
              max-width: 600px;
              width: 100%;
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-radius: 20px;
              padding: 40px;
              text-align: center;
              color: white;
              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            }

            .error-icon {
              color: #ef4444;
              margin-bottom: 24px;
              animation: pulse 2s ease-in-out infinite;
            }

            .error-title {
              font-size: 2rem;
              font-weight: 700;
              margin-bottom: 16px;
              color: #ffffff;
            }

            .error-message {
              font-size: 1.1rem;
              line-height: 1.6;
              margin-bottom: 32px;
              opacity: 0.9;
            }

            .error-actions {
              margin-bottom: 40px;
            }

            .reset-btn {
              display: inline-flex;
              align-items: center;
              gap: 12px;
              background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
              color: white;
              border: none;
              padding: 14px 28px;
              font-size: 1rem;
              font-weight: 600;
              border-radius: 12px;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 10px 25px rgba(74, 222, 128, 0.3);
            }

            .reset-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 15px 35px rgba(74, 222, 128, 0.4);
            }

            .error-details {
              background: rgba(0, 0, 0, 0.3);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
              text-align: left;
            }

            .error-details summary {
              cursor: pointer;
              font-weight: 600;
              margin-bottom: 16px;
              color: #4ade80;
            }

            .error-stack {
              margin-top: 16px;
            }

            .error-stack h4 {
              color: #4ade80;
              margin: 16px 0 8px 0;
              font-size: 0.9rem;
            }

            .error-stack pre {
              background: rgba(0, 0, 0, 0.5);
              padding: 12px;
              border-radius: 4px;
              font-size: 0.8rem;
              overflow-x: auto;
              white-space: pre-wrap;
              word-break: break-word;
            }

            .help-section {
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              padding-top: 30px;
            }

            .help-section h3 {
              font-size: 1.2rem;
              font-weight: 600;
              margin-bottom: 12px;
              color: #4ade80;
            }

            .help-section p {
              font-size: 0.9rem;
              opacity: 0.8;
              line-height: 1.5;
            }

            @keyframes pulse {
              0%, 100% {
                opacity: 1;
                transform: scale(1);
              }
              50% {
                opacity: 0.7;
                transform: scale(1.05);
              }
            }

            @media (max-width: 768px) {
              .error-content {
                padding: 30px 20px;
                margin: 10px;
              }

              .error-title {
                font-size: 1.6rem;
              }

              .error-message {
                font-size: 1rem;
              }

              .reset-btn {
                padding: 12px 24px;
                font-size: 0.9rem;
              }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;