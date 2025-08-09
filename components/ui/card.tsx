
import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return <div className={`p-4 border rounded ${className ?? ""}`}>{children}</div>;
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={`border-b px-4 py-2 font-bold ${className ?? ""}`}>{children}</div>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={`px-4 py-2 ${className ?? ""}`}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h3 className={`text-lg font-semibold mb-2 ${className ?? ""}`}>{children}</h3>;
}

export function CardDescription({ children, className }: CardProps) {
  return <p className={`text-sm text-gray-500 mb-2 ${className ?? ""}`}>{children}</p>;
}
