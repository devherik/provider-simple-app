"use client";

export default function LoadingPage() {
  return (
    <div
      style={{
        width: "100vw",
        minWidth: "100%",
        maxWidth: "100%",
        height: "100vh",
        minHeight: "100%",
        maxHeight: "100%",
      }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <h1 className="text-3xl font-bold mb-4">Loading...</h1>
    </div>
  );
}
// This code defines a simple loading page using React and Tailwind CSS.
// It includes a heading and a message indicating that content is being loaded.
// The page is styled to be centered and responsive, providing a user-friendly loading experience.
// This page can be used as a placeholder while data is being fetched or processed.
