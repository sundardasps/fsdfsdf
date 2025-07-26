// "use client";

// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/lib/store";
// import { updateProfile } from "@/lib/reducers/userSlice";
// import { useRouter } from "next/navigation";
// import { NEWS_CATEGORIES } from "@/constants/index";
// import { useSession } from "next-auth/react";

// export default function JourneyPage() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const { data: session, status: sessionStatus, update } = useSession();
//   const { id: userId, profile } = useAppSelector((state) => state.user);
//   const currentProfile = userId ? profile[userId] : null;

//   const [name, setName] = useState(currentProfile?.name || "");
//   const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
//     currentProfile?.preferences || []
//   );

//   useEffect(() => {
//     if (status === "loading") return; // wait for session load

//     if (!session) {
//       router.push("/auth");
//       return;
//     }

//     if (session.user.journeyComplete) {
//       router.push("/");
//     }
//   }, [session, status, router]);

//   const handlePreferenceToggle = (category: string) => {
//     if (selectedPreferences.includes(category)) {
//       setSelectedPreferences(selectedPreferences.filter((c) => c !== category));
//     } else {
//       setSelectedPreferences([...selectedPreferences, category]);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
      
//       if (!userId) return;

//       dispatch(
//         updateProfile({
//           userId,
//           profile: {
//             name,
//             preferences: selectedPreferences,
//             journeyComplete: true,
//           },
//         })
//       );

//       await update({ journeyComplete: true });

//       router.push("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Complete Your Journey</h1>

//       <div>
//         <label className="block text-sm font-medium mb-1">Your Name</label>
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//           placeholder="Enter your name"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Preferences</label>
//         <div className="flex flex-wrap gap-2">
//           {NEWS_CATEGORIES.map((category) => (
//             <button
//               key={category}
//               type="button"
//               onClick={() => handlePreferenceToggle(category)}
//               className={`px-3 py-1 rounded border ${
//                 selectedPreferences.includes(category)
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={!name || selectedPreferences.length === 0}
//         className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
//       >
//         Finish Setup
//       </button>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { updateProfile } from "@/lib/reducers/userSlice";
import { useRouter } from "next/navigation";
import { NEWS_CATEGORIES, MOVIE_GENRES } from "@/constants/index";
import { useSession } from "next-auth/react";

export default function JourneyPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session, status: sessionStatus, update } = useSession();
  const { id: userId, profile } = useAppSelector((state) => state.user);
  const currentProfile = userId ? profile[userId] : null;

  const [name, setName] = useState(currentProfile?.name || "");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    currentProfile?.preferences || []
  );
  const [selectedMovieGenres, setSelectedMovieGenres] = useState<number[]>(
    currentProfile?.moviePreferences || []
  );

  useEffect(() => {
    if (sessionStatus === "loading") return;

    if (!session) {
      router.push("/auth");
      return;
    }

    if (session.user.journeyComplete) {
      router.push("/");
    }
  }, [session, sessionStatus, router]);

  const handlePreferenceToggle = (category: string) => {
    if (selectedPreferences.includes(category)) {
      setSelectedPreferences((prev) =>
        prev.filter((c) => c !== category)
      );
    } else {
      setSelectedPreferences((prev) => [...prev, category]);
    }
  };

  const handleMovieToggle = (id: number) => {
    if (selectedMovieGenres.includes(id)) {
      setSelectedMovieGenres((prev) => prev.filter((g) => g !== id));
    } else {
      setSelectedMovieGenres((prev) => [...prev, id]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!userId) return;

      dispatch(
        updateProfile({
          userId,
          profile: {
            name,
            preferences: selectedPreferences,
            moviePreferences: selectedMovieGenres,
            journeyComplete: true,
          },
        })
      );

      await update({ journeyComplete: true });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Complete Your Journey</h1>

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Your Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your name"
        />
      </div>

      {/* News Preferences */}
      <div>
        <label className="block text-sm font-medium mb-1">News Preferences</label>
        <div className="flex flex-wrap gap-2">
          {NEWS_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handlePreferenceToggle(category)}
              className={`px-3 py-1 rounded border ${
                selectedPreferences.includes(category)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Preferences */}
      <div>
        <label className="block text-sm font-medium mb-1">Movie Preferences</label>
        <div className="flex flex-wrap gap-2">
          {MOVIE_GENRES.map((genre) => (
            <button
              key={genre.id}
              type="button"
              onClick={() => handleMovieToggle(genre.id)}
              className={`px-3 py-1 rounded border ${
                selectedMovieGenres.includes(genre.id)
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={
          !name ||
          selectedPreferences.length === 0 ||
          selectedMovieGenres.length === 0
        }
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Finish Setup
      </button>
    </div>
  );
}
