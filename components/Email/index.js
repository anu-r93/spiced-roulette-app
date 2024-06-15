const { useController } = require("react-hook-form");

const Email = ({ control }) => {
  const { field, fieldState } = useController({
    name: "email",
    control,
    rules: { required: true },
  });

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        placeholder="Enter your email"
        name="email"
        value={field.email}
        onChange={field.onChange}
      />
      <span>{fieldState.error ? "Please enter email." : ""}</span>
    </div>
  );
};

export default Email;
