import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedFromError(error) {
    return {
      hasError: true,
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center m-12">
          <h1 className="text-base text-red-600 m-4">{this.props.message}</h1>
          <button
            onClick={() => {
              window.location.reload(false);
            }}
            className="text-green-500 border-2 px-4 py-2 rounded"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
