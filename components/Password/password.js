const { useController } = require("react-hook-form");

const Password = ({ control }) => {
  const { field, fieldState } = useController({
    name: "password",
    control,
    rules: { required: true },
  });

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Enter your password"
        name={field.name}
        value={field.password}
        onChange={field.onChange}
      />
      <span>{fieldState.error ? "Please enter password." : ""}</span>
    </div>
  );
};

export default Password;
