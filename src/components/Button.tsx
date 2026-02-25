import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button
            className={`px-4 py-2 rounded-xl font-medium transition 
      bg-blue-600 text-white hover:opacity-90 disabled:opacity-50 ${className ?? ""}`}
            {...props}
        >
            {children}
        </button>
    );
}