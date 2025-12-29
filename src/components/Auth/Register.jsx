import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../State/Action/Action";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user) {
      navigate("/"); 
    }
  }, [auth.user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      phone: data.get("phone"),
      role: data.get("role"),
    };

    dispatch(register(userData));
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8 bg-gray-900 border border-gray-700 rounded-lg shadow-lg mt-10">
      {/* Logo + Heading */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      {/* Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* First Name */}
          <input
            name="firstName"
            required
            placeholder="First Name"
            className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
          />

          {/* Last Name */}
          <input
            name="lastName"
            required
            placeholder="Last Name"
            className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
          />

          {/* Phone */}
          <input
            name="phone"
            required
            placeholder="Phone Number"
            className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
          />

          {/* Role */}
          <select
            name="role"
            defaultValue="USER"
            className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
          >
            <option value="USER" className="bg-gray-900">User</option>
            <option value="ADMIN" className="bg-gray-900">Admin</option>
          </select>

          {/* Register Button */}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
          >
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

