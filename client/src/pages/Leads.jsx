import { useEffect, useState } from "react";

import {
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import Layout from "../components/Layout";

import { api } from "../api";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "new",
  notes: "",
};

export default function Leads() {
  const [leads, setLeads] = useState([]);

  const [form, setForm] =
    useState(emptyForm);

  const [editing, setEditing] =
    useState(null);

  const [open, setOpen] =
    useState(false);

  const loadLeads = () => {
    api.list().then(setLeads);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const submit = async () => {
    if (!form.name.trim()) {
      alert("Name required");
      return;
    }

    if (editing) {
      await api.update(editing._id, form);
    } else {
      await api.create(form);
    }

    setOpen(false);
    setEditing(null);
    setForm(emptyForm);

    loadLeads();
  };

  const editLead = (lead) => {
    setEditing(lead);
    setForm(lead);
    setOpen(true);
  };

  const deleteLead = async (lead) => {
    const ok = confirm(
      `Delete ${lead.name}?`
    );

    if (!ok) return;

    await api.remove(lead._id);

    loadLeads();
  };

  return (
    <Layout title="Leads">

      <div className="row-between">

        <div>
          <h1 className="page-title">
            Lead Listing
          </h1>

          <p className="muted">
            Manage your leads
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            setEditing(null);
            setForm(emptyForm);
            setOpen(true);
          }}
        >
          <FaPlus />
          New Lead
        </button>

      </div>

      <div className="table-card">

        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {leads.map((lead) => (
              <tr key={lead._id}>

                <td>{lead.name}</td>

                <td>{lead.email}</td>

                <td>{lead.company}</td>

                <td>
                  <span className={`badge badge-${lead.status}`}>
                    {lead.status}
                  </span>
                </td>

                <td className="actions">

                  <button
                    onClick={() =>
                      editLead(lead)
                    }
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="danger"
                    onClick={() =>
                      deleteLead(lead)
                    }
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {open && (
        <div
          className="modal-backdrop"
          onClick={() => setOpen(false)}
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <h2>
              {editing
                ? "Edit Lead"
                : "New Lead"}
            </h2>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

            <input
              placeholder="Company"
              value={form.company}
              onChange={(e) =>
                setForm({
                  ...form,
                  company: e.target.value,
                })
              }
            />

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
            >
              <option value="new">new</option>
              <option value="contacted">
                contacted
              </option>
              <option value="qualified">
                qualified
              </option>
              <option value="converted">
                converted
              </option>
              <option value="lost">lost</option>
            </select>

            <textarea
              placeholder="Notes"
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
            />

            <div className="modal-actions">

              <button
                onClick={() =>
                  setOpen(false)
                }
              >
                Cancel
              </button>

              <button
                className="primary-btn"
                onClick={submit}
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </Layout>
  );
}