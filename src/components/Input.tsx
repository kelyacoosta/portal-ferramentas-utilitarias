import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-full">
                {label && (
                    <label className="text-sm font-medium">
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    className={`px-3 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${className ?? ""}`}
                    {...props}
                />

                {error && (
                    <span className="text-red-500 text-xs">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";