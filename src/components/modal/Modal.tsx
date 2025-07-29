type PositionTypes =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

export default function Modal({
  isOpen,
  onClose,
  position,
  children,
  isBluer = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  position: PositionTypes;
  children: React.ReactNode;
  isBluer?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <button className="absolute top-2 right-2" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
