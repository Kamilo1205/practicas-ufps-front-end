// src/components/ActivityForm.tsx
import React, { useState } from "react";
import { Input, Label, TextArea } from "../../ui";
import { MdFileDownloadDone } from "react-icons/md";

interface ActivityFormProps {
  addActivity: (
    title: string,
    description: string,
    startDate: string,
    endDate: string
  ) => void;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ addActivity }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity(title, description, startDate, endDate);
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full mb-4">
      <div className="mr-3">
        <Label>Titulo</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Inicio</Label>
        <input
          type="date"
          className="px-2 py-1"
          style={{
            border: "1px solid rgb(209 213 219 )",
            borderRadius: "0.375rem", // Equivale a rounded
            padding: "0.30rem 0.5rem", // Equivale a px-2 py-1
          }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="ml-3">
        <Label>Fin</Label>
        <input
          type="date"
          className="px-2 py-1"
          style={{
            border: "1px solid rgb(209 213 219 )",
            borderRadius: "0.375rem", // Equivale a rounded
            padding: "0.30rem 0.5rem", // Equivale a px-2 py-1
          }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-500 text-white rounded px-4 py-2 mt-6 ml-3"
        >
          <MdFileDownloadDone />
        </button>
      </div>
    </form>
  );
};
