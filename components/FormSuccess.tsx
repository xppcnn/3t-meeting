import React from "react";

const FormSuccess = ({ message }: { message?: string | null }) => {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
