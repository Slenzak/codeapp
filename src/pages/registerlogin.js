import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "../supabase";


const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    const { error } = await supabase.auth.signInWithPassword({
      email: `${username}@whocares.com`,
      password: password,
    });
  
    if (error) {
      alert("Login failed: " + error.message);
    } else {
      alert("Welcome back!");
      navigate("/");
    }
  };
  

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: `${username}@whocares.com`,
        password: password,
      });

      if (error) throw error;

      alert("Registration successful!");
      setIsLogin(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert("Wylogowano.");
    setSession(null);
  };
  if (session) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#36393e]">
        <div className="bg-[#2f3136] p-8 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-white text-2xl font-semibold mb-4">
            Welcome, {username || session.user.email.split('@')[0]}
          </h2>
          <button
            onClick={handleLogout}
            className="w-full p-2 bg-red-600 text-white rounded-md mt-4"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full p-2 bg-blue-600 text-white rounded-md mt-4"
          >
            Go to Main Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#36393e]">
      <div className="bg-[#2f3136] p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 text-sm font-semibold ${
              isLogin ? "bg-blue-600 text-white" : "bg-[#2f3136] text-white"
            } rounded-l-md`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 text-sm font-semibold ${
              !isLogin ? "bg-blue-600 text-white" : "bg-[#2f3136] text-white"
            } rounded-r-md`}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="text-white block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-[#2f3136] text-white border border-gray-500 rounded-md"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="text-white block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-[#2f3136] text-white border border-gray-500 rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-md mt-4"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="text-white block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-[#2f3136] text-white border border-gray-500 rounded-md"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="text-white block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-[#2f3136] text-white border border-gray-500 rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="text-white block mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 bg-[#2f3136] text-white border border-gray-500 rounded-md"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-md mt-4"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>
        )}
      </div>
      <button
        onClick={() => navigate("/")}
        className="fixed bottom-5 right-5 p-2.5 px-5 bg-blue-600 text-white border-none rounded-md cursor-pointer"
      >
        Return to Main Page
      </button>
    </div>
  );
};
export default Login;