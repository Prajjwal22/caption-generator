"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({})

  const handleImage = (e) => {
    setImage(e.target.value);
  };


  useEffect(() => {
    if (image !== "") {
      async function fetchData() {
        try {
          setLoading(true);
          let response = await fetch("/api/summarize", {
            method: "POST",
            body: JSON.stringify(userData),
          });
          let res = await response.json();
          setCaption(res.data.captions);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }
  }, [image, userData]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newData = {};
    for (let [key, value] of formData.entries()) {
      newData[key] = value
    }
    setUserData(newData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between g-3 p-24">
      <form onSubmit={handleGenerate}>
        <input
          name="imageurl"
          placeholder="enter image url"
          onChange={handleImage}
          className="w-96 h-10 p-2 mb-2"
          type="text"
        />
        <div className="flex flex0 flex-wrap gap-4">
          <label for="emoji">
            Use emojis?
            <select name="emoji" id="emoji">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </label>
          <label for="hashtag">
            Use hashtags?
            <select name="hashtag" id="hashtag">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </label>
          <label for="captions">
            How many captions need?
            <select name="captions" id="captions">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </label>
        </div>
        {image !== "" ? (
          <img src={image} height={300} width={300} alt="Image" />
        ) : null}
        <button
          disabled={loading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
          {loading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          {loading ? "Loading..." : "Generate Caption"}
        </button>
      </form>
      <p className="italic bg-yellow-300 p-5 rounded">
        {caption?.map((cap, i) => (
          <li
            className="hover:bg-slate-400 p-1 cursor-pointer"
            onClick={() => navigator.clipboard.writeText(cap)}
            key={i}
          >
            {cap}
          </li>
        ))}
      </p>
      <i className="text-sm">Bunny Ji</i>
    </main>
  );
}
