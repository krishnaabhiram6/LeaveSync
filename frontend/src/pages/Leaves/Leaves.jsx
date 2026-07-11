import { useEffect, useState } from "react";
import {
  getLeaves,
  deleteLeave,
  approveLeave,
  rejectLeave,
} from "../../services/leaveService";

import AddLeave from "./AddLeave";
import EditLeave from "./EditLeave";

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const data = await getLeaves();
      setLeaves(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Leave?")) return;

    try {
      await deleteLeave(id);

      alert("Leave Deleted Successfully");

      fetchLeaves();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);

      alert("Leave Approved");

      fetchLeaves();
    } catch (error) {
      console.log(error);
      alert("Approve Failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);

      alert("Leave Rejected");

      fetchLeaves();
    } catch (error) {
      console.log(error);
      alert("Reject Failed");
    }
  };

  return (
    <div>

      <h1>Leaves</h1>

      <EditLeave
        selectedLeave={selectedLeave}
        fetchLeaves={fetchLeaves}
        onClose={() => setSelectedLeave(null)}
      />

      <AddLeave fetchLeaves={fetchLeaves} />

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {leaves.map((leave) => (

            <tr key={leave.id}>

              <td>{leave.id}</td>
              <td>{leave.employee_id}</td>
              <td>{leave.leave_type_id}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.status}</td>
              <td>{leave.reason}</td>

              <td>

                <button
                  onClick={() => setSelectedLeave(leave)}
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleDelete(leave.id)}
                >
                  Delete
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleApprove(leave.id)}
                >
                  Approve
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleReject(leave.id)}
                >
                  Reject
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Leaves;