import React, { useEffect, useState } from "react";

const ClientCard = ({ item }) => {
  return (
    <div className="w-96 bg-black bg-opacity-60 border rounded-lg shadow-xl p-6 text-left border-orange-500">
      <div className="flex items-center space-x-2">
        <h3 className="text-2xl font-semibold text-white">
          Name:
        </h3>
        <p className="text-2xl font-medium text-white">
          {item.name || "Unknown"}
        </p>
      </div>
      <div className="mt-4 flex items-center space-x-2">
  <h3 className="text-lg font-semibold text-white">
    Mail Id:
  </h3>
  <p className="text-lg text-gray-300">
    {item.email || "No email provided"}
  </p>
</div>

    </div>
  );
};




const Clients = () => {
  const [client, setClient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApprovedTalents = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/get-approved-talents");
        const data = await response.json();

        if (response.ok) {
          setClient(data.talents);
        } else {
          setError(data.message || "Failed to fetch approved clients");
        }
      } catch (err) {
        setError("An error occurred while fetching approved clients");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedTalents();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading approved clients...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {client.length === 0 ? (
        <p className="text-center text-gray-500">No approved clients found.</p>
      ) : (
        client.map((item) => <ClientCard key={item._id} item={item} />)
      )}
    </div>
  );
};

export default Clients;
