import { useEffect, useState } from "react";
import {
  getLeaveTypes,
  deleteLeaveType,
} from "../../services/leaveTypeService";

import AddLeaveType from "./AddLeaveType";
import EditLeaveType from "./EditLeaveType";

function LeaveTypes() {

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const data = await getLeaveTypes();
      setLeaveTypes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Leave Type?")) return;

    await deleteLeaveType(id);

    fetchLeaveTypes();
  };

  return (
    <div>

      <h1>Leave Types</h1>

      <EditLeaveType
        selectedLeaveType={selectedLeaveType}
        fetchLeaveTypes={fetchLeaveTypes}
        onClose={() => setSelectedLeaveType(null)}
      />

      <AddLeaveType fetchLeaveTypes={fetchLeaveTypes} />

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Max Days Per Year</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {leaveTypes.map((leaveType) => (

            <tr key={leaveType.id}>

              <td>{leaveType.id}</td>

              <td>{leaveType.name}</td>

              <td>{leaveType.max_days_per_year}</td>

              <td>

                <button
                  onClick={() =>
                    setSelectedLeaveType(leaveType)
                  }
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    handleDelete(leaveType.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default LeaveTypes;