
import PetCard from "./PetCard";

export default function PetList({ pets }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pets.map((pet) => (
        <PetCard
          key={pet._id || pet.id}
          pet={pet}
          
        />
      ))}
    </div>
  );
}