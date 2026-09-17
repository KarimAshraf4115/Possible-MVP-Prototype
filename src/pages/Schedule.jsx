import CalendarView from "../components/Schedule/CalendarView";
import { posts } from "../data/posts";

export default function Schedule() {
  return (
    <div className="pt-5">
      <CalendarView
        posts={posts}
        onSelectPost={(post) => console.log("clicked post:", post)} // wire to edit modal later
      />
    </div>
  );
}