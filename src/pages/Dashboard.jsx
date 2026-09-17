import { useState } from "react";
import { Plus } from "lucide-react";

import ConnectionStatusPanel from "../components/Dashboard/ConnectionStatusPanel";
import ScheduleColumn from "../components/Dashboard/ScheduleColumn";
import NewPostModal from "../components/Posts/NewPostModal";

import { connections } from "../data/connections";
import { posts as initialPosts } from "../data/posts";

export default function Dashboard() {
  // Single source of truth for posts. Everything below (schedule view,
  // modal) reads from or writes to this — nobody keeps their own copy.
  const [posts, setPosts] = useState(initialPosts);
  const [modalOpen, setModalOpen] = useState(false);

  function handleCreate(newPost) {
    setPosts((prev) => [...prev, newPost]);
  }

  return (
    <div className="pt-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 h-11 px-4 rounded-full bg-[#181818] text-white text-[13px] font-medium hover:bg-black transition"
        >
          <Plus size={15} strokeWidth={2.2} />
          New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1">
          <ConnectionStatusPanel connections={connections} />
        </div>

        <div className="lg:col-span-2">
          <ScheduleColumn posts={posts} />
        </div>
      </div>

      <NewPostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
        connections={connections}
      />
    </div>
  );
}