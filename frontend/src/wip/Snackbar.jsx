export default function Snackbar({ message, onClose, visible }) {
  return (
    <div
      className={`z-99 fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      role="alert"
    >
      {message}
      <button
        onClick={onClose}
        className="ml-4 font-bold focus:outline-none"
        aria-label="Close snackbar"
      >
        ×
      </button>
    </div>
  );
}
