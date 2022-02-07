import { useState } from "react";

const FilterModal = (props) => {
  const { showModal, setShowModal, ships } = props;
  const [name, setName] = useState("");
  const [displacement, setDisplacement] = useState("");
  const addedShipsName = [];
  const addedShipsDisplacements = [];

  const filterShips = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("displacement", displacement);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDisplacement = (event) => {
    setDisplacement(event.target.value.toString());
  };

  return (
    <>
      {showModal ? (
        <div>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative modal my-6 mx-auto max-w-3xl">
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col modal bg-white opacity-95 outline-none focus:outline-none">
                <div className="grid justify-center">
                  <form
                    className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                    onSubmit={filterShips}
                  >
                    <div className="mt-10">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <select
                        value={name}
                        onChange={handleChangeName}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                      >
                        <option value="">None</option>
                        {ships.map((ship) => {
                          if (!addedShipsName.includes(ship.name)) {
                            addedShipsName.push(ship.name);
                            return (
                              <option value={ship.name}>{ship.name}</option>
                            );
                          }
                          return null;
                        })}
                      </select>
                    </div>
                    <div className="mt-10">
                      <label
                        htmlFor="displacement"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Displacement
                      </label>
                      <select
                        value={displacement}
                        onChange={handleChangeDisplacement}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                      >
                        <option value="">None</option>
                        {ships.map((ship) => {
                          if (
                            !addedShipsDisplacements.includes(ship.displacement)
                          ) {
                            addedShipsDisplacements.push(ship.displacement);
                            return (
                              <option value={ship.displacement}>
                                {ship.displacement}
                              </option>
                            );
                          }
                          return null;
                        })}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-4/6 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Filter
                    </button>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
};

export default FilterModal;
