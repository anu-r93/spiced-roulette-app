const SubmitButton = ({ text }) => {
  return (
    <div className="flex items-center justify-between">
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;
