import { Component } from 'react';
import ErrorState from './ErrorState';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Se registra en consola para depuración; nunca se deja la pantalla
    // en blanco de cara al usuario.
    console.error('LRDC-TV: error no controlado', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-shell">
          <main className="page">
            <ErrorState
              title="Algo falló en la transmisión"
              message="Se ha producido un error inesperado en la aplicación."
              onRetry={this.handleRetry}
            />
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}
