interface UserProfileProps {
  params: {
    id: any; //  To Ensure `id` of any format i.e string numbers ...
  };
}

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-4xl">
        ProfilePage
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {params?.id || "No ID provided"}
        </span>
      </p>
    </div>
  );
}
