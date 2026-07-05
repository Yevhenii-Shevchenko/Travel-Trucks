"use client";

import { useState } from "react";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { CamperFilters, CamperForm, FuelType, TransmissionType } from "@/lib/types";
import styles from "./Filters.module.css";

interface FiltersProps {
  initialFilters: CamperFilters;
  onSearch: (filters: CamperFilters) => void;
  onClear: () => void;
}

const FORM_OPTIONS: { value: CamperForm; label: string }[] = [
  { value: "alcove", label: "Alcove" },
  { value: "van", label: "Panel Van" },
  { value: "integrated", label: "Integrated" },
  { value: "semi_integrated", label: "Semi Integrated" },
];

const ENGINE_OPTIONS: { value: FuelType; label: string }[] = [
  { value: "diesel", label: "Diesel" },
  { value: "petrol", label: "Petrol" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Electric" },
];

const TRANSMISSION_OPTIONS: { value: TransmissionType; label: string }[] = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];

export default function Filters({
  initialFilters,
  onSearch,
  onClear,
}: FiltersProps) {
  const [location, setLocation] = useState(initialFilters.location ?? "");
  const [form, setForm] = useState<CamperForm | undefined>(initialFilters.form);
  const [engine, setEngine] = useState<FuelType | undefined>(initialFilters.engine);
  const [transmission, setTransmission] = useState<TransmissionType | undefined>(
    initialFilters.transmission
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location: location.trim() || undefined,
      form,
      engine,
      transmission,
    });
  };

  const handleClear = () => {
    setLocation("");
    setForm(undefined);
    setEngine(undefined);
    setTransmission(undefined);
    onClear();
  };

  return (
    <form className={styles.sidebar} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="location">
          Location
        </label>
        <div className={styles.inputWrapper}>
          <FaMapMarkerAlt className={styles.inputIcon} />
          <input
            id="location"
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <h2 className={styles.heading}>Filters</h2>

      <RadioGroup
        title="Camper form"
        name="form"
        options={FORM_OPTIONS}
        value={form}
        onChange={(v) => setForm(v as CamperForm)}
      />

      <RadioGroup
        title="Engine"
        name="engine"
        options={ENGINE_OPTIONS}
        value={engine}
        onChange={(v) => setEngine(v as FuelType)}
      />

      <RadioGroup
        title="Transmission"
        name="transmission"
        options={TRANSMISSION_OPTIONS}
        value={transmission}
        onChange={(v) => setTransmission(v as TransmissionType)}
      />

      <button type="submit" className={`btn btn-accent ${styles.searchBtn}`}>
        Search
      </button>
      <button
        type="button"
        className={`btn btn-outline ${styles.clearBtn}`}
        onClick={handleClear}
      >
        <FaTimes size={14} />
        Clear filters
      </button>
    </form>
  );
}

interface RadioGroupProps {
  title: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
}

function RadioGroup({ title, name, options, value, onChange }: RadioGroupProps) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.groupTitle}>{title}</legend>
      {options.map((opt) => (
        <label key={opt.value} className={styles.radioRow}>
          <input
            type="radio"
            name={name}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className={styles.radioInput}
          />
          <span className={styles.radioCustom} aria-hidden="true" />
          {opt.label}
        </label>
      ))}
    </fieldset>
  );
}
