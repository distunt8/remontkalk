import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorState } from "@/components/home/cards";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class CalcBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Calculator UI error:", error, info);
  }

  render() {
    if (this.state.hasError) return <ErrorState />;
    return this.props.children;
  }
}
