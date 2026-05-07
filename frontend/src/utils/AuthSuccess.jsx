import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(4);

  useEffect(() => {
    localStorage.setItem("loggedIn", "true");

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 w-[350px]">
        
        <CheckCircle
          className="text-green-500 animate-pulse"
          size={70}
        />

        <h1 className="text-white md:text-2xl text-xl font-semibold">
          Logged In Successfully
        </h1>

        <p className="text-zinc-400 text-sm text-center">
          Redirecting to homepage in{" "}
          <span className="text-green-400 font-bold">
            {count}
          </span>{" "}
          seconds...
        </p>

        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mt-2">
          <div
            className="bg-green-500 h-full transition-all duration-1000"
            style={{
              width: `${(count / 4) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthSuccess;