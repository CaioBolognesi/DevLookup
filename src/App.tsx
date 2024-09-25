import { useQuery } from "@tanstack/react-query";
import { Search, SearchCode } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const [inputValue, setinputValue] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const query = useQueryGithubUser(githubUsername);

  const handleSearch = () => {
    setGithubUsername(inputValue);
  };

  return (
    <div className="w-full h-svh flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row">
          <h1 className="font-black flex text-7xl">
            <span className="text-amber-500">Dev</span>Lookup
            <SearchCode />
          </h1>
        </div>
        <p className="text-lg w-full pl-1 text-left font-extralight">
          Find developers by their GitHub username
        </p>
      </div>

      <div className="w-full flex items-center justify-center mt-5">
        <div className="relative w-[330px]">
          <input
            type="text"
            className="w-full h-10 border border-zinc-700 rounded-lg p-2 focus:ring-1 focus:ring-amber-500 focus:outline-none transition duration-150 ease-in-out peer"
            placeholder=" "
            id="searchInput"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
          />
          <label
            htmlFor="searchInput"
            className={`absolute flex text-md ml-2 pl-1 items-center gap-2 rounded-full cursor-text left-2 transition-all duration-300 ease-in-out
              ${
                inputValue
                  ? "-top-3 left-0 text-[12px] text-amber-400 bg-[#242424] px-2"
                  : "top-2 text-zinc-500"
              }
              peer-focus:-top-3 peer-focus:-left-1 peer-focus:scale-90 peer-focus:text-amber-500 peer-focus:bg-[#242424] peer-focus:px-2`}
          >
            <Search size={16} /> Search for a developer
          </label>
        </div>
        <button
          className="h-10 w-20 bg-amber-500 hover:bg-amber-600 ease-in-out transition-all duration-200 text-white rounded-lg ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="mt-5">
        {githubUsername && query.isLoading && (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
        {query.error && <div>Error: {query.error.message}</div>}
        {query.data && !query.isLoading && (
          <div>
            <div className="flex flex-col border p-4 rounded-2xl border-zinc-700 min-w-[420px]">
              <div className="flex space-x-5 items-center p-4">
                <img
                  src={query.data.avatar_url}
                  alt={query.data.login}
                  className="w-24 h-24 rounded-full"
                />
                <div>
                  <h2 className="text-3xl font-bold">{query.data.name}</h2>
                  <p className="text-md font-light text-zinc-500 italic">
                    @{query.data.login}
                  </p>
                  <p className="mt-5">{query.data.bio}</p>
                </div>
              </div>
              <hr className="border-zinc-700" />
              <div>
                <div className="flex justify-between p-4">
                  <div>
                    <h3 className="text-md font-semibold text-amber-500">
                      Followers
                    </h3>
                    <p className="text-md font-medium text-center ">
                      {query.data.followers}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-amber-500">
                      Following
                    </h3>
                    <p className="text-md font-medium text-center ">
                      {query.data.following}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-amber-500">
                      Public Repos
                    </h3>
                    <p className="text-md font-medium text-center ">
                      {query.data.public_repos}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center p-4">
                  <a
                    href={query.data.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-32 bg-amber-500 hover:bg-amber-600 ease-in-out transition-all duration-200 text-white rounded-lg ml-2 flex items-center justify-center"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

function useQueryGithubUser(githubUsername: string) {
  const query = useQuery({
    enabled: !!githubUsername,
    queryKey: ["github-profile", githubUsername],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}`,
        {
          headers: {},
        }
      );
      if (!response.ok) throw new Error("User not found");

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      return response.json();
    },
  });

  return query;
}
