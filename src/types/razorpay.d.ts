declare global {
  interface Window {
    Razorpay: new (options: any) => {
      open: () => void;
      on: (event: string, handler: () => void) => void;
    };
  }
}

export {};