import {
  FaCogs,
  FaSnowflake,
  FaGasPump,
  FaTv,
  FaBroadcastTower,
  FaCarSide,
  FaBath,
  FaTint,
} from "react-icons/fa";
import { MdMicrowave } from "react-icons/md";
import { Camper, capitalize, formLabel } from "@/lib/types";
import styles from "./VehicleDetails.module.css";

interface VehicleDetailsProps {
  camper: Camper;
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  ac: <FaSnowflake />,
  bathroom: <FaBath />,
  kitchen: <MdMicrowave />,
  tv: <FaTv />,
  radio: <FaBroadcastTower />,
  water: <FaTint />,
  gas: <FaGasPump />,
};

const AMENITY_LABELS: Record<string, string> = {
  ac: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  tv: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

export default function VehicleDetails({ camper }: VehicleDetailsProps) {
  const amenityBadges = (camper.amenities ?? []).map((amenity) => ({
    icon: AMENITY_ICONS[amenity] ?? null,
    label: AMENITY_LABELS[amenity] ?? capitalize(amenity),
  }));

  const badges: { icon: React.ReactNode; label: string }[] = [
    { icon: <FaCogs />, label: capitalize(camper.transmission) },
    { icon: <FaGasPump />, label: capitalize(camper.engine) },
    ...amenityBadges,
    { icon: <FaCarSide />, label: formLabel(camper.form) },
  ];

  const specs: { label: string; value?: string }[] = [
    { label: "Form", value: formLabel(camper.form) },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ].filter((s) => s.value);

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Vehicle details</h2>

      <ul className={styles.badges}>
        {badges.map((b, i) => (
          <li key={i} className={styles.badge}>
            {b.icon}
            {b.label}
          </li>
        ))}
      </ul>

      <dl className={styles.specs}>
        {specs.map((spec) => (
          <div key={spec.label} className={styles.specRow}>
            <dt>{spec.label}</dt>
            <dd>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
