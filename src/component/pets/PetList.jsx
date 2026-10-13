
import PetCard from "./PetCard";
import { motion } from "motion/react";

export default function PetList({ pets }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pets.map((pet, index) => (
        <motion.div
          key={pet._id || pet.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
          }}
        >
          <PetCard pet={pet} />
        </motion.div>
      ))}
    </div>
  );
}