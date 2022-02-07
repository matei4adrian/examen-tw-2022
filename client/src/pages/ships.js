import { useEffect, useState } from "react";
import AddShip from "../components/add-ship";
import FilterModal from "../components/filter-modal";
import Header from "../components/header";
import Line from "../components/line";

const Ships = () => {
  const headerElementsShips = ["Name", "Displacement"];
  const [ships, setShips] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const nameFromFilter = localStorage.getItem("name");
  const displacementFromFilter = localStorage.getItem("displacement");
  const sortBy = localStorage.getItem("sortBy");

  const getAllShips = async () => {
    await fetch(
      `http://localhost:8080/api/ships?sortBy=${sortBy ? sortBy : ""}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setShips(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getShipsFiltered = async () => {
    fetch(
      `http://localhost:8080/api/ships?name=${
        nameFromFilter ? nameFromFilter : ""
      }&displacement=${
        displacementFromFilter ? displacementFromFilter : ""
      }&sortBy=${sortBy ? sortBy : ""}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setShips(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteFilter = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("displacement");
    getAllShips();
  };

  const sortByName = () => {
    localStorage.getItem("sortBy")
      ? localStorage.removeItem("sortBy")
      : localStorage.setItem("sortBy", "name");
    if (nameFromFilter || displacementFromFilter) {
      getShipsFiltered();
    } else {
      getAllShips();
    }
  };

  useEffect(() => {
    if (nameFromFilter || displacementFromFilter) {
      getShipsFiltered();
    } else {
      getAllShips();
    }
  }, []);

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className="flex justify-between">
              <button
                type="button"
                className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setShowModalAdd(true)}
              >
                Add ship
              </button>
              <div>
                <button
                  type="button"
                  className="mt-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={deleteFilter}
                >
                  Delete filter
                </button>
                <button
                  type="button"
                  className="mt-10 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                  onClick={() => setShowModalFilter(true)}
                >
                  Filter
                </button>
                <button
                  type="button"
                  className="mt-10 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                  onClick={sortByName}
                >
                  Sort by name
                </button>
              </div>
            </div>
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <Header headerElements={headerElementsShips} />
                <tbody className="text-gray-600 text-sm font-light">
                  {ships.map((ship) => (
                    <Line ship={ship} getAll={getAllShips} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModalAdd && <AddShip setShowModal={setShowModalAdd} />}
      <FilterModal
        ships={ships}
        setShips={setShips}
        showModal={showModalFilter}
        setShowModal={setShowModalFilter}
      />
    </div>
  );
};

export default Ships;
