import React, { useState, useEffect } from "react";

export default function Toast() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"error" | "success">("error");

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<{
        message: string;
        type?: "error" | "success";
      }>;
      setMessage(customEvent.detail.message);
      setType(customEvent.detail.type || "error");
      setIsVisible(true);
    };

    window.addEventListener("show-toast", handleToast);
    return () => window.removeEventListener("show-toast", handleToast);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  // Clases dinámicas basadas en el tipo
  const containerClass =
    type === "error"
      ? "bg-error-container border-error text-on-error-container"
      : "bg-green-100 border-green-500 text-green-800"; // Clases base Tailwind para éxito

  const iconName = type === "error" ? "error" : "check_circle";
  const iconColor = type === "error" ? "text-error" : "text-green-600";

  return (
    <div
      data-test={`${type}-toast`}
      className={`fixed bottom-6 right-6 z-50 border px-md py-sm rounded-xl custom-shadow flex items-center gap-sm success-checkmark-animation ${containerClass}`}
    >
      <span className={`material-symbols-outlined ${iconColor}`}>
        {iconName}
      </span>
      <p className="font-label-md text-label-md font-semibold">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="hover:opacity-70 p-xs rounded-full flex items-center justify-center transition-opacity"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}
