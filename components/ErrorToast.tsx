"use client";

import { useEffect } from "react";

export default function ErrorToast({
  errors,
  onClose,
}: {
  errors: string[];
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 w-96">
      <div className="bg-red-600 text-white rounded-lg shadow-lg p-4">
        <h4 className="font-semibold mb-2">Validation Error</h4>
        <ul className="list-disc list-inside text-sm space-y-1">
          {errors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
