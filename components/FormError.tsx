import React from "react";

const FormError = ({ message }: { message?: string | null }) => {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <p>{message}</p>
    </div>
  );
};

export default FormError;
