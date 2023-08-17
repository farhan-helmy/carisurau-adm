import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Surau {
  rating_id: string;
  review: string;
}

const ViewSurauPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useQuery<Surau[]>({
    queryKey: ["surau"],
    queryFn: () =>
      fetch(import.meta.env.VITE_API_URL + `surau/${id}`).then((res) =>
        res.json()
      ),
  });

  const handleDeleteReview = async (rating_id: string) => {
    await fetch(import.meta.env.VITE_API_URL + `rating/${rating_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data?.[0].rating_id === null) {
    return <div className="text-3xl">Review empty</div>;
  }

  return (
    <div>
      <div className="text-3xl font-bold">review</div>
      <div className="p-4 border shadow-lg rounded-lg">
        <ul role="list" className="divide-y divide-gray-100">
          {data?.map((surau) => (
            <li
              key={surau.rating_id}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {surau.review}
                  </p>
                </div>
              </div>
              <button
                onClick={() => void handleDeleteReview(surau.rating_id)}
                className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewSurauPage;
