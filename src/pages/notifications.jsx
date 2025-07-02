export default function Notification({ message, type = "success", onClose }) {
  if (!message) return null;
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  return (
    <div
      className={`${bgColor} text-white p-3 rounded fixed top-4 right-4 shadow-lg cursor-pointer`}
      onClick={onClose}
    >
      {message}
    </div>
  );
}
