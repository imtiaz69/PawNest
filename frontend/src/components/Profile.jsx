import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const fetchProfile = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("peddy-user"));
      if (!storedUser || !storedUser.user_id) return;

      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: storedUser.user_id }),
      });

      const data = await res.json();
      if (data.success) setUserData(data.user);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (petId) => {
    try {
      const res = await fetch("http://localhost:5000/api/pet/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: petId, status: "adopted" }),
      });

      const data = await res.json();

      if (data.success) {
        setNotification({
          message: "Status updated successfully!",
          type: "success",
        });
        fetchProfile();
      } else {
        setNotification({ message: "Failed to update status.", type: "error" });
      }

      setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    } catch (err) {
      console.error("Error updating status:", err);
      setNotification({ message: "Server error!", type: "error" });
      setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (!userData)
    return <div className="text-center mt-6">No user data found.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Posted Pets</h2>

      {userData.posts.length === 0 ? (
        <p>No pets posted yet.</p>
      ) : (
        userData.posts.map((post) => (
          <div
            key={post._id}
            className="border rounded p-4 mb-6 shadow relative"
          >
            <span className="absolute top-2 right-2 bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              {post.status || "pending"}
            </span>

            <h3 className="text-xl font-semibold mb-2">{post.pet_name}</h3>
            {post.image && (
              <img
                src={post.image}
                alt={post.pet_name}
                className="w-48 h-48 object-cover rounded mb-4"
              />
            )}

            <h4 className="text-lg font-semibold mb-2">Adoption Requests:</h4>
            {post.requesters && post.requesters.length > 0 ? (
              <ul className="space-y-2">
                {post.requesters.map((req) => (
                  <li
                    key={req._id}
                    className="border p-3 rounded flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>Name:</strong> {req.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {req.phone}
                      </p>
                      <p>
                        <strong>Email:</strong> {req.email}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <button
                        onClick={() => handleConfirm(post._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Confirmed
                      </button>
                      {notification.message && (
                        <span
                          className={`mt-2 text-sm ${
                            notification.type === "success"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {notification.message}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No requests yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
