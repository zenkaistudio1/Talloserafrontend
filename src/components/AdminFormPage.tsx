import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit, Plus, X } from "lucide-react";

interface FormItem {
  _id?: string;
  name: string;
  description: string;
  category: string;
  fileUrl: string;
  fileName?: string;
  fileType?: string;
  fileSize: number; // in bytes
  lastUpdated: string;
  downloads: number;
}

const categories = ["HR", "Procurement", "Finance", "Safety", "Operations"];

const AdminFormPage: React.FC = () => {
  const [forms, setForms] = useState<FormItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingForm, setEditingForm] = useState<FormItem | null>(null);
  const [newForm, setNewForm] = useState<Partial<FormItem>>({
    name: "",
    description: "",
    category: "HR",
  });
  const [file, setFile] = useState<File | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchForms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/forms");
      setForms(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // Create or Update Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file && !editingForm) {
      alert("File is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newForm.name || "");
      formData.append("description", newForm.description || "");
      formData.append("category", newForm.category || "HR");

      if (file) {
        formData.append("file", file);
        formData.append("fileName", file.name);
        formData.append("fileType", file.type);
        formData.append("fileSize", file.size.toString()); // number in bytes
      }

      if (editingForm) {
        await axios.put(
          `http://localhost:5000/api/forms/${editingForm._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:5000/api/forms", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setNewForm({ name: "", description: "", category: "HR" });
      setFile(null);
      setEditingForm(null);
      setShowFormModal(false);
      fetchForms();
    } catch (err: any) {
      console.error(err);
      if (err.response) alert(err.response.data.message || "Server error");
      else alert("An error occurred");
    }
  };

  const handleEdit = (form: FormItem) => {
    setEditingForm(form);
    setNewForm({
      name: form.name,
      description: form.description,
      category: form.category,
    });
    setShowFormModal(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this form?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/forms/${id}`);
      fetchForms();
    } catch (err) {
      console.error(err);
      alert("Failed to delete form");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Forms</h1>
        <button
          onClick={() => setShowFormModal(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <Plus className="w-4 h-4" />
          Add Form
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <div
              key={form._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 group"
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    form.category === "HR"
                      ? "bg-blue-100 text-blue-800"
                      : form.category === "Procurement"
                      ? "bg-green-100 text-green-800"
                      : form.category === "Finance"
                      ? "bg-purple-100 text-purple-800"
                      : form.category === "Safety"
                      ? "bg-red-100 text-red-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {form.category}
                </span>
                <div className="flex gap-2">
                  <Edit
                    className="w-5 h-5 cursor-pointer text-gray-500 hover:text-blue-500"
                    onClick={() => handleEdit(form)}
                  />
                  <Trash2
                    className="w-5 h-5 cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => handleDelete(form._id)}
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {form.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {form.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{(form.fileSize / 1024).toFixed(2)} KB</span>
                <span>{form.downloads.toLocaleString()} downloads</span>
              </div>
              <a
                href={`http://localhost:5000${form.fileUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View / Download
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => {
                setShowFormModal(false);
                setEditingForm(null);
                setFile(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {editingForm ? "Edit Form" : "Add Form"}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Form Name"
                value={newForm.name || ""}
                onChange={(e) =>
                  setNewForm({ ...newForm, name: e.target.value })
                }
                required
                className="border border-gray-300 rounded px-3 py-2"
              />
              <textarea
                placeholder="Description"
                value={newForm.description || ""}
                onChange={(e) =>
                  setNewForm({ ...newForm, description: e.target.value })
                }
                required
                className="border border-gray-300 rounded px-3 py-2"
              />
              <select
                value={newForm.category || "HR"}
                onChange={(e) =>
                  setNewForm({ ...newForm, category: e.target.value })
                }
                className="border border-gray-300 rounded px-3 py-2"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => {
                  if (e.target.files) setFile(e.target.files[0]);
                }}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                {editingForm ? "Update Form" : "Add Form"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFormPage;
