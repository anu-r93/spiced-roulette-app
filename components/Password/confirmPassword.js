import { useController } from "react-hook-form";

const ConfirmPassword = ({ control }) => {
  const { field, fieldState } = useController({
    name: "confirmPassword",
    control,
    rules: { required: true },
  });

  return (
    <div className="mb-6">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="confirmPassword"
      >
        Confirm Password
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        name={field.name}
        value={field.confirmPassword}
        onChange={field.onChange}
      />
      <span>{fieldState.error ? "Please confirm password." : ""}</span>
    </div>
  );
};

export default ConfirmPassword;
