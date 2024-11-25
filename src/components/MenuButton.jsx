export function MenuButton({ children, onClick }) {
  return (
    <button
      className="w-48 py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
