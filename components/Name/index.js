const { useController, register } = require("react-hook-form");

const Name = ({ control }) => {
  const { field, fieldState } = useController({
    name: "fullName",
    control,
    rules: { required: true },
  });

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="fullName">
        Name
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="fullName"
        type="text"
        placeholder="Enter your name"
        name={field.name}
        value={field.value}
        onChange={field.onChange}
      />
      <span>{fieldState.error ? "Please enter name." : ""}</span>
    </div>
  );
};

export default Name;
