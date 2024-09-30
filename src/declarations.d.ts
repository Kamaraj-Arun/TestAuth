// src/declarations.d.ts
declare module "*.png" {
  const value: string;
  export default value;
}

interface Window {
  FB: any;
  fbAsyncInit?: () => void;
  Razorpay: any;
}

declare global {
  interface Window {
    fbAsyncInit?: () => void;
  }
}

// rsuite.d.ts
declare module "rsuite" {
  export const RangeSlider: any; // If you need more accurate typing, you can refine this
  export const Toggle: any;
  export const DatePicker: any;
  export const Loader: any;
  export const Dropdown: any;
  export const toaster: any;
  export const Notification: any;
  export const Progress: any;
  export const Modal: any;
  export const Progress: any;
  export const Progress: any;
  // Button, ButtonToolbar, Placeholder;
}
